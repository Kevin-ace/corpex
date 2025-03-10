import {
  Box,
  Paper,
  Typography,
  Switch,
  Divider,
  TextField,
  Button,
  Grid,
} from '@mui/material';
import { PageLayout } from '../components/PageLayout';

export function SettingsPage() {
  return (
    <PageLayout title="Settings">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>Profile Settings</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField label="Full Name" defaultValue="Alex Johnson" />
              <TextField label="Email" defaultValue="alex.johnson@corpex.com" />
              <TextField label="Position" defaultValue="Finance Admin" />
              <Button variant="contained" sx={{ mt: 2 }}>
                Save Changes
              </Button>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>Preferences</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography>Email Notifications</Typography>
                <Switch defaultChecked />
              </Box>
              <Divider />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography>Dark Mode</Typography>
                <Switch />
              </Box>
              <Divider />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography>Two-Factor Authentication</Typography>
                <Switch defaultChecked />
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </PageLayout>
  );
} 