import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { ErrorBoundary } from './components/ErrorBoundary';
import { NotificationProvider } from './contexts/NotificationContext';
import { theme } from './theme';
import { LoginPage } from './pages/LoginPage';
import { RegistrationPage } from './pages/RegistrationPage';
import { DashboardPage } from './pages/DashboardPage';
import { ExpensesPage } from './pages/ExpensesPage';
import { ExpenseDetailsPage } from './pages/ExpenseDetailsPage';
import { ReportsPage } from './pages/ReportsPage';
import { SettingsPage } from './pages/SettingsPage';
import { AddExpensePage } from './pages/AddExpensePage';
import { Layout } from './components/Layout';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';

function App() {
  // Check if user is logged in
  const { token } = useSelector((state: RootState) => state.auth);
  
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <NotificationProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={!token ? <LoginPage /> : <Navigate to="/" replace />} />
              <Route path="/signup" element={!token ? <RegistrationPage /> : <Navigate to="/" replace />} />
              <Route path="/" element={token ? <Layout><DashboardPage /></Layout> : <Navigate to="/login" />} />
              <Route path="/expenses" element={token ? <Layout><ExpensesPage /></Layout> : <Navigate to="/login" />} />
              <Route path="/expenses/:id" element={token ? <Layout><ExpenseDetailsPage /></Layout> : <Navigate to="/login" />} />
              <Route path="/add-expense" element={token ? <Layout><AddExpensePage /></Layout> : <Navigate to="/login" />} />
              <Route path="/reports" element={token ? <Layout><ReportsPage /></Layout> : <Navigate to="/login" />} />
              <Route path="/settings" element={token ? <Layout><SettingsPage /></Layout> : <Navigate to="/login" />} />
              {/* Redirect unknown routes to dashboard */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </NotificationProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App; 