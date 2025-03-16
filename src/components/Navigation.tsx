import { Link, useLocation } from 'react-router-dom';
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Box,
  Typography,
  Avatar
} from '@mui/material';
import logo from '../../logo.jpeg';  // Import the logo image
import {
  Dashboard as DashboardIcon,
  Receipt as ExpensesIcon,
  Assessment as ReportsIcon,
  Settings as SettingsIcon,
  Add as AddIcon
} from '@mui/icons-material';

const DRAWER_WIDTH = 280;

export function Navigation() {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
    { path: '/expenses', label: 'Expenses', icon: <ExpensesIcon /> },
    { path: '/reports', label: 'Reports', icon: <ReportsIcon /> },
    { path: '/settings', label: 'Settings', icon: <SettingsIcon /> },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          borderRight: '1px solid rgba(0, 0, 0, 0.12)',
        },
      }}
    >
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <img src={logo} alt="Corpex" style={{ height: 32 }} />
          <Typography variant="h6" sx={{ ml: 2 }}>Corpex</Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar sx={{ mr: 2 }}>AJ</Avatar>
            <Box>
              <Typography variant="subtitle1">Alex Johnson</Typography>
              <Typography variant="body2" color="textSecondary">Finance Admin</Typography>
            </Box>
          </Box>
        </Box>

        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item.path}
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              sx={{
                borderRadius: 1,
                mb: 1,
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                  '& .MuiListItemIcon-root': {
                    color: 'white',
                  },
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>

        <Box sx={{ position: 'fixed', bottom: 24, width: DRAWER_WIDTH - 48 }}>
          <Link to="/add-expense" style={{ textDecoration: 'none' }}>
            <Box
              sx={{
                backgroundColor: 'primary.main',
                color: 'white',
                p: 2,
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
              }}
            >
              <AddIcon sx={{ mr: 1 }} />
              <Typography>New Expense</Typography>
            </Box>
          </Link>
        </Box>
      </Box>
    </Drawer>
  );
} 
