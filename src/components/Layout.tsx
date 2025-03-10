import { Box } from '@mui/material';
import { Sidebar } from './Sidebar';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Navigate, useLocation } from 'react-router-dom';

const DRAWER_WIDTH = 280;

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { token } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: `${DRAWER_WIDTH}px`,
          minHeight: '100vh',
          backgroundColor: 'background.default',
        }}
      >
        {children}
      </Box>
    </Box>
  );
} 