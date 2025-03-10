import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';
import { AppDispatch, RootState } from '../store/store';
import { login, clearError } from '../store/slices/authSlice';
import '../styles/components/login.scss';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(login({ email, password })).unwrap();
      navigate(from, { replace: true });
    } catch (err) {
      // Error is handled by the reducer
    }
  };

  return (
    <Box className="login-container">
      <Box className="login-header">
        <img src="/logo.svg" alt="Corpex" />
        <Typography variant="h4" component="h1">
          Welcome to CorpEx
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Sign in to manage your expenses
        </Typography>
      </Box>

      <Box
        component="form"
        onSubmit={handleSubmit}
        className="login-form"
      >
        {error && (
          <Alert severity="error" onClose={() => dispatch(clearError())}>
            {error}
          </Alert>
        )}

        <Box className="form-field">
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Box>

        <Box className="form-field">
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Box>

        <Typography
          className="forgot-password"
          onClick={() => navigate('/forgot-password')}
        >
          Forgot password?
        </Typography>

        <Button
          fullWidth
          variant="contained"
          type="submit"
          disabled={isLoading}
          className="submit-button"
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </Button>

        <Button
          fullWidth
          variant="outlined"
          onClick={() => {
            setEmail('demo@example.com');
            setPassword('demo123');
          }}
          className="demo-button"
        >
          Use demo account
        </Button>
      </Box>

      <Box className="signup-prompt">
        <Typography>
          Don't have an account?{' '}
          <span className="signup-link" onClick={() => navigate('/signup')}>
            Sign up
          </span>
        </Typography>
      </Box>
    </Box>
  );
} 