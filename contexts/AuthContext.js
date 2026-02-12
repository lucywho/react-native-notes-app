import { createContext, useContext, useState, useEffect } from 'react';
import authService from '@/services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    setLoading(true);
    const response = await authService.getCurrentUser();

    if (response?.error) {
      setUser(null);
    } else {
      setUser(response);
    }
    setLoading(false);
  };

  const login = async (email, password) => {
    const response = await authService.login(email, password);

    if (response?.error) {
      return response;
    }
    await checkUser();
    return { success: true };
  };

  const register = async (email, password) => {
    const response = await authService.register(email, password);
    if (response?.error) {
      return response;
    }
    const loginResponse = await login(email, password);
    if (loginResponse?.error) {
      return loginResponse;
    }
    const verifyUrl = process.env.EXPO_PUBLIC_VERIFY_URL;
    if (verifyUrl) {
      const verifyResponse = await authService.createEmailVerification(verifyUrl);
      if (verifyResponse?.error) {
        return { ...loginResponse, verificationError: verifyResponse.error };
      }
    }
    return { success: true, needsVerification: !!verifyUrl };
  };

  const resendVerification = async () => {
    const verifyUrl = process.env.EXPO_PUBLIC_VERIFY_URL;
    if (!verifyUrl) {
      return { error: 'Verification URL not configured.' };
    }
    return authService.createEmailVerification(verifyUrl);
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    await checkUser();
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, resendVerification, checkUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
