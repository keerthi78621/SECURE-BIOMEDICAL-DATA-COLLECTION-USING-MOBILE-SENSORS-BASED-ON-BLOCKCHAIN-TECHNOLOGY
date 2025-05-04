from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import bcrypt
import face_recognition
import cv2
import numpy as np
from PIL import Image
import base64
from io import BytesIO
import json
import traceback
import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Database file
db_file = 'users_db.json'

# Ensure the uploads directory exists
if not os.path.exists('uploads'):
    os.makedirs('uploads')

# Load the database
def load_db():
    if os.path.exists(db_file):
        with open(db_file, 'r') as f:
            db = json.load(f)
            # Ensure 'doctors', 'users', and 'doctor_messages' keys exist
            if 'doctors' not in db:
                db['doctors'] = []
            if 'users' not in db:
                db['users'] = []
            if 'doctor_messages' not in db:
                db['doctor_messages'] = []
            return db
    return {"users": [], "doctors": [], "doctor_messages": []}  # Initialize with all necessary keys

# Save the database
def save_db(data):
    with open(db_file, 'w') as f:
        json.dump(data, f, indent=4)

# Helper function to decode and save a base64 image
def save_base64_image(base64_data, username, folder="uploads"):
    try:
        # Decode the base64 image
        image_data = base64.b64decode(base64_data.split(',')[1])
        image = Image.open(BytesIO(image_data))

        # Convert to RGB if necessary
        if image.mode == 'RGBA':
            image = image.convert('RGB')

        # Save the image
        image_path = f"{folder}/{username}_face.jpg"
        image.save(image_path, "JPEG")
        return image_path
    except Exception as e:
        print(f"Error saving image: {e}")
        return None

# Helper function to detect and encode a face from an image
def encode_face(image_path):
    try:
        # Load the image with OpenCV
        img = cv2.imread(image_path)
        if img is None:
            return None, "Image could not be loaded."

        # Convert to grayscale for face detection
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

        # Detect faces
        face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
        faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

        if len(faces) == 0:
            return None, "No face detected."

        # Extract the first face
        x, y, w, h = faces[0]
        face = img[y:y + h, x:x + w]

        # Encode the face
        face_rgb = cv2.cvtColor(face, cv2.COLOR_BGR2RGB)
        face_encoding = face_recognition.face_encodings(face_rgb)

        if len(face_encoding) == 0:
            return None, "No face encoding found."

        return face_encoding[0], None
    except Exception as e:
        print(f"Error encoding face: {e}")
        return None, str(e)

# Register endpoint
@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.json
        username = data.get('username')
        password = data.get('password')
        email = data.get('email')
        face_image_data = data.get('face_image')  # Base64 encoded image

        # Validate input
        if not all([username, password, email, face_image_data]):
            return jsonify({"error": "Missing required fields!"}), 400

        # Save the face image
        face_image_path = save_base64_image(face_image_data, username)
        if not face_image_path:
            return jsonify({"error": "Failed to save face image."}), 400

        # Encode the face
        face_encoding, error = encode_face(face_image_path)
        if error:
            os.remove(face_image_path)  # Delete the image
            return jsonify({"error": error}), 400

        # Hash the password
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

        # Save user data
        db = load_db()
        db['users'].append({
            "username": username,
            "password": hashed_password.decode('utf-8'),
            "email": email,
            "face_encoding": base64.b64encode(face_encoding.tobytes()).decode('utf-8'),
            "face_image_path": face_image_path
        })
        save_db(db)

        return jsonify({"success": "Registration successful!"}), 200

    except Exception as e:
        print(f"Error: {e}")
        print(traceback.format_exc())  # Print the full traceback
        return jsonify({"error": "Internal server error"}), 500

@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.json
        username = data.get('username')
        password = data.get('password')
        face_image_data = data.get('face_image')  # Base64 encoded image

        # Validate input
        if not all([username, password, face_image_data]):
            return jsonify({"error": "Missing required fields!"}), 400

        # Save the face image temporarily
        face_image_path = save_base64_image(face_image_data, "temp_login_face")
        if not face_image_path:
            return jsonify({"error": "Failed to save face image."}), 400

        # Encode the face
        face_encoding, error = encode_face(face_image_path)
        if error:
            os.remove(face_image_path)  # Delete the image
            return jsonify({"error": error}), 400

        # Find the user
        db = load_db()
        user = next((u for u in db['users'] if u['username'] == username), None)

        if not user:
            os.remove(face_image_path)  # Delete the image
            return jsonify({"error": "Invalid username or password!"}), 400

        # Verify password
        if not bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
            os.remove(face_image_path)  # Delete the image
            return jsonify({"error": "Invalid username or password!"}), 400

        # Verify face encoding
        stored_face_encoding = np.frombuffer(base64.b64decode(user['face_encoding']), dtype=np.float64)
        matches = face_recognition.compare_faces([stored_face_encoding], face_encoding)

        if not matches[0]:
            os.remove(face_image_path)  # Delete the image
            return jsonify({"error": "Face does not match!"}), 400

        # Clean up and return success with user data
        os.remove(face_image_path)
        return jsonify({
            "success": "Login successful!",
            "user": {
                "username": user["username"],
                "email": user["email"],
                "face_image_path": user["face_image_path"],
            },
            "redirect": "/user-dashboard",  # Redirect to the user dashboard
        }), 200

    except Exception as e:
        print(f"Error: {e}")
        print(traceback.format_exc())  # Print the full traceback
        return jsonify({"error": "Internal server error"}), 500
# Register doctor endpoint
@app.route('/register_doctor', methods=['POST'])
def register_doctor():
    try:
        data = request.json
        name = data.get('name')
        username = data.get('username')
        password = data.get('password')
        specialization = data.get('specialization')

        # Validate input
        if not all([name, username, password, specialization]):
            return jsonify({"error": "Missing required fields!"}), 400

        # Hash the password
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

        # Save doctor data
        db = load_db()
        db['doctors'].append({
            "name": name,
            "username": username,
            "password": hashed_password.decode('utf-8'),
            "specialization": specialization,
        })
        save_db(db)

        return jsonify({"success": "Doctor registration successful!"}), 200

    except Exception as e:
        print(f"Error: {e}")
        print(traceback.format_exc())  # Print the full traceback
        return jsonify({"error": "Internal server error"}), 500

# Login doctor endpoint
@app.route('/login_doctor', methods=['POST'])
def login_doctor():
    try:
        data = request.json
        username = data.get('username')
        password = data.get('password')

        # Validate input
        if not all([username, password]):
            return jsonify({"error": "Missing required fields!"}), 400

        # Find the doctor
        db = load_db()
        doctor = next((d for d in db['doctors'] if d['username'] == username), None)

        if not doctor:
            return jsonify({"error": "Invalid username or password!"}), 400

        # Verify password
        if not bcrypt.checkpw(password.encode('utf-8'), doctor['password'].encode('utf-8')):
            return jsonify({"error": "Invalid username or password!"}), 400

        return jsonify({"success": "Login successful!", "doctor": doctor}), 200

    except Exception as e:
        print(f"Error: {e}")
        print(traceback.format_exc())  # Print the full traceback
        return jsonify({"error": "Internal server error"}), 500

@app.route('/send_data', methods=['POST'])
def send_data():
    try:
        data = request.form
        doctor_username = data.get('doctor_username')
        user_username = data.get('user_username')
        message = data.get('message')
        file = request.files.get('file')  # Get the uploaded file

        print("Received data:", {
            "doctor_username": doctor_username,
            "user_username": user_username,
            "message": message,
            "file": file.filename if file else "No file",
        })

        # Validate input
        if not all([doctor_username, user_username, message]):
            return jsonify({"error": "Missing required fields!"}), 400

        # Save the file if provided
        file_path = None
        if file:
            file_path = f"uploads/files/{user_username}_{file.filename}"
            os.makedirs(os.path.dirname(file_path), exist_ok=True)
            file.save(file_path)

        # Save the message
        db = load_db()
        db['doctor_messages'].append({
            "doctor_username": doctor_username,
            "user_username": user_username,
            "message": message,
            "file_path": file_path,
            "timestamp": datetime.datetime.now().isoformat()
        })
        save_db(db)

        return jsonify({"success": "Data sent successfully!"}), 200
    except Exception as e:
        print(f"Error: {e}")
        print(traceback.format_exc())  # Print the full traceback
        return jsonify({"error": "Internal server error"}), 500
# Get data endpoint
@app.route('/get_data', methods=['GET'])
def get_data():
    try:
        user_username = request.args.get('username')

        # Validate input
        if not user_username:
            return jsonify({"error": "Username is required!"}), 400

        # Retrieve messages for the user
        db = load_db()
        messages = [msg for msg in db['doctor_messages'] if msg['user_username'] == user_username]

        # Prepare response
        response = []
        for msg in messages:
            message_data = {
                "doctor_username": msg['doctor_username'],
                "message": msg['message'],
                "timestamp": msg['timestamp'],
                "file_path": msg['file_path']  # Include the file path for download
            }
            response.append(message_data)

        return jsonify({"success": "Data retrieved successfully!", "data": response}), 200

    except Exception as e:
        print(f"Error: {e}")
        print(traceback.format_exc())  # Print the full traceback
        return jsonify({"error": "Internal server error"}), 500
@app.route('/get_users', methods=['GET'])
def get_users():
    try:
        db = load_db()
        users = db['users']
        return jsonify({"success": "Users retrieved successfully!", "users": users}), 200
    except Exception as e:
        print(f"Error: {e}")
        print(traceback.format_exc())  # Print the full traceback
        return jsonify({"error": "Internal server error"}), 500
        
# Run the app
from flask import send_file

@app.route('/download_file', methods=['GET'])
def download_file():
    try:
        file_path = request.args.get('file_path')

        # Validate input
        if not file_path:
            return jsonify({"error": "File path is required!"}), 400

        # Check if the file exists
        if not os.path.exists(file_path):
            return jsonify({"error": "File not found!"}), 404

        # Send the file to the client
        return send_file(file_path, as_attachment=True)

    except Exception as e:
        print(f"Error: {e}")
        print(traceback.format_exc())  # Print the full traceback
        return jsonify({"error": "Internal server error"}), 500
        
if __name__ == '__main__':
    if not os.path.exists('uploads'):
        os.makedirs('uploads')
    if not os.path.exists('uploads/files'):
        os.makedirs('uploads/files')
    app.run(debug=True, port=5000)