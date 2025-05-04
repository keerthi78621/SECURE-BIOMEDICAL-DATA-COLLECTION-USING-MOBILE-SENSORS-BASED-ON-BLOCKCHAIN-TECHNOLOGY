import axios from 'axios';

// Define the base URL for the Flask API
const API_URL = 'http://localhost:5000';  // Replace with your Flask backend URL if different

// Helper function to handle errors
const handleError = (error) => {
  if (error.response) {
    // Response error from the server
    console.error('Response error:', error.response.data);
    return error.response.data.error || 'An error occurred.';
  } else if (error.request) {
    // No response received from the server
    console.error('No response:', error.request);
    return 'Server not responding.';
  } else {
    // General error during request setup
    console.error('Request error:', error.message);
    return error.message || 'An unexpected error occurred.';
  }
};

// Register user API call with face image
export const registerUser = async (userData, faceImage) => {
  const formData = new FormData();
  formData.append('face_image', faceImage); // face image should be a base64 string
  formData.append('username', userData.username);
  formData.append('password', userData.password);
  formData.append('email', userData.email);

  try {
    const response = await axios.post(`${API_URL}/register`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    const errorMessage = handleError(error);
    throw new Error(errorMessage);
  }
};

// Login user API call with face image
export const loginUser = async (userData, faceImage) => {
  const formData = new FormData();
  formData.append('face_image', faceImage); // face image should be a base64 string
  formData.append('username', userData.username);
  formData.append('password', userData.password);

  try {
    const response = await axios.post(`${API_URL}/login`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    const errorMessage = handleError(error);
    throw new Error(errorMessage);
  }
};

