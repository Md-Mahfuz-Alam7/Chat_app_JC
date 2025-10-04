import axios from "axios";
import { API_URL } from "../constants/index";

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, {
            email,
            password
        }, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.log("Login error:", error.message);
        if (error.code === 'NETWORK_ERROR' || error.message === 'Network Error') {
            throw new Error('Cannot connect to server. Please check if the backend is running.');
        }
        const msg = error?.response?.data?.message || "Login Failed";
        throw new Error(msg);
    }
};

export const register = async (email, password, name, avatar) => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, {
            email,
            password,
            name,
            avatar,
        }, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.log("Registration error:", error.message);
        if (error.code === 'NETWORK_ERROR' || error.message === 'Network Error') {
            throw new Error('Cannot connect to server. Please check if the backend is running.');
        }
        const msg = error?.response?.data?.message || "Registration Failed";
        throw new Error(msg);
    }
};
