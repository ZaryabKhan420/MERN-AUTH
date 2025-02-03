import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:8000/api/auth";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: "",

  signUp: async (email, password, name) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/signup`, {
        email,
        password,
        name,
      });
      if (response.data) {
        set({
          user: response.data.data,
          isLoading: false,
          isAuthenticated: true,
        });
      }
    } catch (error) {
      console.log("Error SignUp", error);
      set({
        isLoading: false,
        error: error.response.data.message || "Error Signing User",
      });
      throw error;
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      set({
        user: response.data.data,
        isLoading: false,
        error: null,
        isAuthenticated: true,
      });
    } catch (error) {
      console.log("Error Login User", error);
      set({ error: error.response.data.message, isLoading: false });
    }
  },

  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/verify-email`, { code });
      if (response.data) {
        set({ isLoading: false, user: response.data.data });
      }
    } catch (error) {
      console.log("Error in Verifying Email", error);
      set({
        error: error.response.data.message || "Error Verifying Email",
        isLoading: false,
      });
      throw error;
    }
  },

  checkAuth: async () => {
    set({ error: null, isCheckingAuth: true });
    try {
      const response = await axios.get(`${API_URL}/check-auth`);
      if (response.data) {
        set({
          isAuthenticated: true,
          isCheckingAuth: false,
          user: response.data.data,
        });
      }
    } catch (error) {
      console.log("Error in checking auth", error);
      set({ error: null, isCheckingAuth: false, isAuthenticated: false });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/logout`);
      if (response) {
        set({ isLoading: false, isAuthenticated: false, user: null });
      }
    } catch (error) {
      console.log("Error in Logout", error);
      set({ error: error.response.data.message, isLoading: false });
      throw error;
    }
  },

  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const response = axios.post(`${API_URL}/forgot-password`, { email });
      if (response) {
        set({ isLoading: false, error: null });
      }
    } catch (error) {
      console.log("Error Forgot Password", error);
      set({
        isLoading: false,
        error:
          error.response.data.message || "Error Sending Reset Password Email",
      });
      throw error;
    }
  },

  resetPassword: async (token, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/reset-password/${token}`, {
        password,
      });
      if (response) {
        set({ isLoading: false, error: null, user: response.data.data });
      }
    } catch (error) {
      console.log("Error in Reset Password", error);
      set({ isLoading: false, error: error.response.data.message });
      throw error;
    }
  },
}));
