import { useState } from "react";
import authService from "../services/authService"

const useAuth = () => {
  const [state, setState] = useState({
    user: authService.getCurrentUser(),
    token: authService.getToken(),
    loading: false,
    error: null,
  });

  const login = async (credentials) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const result = await authService.login(credentials);
      setState(prev => ({ ...prev, user: result.user, token: result.token, loading: false }));
      return result;
    } catch (error) {
      setState(prev => ({ ...prev, error: error.message, loading: false }));
      throw error;
    }
  };

  const signup = async (userData) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const result = await authService.signup(userData);
      setState(prev => ({ ...prev, user: result.user, token: result.token, loading: false }));
      return result;
    } catch (error) {
      setState(prev => ({ ...prev, error: error.message, loading: false }));
      throw error;
    }
  };

  const forgotPassword = async (email) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const result = await authService.forgotPassword(email);
      setState(prev => ({ ...prev, loading: false }));
      return result;
    } catch (error) {
      setState(prev => ({ ...prev, error: error.message, loading: false }));
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setState({ user: null, token: null, loading: false, error: null });
  };

  return { ...state, login, signup, forgotPassword, logout };
};

export default useAuth