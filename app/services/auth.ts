// src/services/auth.ts
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};
