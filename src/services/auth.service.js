// frontend/src/services/auth.service.js - COMPLETE FILE
import api from './api';

export const authService = {
  /**
   * 🔵 LOCAL LOGIN
   */
  async login(email, password) {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.data.token) {
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    return response;
  },

  /**
   * 🔵 LOCAL REGISTER
   */
  async register(userData) {
    const response = await api.post('/auth/register', userData);
    if (response.data.data.token) {
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    return response;
  },

  /**
   * 🟢 CLERK LOGIN/REGISTER - FIXED WITH ROLE ✅
   */
  async loginWithClerk(clerkUserId, role = 'student') {
    console.log('🔐 Sending to backend:', { clerkUserId, role });
    
    const response = await api.post('/auth/clerk', {
      clerkUserId: clerkUserId,
      role: role, // ✅ Pass role to backend
    });
    
    if (response.data.data.token) {
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
      console.log('✅ Clerk login successful, token saved');
    }
    
    return response;
  },

  /**
   * 🔹 GET CURRENT USER
   */
  async getCurrentUser() {
    return await api.get('/auth/me');
  },

  /**
   * 🔹 UPDATE PROFILE
   */
  async updateProfile(data) {
    const response = await api.put('/auth/profile', data);
    
    // Update localStorage user
    if (response.data.data) {
      const currentUser = this.getStoredUser();
      const updatedUser = { ...currentUser, ...response.data.data };
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
    
    return response;
  },

  /**
   * 🔹 ADD PASSWORD (for Clerk users)
   */
  async addPassword(password) {
    return await api.post('/auth/add-password', { password });
  },

  /**
   * 🔹 CHANGE PASSWORD
   */
  async changePassword(oldPassword, newPassword) {
    return await api.put('/auth/change-password', { oldPassword, newPassword });
  },

  /**
   * 🔹 LOGOUT
   */
  async logout() {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },

  /**
   * 🔹 CHECK AUTH
   */
  isAuthenticated() {
    return !!localStorage.getItem('token');
  },

  /**
   * 🔹 GET STORED USER
   */
  getStoredUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },
};