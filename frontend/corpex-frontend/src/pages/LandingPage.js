import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="landing-page">
      <h2>Welcome to Corpex Application</h2>
      <nav>
        <ul>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/analytics">Analytics</Link></li>
          <li><Link to="/add-expense">Add Expense</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/expenses">Expenses</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/reports">Reports</Link></li>
          <li><Link to="/settings">Settings</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default LandingPage;
