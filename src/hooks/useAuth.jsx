// frontend/src/hooks/useAuth.js - COMPLETE FILE
import { useState, useEffect, createContext, useContext } from 'react';
import { useClerk } from '@clerk/clerk-react';
import { authService } from '../services/auth.service';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { signOut: clerkSignOut } = useClerk();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      if (authService.isAuthenticated()) {
        console.log('🔍 Checking auth...');
        const response = await authService.getCurrentUser();
        console.log('✅ User authenticated:', response.data.data);
        setUser(response.data.data);
      } else {
        console.log('❌ No token found');
      }
    } catch (error) {
      console.error('❌ Auth check failed:', error);
      await clearAuthData();
    } finally {
      setLoading(false);
    }
  };

  /**
   * 🧹 Clear all authentication data
   */
  const clearAuthData = async () => {
    try {
      console.log('🧹 Clearing all auth data...');
      
      // 1. Clear localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // 2. Clear sessionStorage
      sessionStorage.clear();
      
      // 3. Clear cookies (if any)
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
      
      // 4. Clear state
      setUser(null);
      
      // 5. Sign out from Clerk if signed in
      if (clerkSignOut) {
        try {
          await clerkSignOut();
          console.log('✅ Clerk sign out successful');
        } catch (clerkError) {
          console.log('ℹ️ No Clerk session to clear');
        }
      }
      
      console.log('✅ All auth data cleared');
    } catch (error) {
      console.error('❌ Error clearing auth data:', error);
    }
  };

  /**
   * 🔵 LOCAL LOGIN
   */
  const login = async (email, password) => {
    try {
      console.log('🔐 Attempting local login...');
      
      // Clear any existing data first
      await clearAuthData();
      
      const response = await authService.login(email, password);
      setUser(response.data.data.user);
      toast.success('تم تسجيل الدخول بنجاح');
      console.log('✅ Login successful:', response.data.data.user);
      return response;
    } catch (error) {
      console.error('❌ Login failed:', error);
      const errorMessage = error.response?.data?.message || 'فشل تسجيل الدخول';
      toast.error(errorMessage);
      throw error;
    }
  };

  /**
   * 🔵 LOCAL REGISTER
   */
  const register = async (userData) => {
    try {
      console.log('📝 Attempting registration...');
      
      // Clear any existing data first
      await clearAuthData();
      
      const response = await authService.register(userData);
      setUser(response.data.data.user);
      toast.success('تم إنشاء الحساب بنجاح');
      console.log('✅ Registration successful:', response.data.data.user);
      return response;
    } catch (error) {
      console.error('❌ Registration failed:', error);
      const errorMessage = error.response?.data?.message || 'فشل إنشاء الحساب';
      toast.error(errorMessage);
      throw error;
    }
  };

  /**
   * 🟢 CLERK LOGIN
   */
  const loginWithClerk = async (clerkUserId, role = 'student') => {
    try {
      console.log('🔐 Attempting Clerk login with userId:', clerkUserId, 'role:', role);
      
      // Don't clear Clerk session here since we need it!
      // Only clear backend token
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      const response = await authService.loginWithClerk(clerkUserId, role);
      setUser(response.data.data.user);
      toast.success('تم تسجيل الدخول بنجاح');
      console.log('✅ Clerk login successful:', response.data.data.user);
      return response;
    } catch (error) {
      console.error('❌ Clerk login failed:', error);
      const errorMessage = error.response?.data?.message || 'فشل تسجيل الدخول';
      toast.error(errorMessage);
      throw error;
    }
  };

  /**
   * 🔹 UPDATE PROFILE
   */
  const updateProfile = async (data) => {
    try {
      console.log('📝 Updating profile...');
      const response = await authService.updateProfile(data);
      setUser(response.data.data);
      toast.success('تم تحديث الملف الشخصي بنجاح');
      console.log('✅ Profile updated:', response.data.data);
      return response;
    } catch (error) {
      console.error('❌ Profile update failed:', error);
      const errorMessage = error.response?.data?.message || 'فشل تحديث الملف الشخصي';
      toast.error(errorMessage);
      throw error;
    }
  };

  /**
   * 🔹 ADD PASSWORD (for Clerk users)
   */
  const addPassword = async (password) => {
    try {
      console.log('🔒 Adding password...');
      const response = await authService.addPassword(password);
      
      // Update user to reflect hasPassword
      const updatedUser = { ...user, hasPassword: true, authProvider: 'hybrid' };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      toast.success('تمت إضافة كلمة المرور بنجاح');
      console.log('✅ Password added successfully');
      return response;
    } catch (error) {
      console.error('❌ Add password failed:', error);
      const errorMessage = error.response?.data?.message || 'فشل إضافة كلمة المرور';
      toast.error(errorMessage);
      throw error;
    }
  };

  /**
   * 🔹 LOGOUT - COMPLETE FIX ✅
   */
  const logout = async () => {
    try {
      console.log('🚪 Starting logout process...');
      
      // 1. Sign out from Clerk FIRST and wait for it
      if (clerkSignOut) {
        try {
          console.log('🔐 Signing out from Clerk...');
          // ✅ IMPORTANT: Use redirectUrl to force complete logout
          await clerkSignOut({ 
            redirectUrl: '/',
          });
          console.log('✅ Clerk sign out successful');
        } catch (clerkError) {
          console.log('⚠️ Clerk logout error:', clerkError.message);
          // Force sign out anyway
          await clerkSignOut();
        }
      }
      
      // 2. Call backend logout
      try {
        await authService.logout();
        console.log('✅ Backend logout successful');
      } catch (backendError) {
        console.log('ℹ️ Backend logout failed:', backendError.message);
      }
      
      // 3. Clear ALL storage completely
      console.log('🧹 Clearing all storage...');
      
      // Clear localStorage
      localStorage.clear();
      
      // Clear sessionStorage
      sessionStorage.clear();
      
      // Clear all cookies including Clerk cookies
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        // Clear for current domain and all subdomains
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=" + window.location.hostname;
      }
      
      // 4. Clear IndexedDB (Clerk uses it)
      if (window.indexedDB) {
        try {
          const databases = await window.indexedDB.databases();
          databases.forEach(db => {
            window.indexedDB.deleteDatabase(db.name);
          });
          console.log('✅ IndexedDB cleared');
        } catch (e) {
          console.log('ℹ️ Could not clear IndexedDB');
        }
      }
      
      // 5. Clear state
      setUser(null);
      
      toast.success('تم تسجيل الخروج بنجاح');
      console.log('✅ Logout completed successfully');
      
      // 6. Force hard reload to clear all caches
      setTimeout(() => {
        window.location.href = '/';
        // Force reload after redirect
        setTimeout(() => {
          window.location.reload(true);
        }, 100);
      }, 500);
    } catch (error) {
      console.error('❌ Logout error:', error);
      
      // Force logout anyway
      localStorage.clear();
      sessionStorage.clear();
      setUser(null);
      
      // Hard reload
      window.location.href = '/';
      window.location.reload(true);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        loginWithClerk,
        updateProfile,
        addPassword,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};