import { Box, useMediaQuery, useTheme } from '@mui/material';
import { Sidebar, DRAWER_WIDTH } from './Sidebar';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Navigate, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { token } = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          ml: isSmallScreen ? 0 : `${DRAWER_WIDTH}px`,
          mt: isSmallScreen ? '64px' : 0,
          width: isSmallScreen ? '100%' : `calc(100% - ${DRAWER_WIDTH}px)`,
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          backgroundColor: 'background.default',
        }}
      >
        {children}
      </Box>
    </Box>
  );
} 