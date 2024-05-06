import axios from "axios";

const API_BASE_URL = "http://localhost:4000/api";

// Function to register a new user
const registerUser = async (userData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/register`, userData);
    return response.data;
  } catch (error:any) {
    console.error("Error registering user:", error);
    alert(error.response.data.message)
    throw error;
  }
};

// Function to log in an existing user
const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/userrs
    /login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};
export { registerUser, loginUser };
