import React, { useState } from 'react';
import '../css/RegistrationPage.css';
import logo from '../assets/icons/image.png';

function RegistrationPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    // Registration logic here
  };

  return (
    <div className="registration-page">
      <div className="registration-container">
        <img src={logo} alt="Corpex Logo" className="registration-logo" />
        <h2>Create Account</h2>
        <p>Join CorpEx to manage your company expenses efficiently</p>
        <form onSubmit={handleRegister} className="registration-form">
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="form-control"
          />
          <input
            type="email"
            placeholder="Email Address"
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
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="form-control"
          />
          <button type="submit" className="button-primary">Create Account</button>
        </form>
        <p>Already have an account? <button className="signin-link">Sign in</button></p>
      </div>
    </div>
  );
}

export default RegistrationPage;
