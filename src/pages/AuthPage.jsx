import Container from "@mui/material/Container";
import { toast } from "react-toastify";
import LoginForm from "../views/auth/LoginForm"
import SignupForm from "../views/auth/SignupForm"
import ForgotForm from "../views/auth/ForgotForm"
import {
  Box,
} from '@mui/material';
import { useState } from "react";
import useAuth from "../viewmodels/useAuth";

const AuthPage = ({ onAuthSuccess }) => {
  const [authMode, setAuthMode] = useState('login');
  const { login, signup, forgotPassword, loading, error } = useAuth();

  const handleLogin = async (credentials) => {
    try {
      await login(credentials);
      onAuthSuccess();
    } catch (error) {
        toast("Invalid credentials")
    }
  };

  const handleSignup = async (userData) => {
    try {
      await signup(userData);
      onAuthSuccess();
    } catch (error) {
      toast("Something went wrong")
    }
  };

  const handleForgotPassword = async (email) => {
    await forgotPassword(email);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4,
        }}
      >
        {authMode === 'login' && (
          <LoginForm
            onLogin={handleLogin}
            onSwitchToSignup={() => setAuthMode('signup')}
            onSwitchToForgot={() => setAuthMode('forgot')}
            loading={loading}
            error={error}
          />
        )}
        {authMode === 'signup' && (
          <SignupForm
            onSignup={handleSignup}
            onSwitchToLogin={() => setAuthMode('login')}
            loading={loading}
            error={error}
          />
        )}
        {authMode === 'forgot' && (
          <ForgotForm
            onForgotPassword={handleForgotPassword}
            onSwitchToLogin={() => setAuthMode('login')}
            loading={loading}
            error={error}
          />
        )}
      </Box>
    </Container>
  );
};

export default AuthPage