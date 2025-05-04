import axios from 'axios';

// Define the base URL for the Flask API
const API_URL = 'http://localhost:5000';  // Replace with your Flask backend URL if different

// Login doctor API call with face image
export const loginDoctor = async (doctorData, faceImage) => {
  const formData = new FormData();
  formData.append('face_image', faceImage); // face image should be a base64 string
  formData.append('username', doctorData.username);
  formData.append('password', doctorData.password);

  try {
    const response = await axios.post(`${API_URL}/login_doctor`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    console.error("Error in loginDoctor:", error);
    throw new Error(error.response ? error.response.data.error : "An error occurred.");
  }
};
