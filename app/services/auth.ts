import axios from 'axios';

export const login = async (email: string, password: string) => {
  try {
    // Making a request to the Next.js API route
    const response = await axios.post('/api/login', {
      email,
      password,
    });

    // Return the response data (e.g., user data, token, etc.)
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);

    // Handle error (e.g., return error message or status)
    throw { error: 'Login failed' };
  }
};
