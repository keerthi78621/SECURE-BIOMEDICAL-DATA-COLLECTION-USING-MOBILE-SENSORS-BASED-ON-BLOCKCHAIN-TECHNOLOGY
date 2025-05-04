import axios from 'axios';

// Define the base URL for the Flask API
const API_URL = 'http://localhost:5000';  // Replace with your Flask backend URL if different

// Register doctor API call with face image
export const registerDoctor = async (doctorData, faceImage) => {
  const formData = new FormData();
  formData.append('name', doctorData.name);
  formData.append('specialization', doctorData.specialization);
  formData.append('contact', doctorData.contact);
  formData.append('experience', doctorData.experience);
  formData.append('username', doctorData.username);
  formData.append('password', doctorData.password);
  formData.append('face_image', faceImage);  // Face image in base64 format

  try {
    const response = await axios.post(`${API_URL}/register_doctor`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    console.error("Error in registerDoctor:", error);
    throw new Error(error.response ? error.response.data.error : "An error occurred.");
  }
};
