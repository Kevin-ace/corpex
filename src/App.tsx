import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { ExpensesPage } from './pages/ExpensesPage';
import { ExpenseDetailsPage } from './pages/ExpenseDetailsPage';
import { ReportsPage } from './pages/ReportsPage';
import { SettingsPage } from './pages/SettingsPage';
import { AddExpensePage } from './pages/AddExpensePage';
import { Layout } from './components/Layout';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <Layout>
                <DashboardPage />
              </Layout>
            }
          />
          <Route
            path="/expenses"
            element={
              <Layout>
                <ExpensesPage />
              </Layout>
            }
          />
          <Route
            path="/expenses/:id"
            element={
              <Layout>
                <ExpenseDetailsPage />
              </Layout>
            }
          />
          <Route
            path="/add-expense"
            element={
              <Layout>
                <AddExpensePage />
              </Layout>
            }
          />
          <Route
            path="/reports"
            element={
              <Layout>
                <ReportsPage />
              </Layout>
            }
          />
          <Route
            path="/settings"
            element={
              <Layout>
                <SettingsPage />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App; 