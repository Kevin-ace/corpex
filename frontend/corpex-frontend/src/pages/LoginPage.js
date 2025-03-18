import React, { useState } from 'react';
import { authService } from '../api-service';
import '../css/LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await authService.login(email, password);
    if (!success) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Welcome Back</h2>
        <p>Sign in to manage your expenses</p>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
          />
          <button type="submit" className="button-primary">Sign in</button>
          <button type="button" className="button-secondary">Use demo account</button>
        </form>
        {error && <p className="error">{error}</p>}
        <p><button className="forgot-password">Forgot password?</button></p>
        <p>Don't have an account? <button className="signup-link">Sign up</button></p>
      </div>
    </div>
  );
}

export default LoginPage;
