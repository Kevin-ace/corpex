import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import logo from './assets/icons/image.png';
import LoginPage from './pages/LoginPage';
import AnalyticsPage from './pages/AnalyticsPage';
import AddExpensePage from './pages/AddExpensePage';
import DashboardPage from './pages/DashboardPage';
import ExpenseDetailsPage from './pages/ExpenseDetailsPage';
import ExpensesPage from './pages/ExpensesPage';
import RegistrationPage from './pages/RegistrationPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/add-expense" element={<AddExpensePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/expense-details" element={<ExpenseDetailsPage />} />
          <Route path="/expenses" element={<ExpensesPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
