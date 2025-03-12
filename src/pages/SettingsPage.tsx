import { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Avatar,
  Tab,
  Tabs,
} from '@mui/material';
import { PageLayout } from '../components/PageLayout';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      {...other}
      sx={{ py: 3 }}
    >
      {value === index && children}
    </Box>
  );
}

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+254700000000',
    position: 'Finance Manager',
  });

  const [companyData, setCompanyData] = useState({
    name: 'Acme Corp',
    address: 'Nairobi, Kenya',
    taxId: 'KRA-123456',
    mpesaPaybill: '123456',
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    expenseReminders: true,
    approvalAlerts: true,
  });

  return (
    <PageLayout title="Settings">
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Profile" />
          <Tab label="Company" />
          <Tab label="Notifications" />
          <Tab label="Integrations" />
        </Tabs>

        <TabPanel value={activeTab} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
              <Avatar
                sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
                src="/avatar-placeholder.png"
              />
              <Button variant="outlined">Change Photo</Button>
            </Grid>
            <Grid item xs={12} md={8}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Name"
                    value={profileData.name}
                    onChange={(e) =>
                      setProfileData({ ...profileData, name: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    value={profileData.email}
                    onChange={(e) =>
                      setProfileData({ ...profileData, email: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    value={profileData.phone}
                    onChange={(e) =>
                      setProfileData({ ...profileData, phone: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Position"
                    value={profileData.position}
                    onChange={(e) =>
                      setProfileData({ ...profileData, position: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained">Save Changes</Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Company Name"
                value={companyData.name}
                onChange={(e) =>
                  setCompanyData({ ...companyData, name: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Address"
                value={companyData.address}
                onChange={(e) =>
                  setCompanyData({ ...companyData, address: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Tax ID (KRA PIN)"
                value={companyData.taxId}
                onChange={(e) =>
                  setCompanyData({ ...companyData, taxId: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="M-Pesa Paybill"
                value={companyData.mpesaPaybill}
                onChange={(e) =>
                  setCompanyData({ ...companyData, mpesaPaybill: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained">Save Company Settings</Button>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.emailNotifications}
                    onChange={(e) =>
                      setNotifications({
                        ...notifications,
                        emailNotifications: e.target.checked,
                      })
                    }
                  />
                }
                label="Email Notifications"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.pushNotifications}
                    onChange={(e) =>
                      setNotifications({
                        ...notifications,
                        pushNotifications: e.target.checked,
                      })
                    }
                  />
                }
                label="Push Notifications"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.expenseReminders}
                    onChange={(e) =>
                      setNotifications({
                        ...notifications,
                        expenseReminders: e.target.checked,
                      })
                    }
                  />
                }
                label="Expense Reminders"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.approvalAlerts}
                    onChange={(e) =>
                      setNotifications({
                        ...notifications,
                        approvalAlerts: e.target.checked,
                      })
                    }
                  />
                }
                label="Approval Alerts"
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained">Save Notification Settings</Button>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={activeTab} index={3}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                M-Pesa Integration
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Configure your M-Pesa business account settings for payment processing.
              </Typography>
              <Button variant="contained" color="primary">
                Configure M-Pesa
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ my: 3 }} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Accounting Software
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Connect your accounting software for automatic expense syncing.
              </Typography>
              <Button variant="outlined">Connect QuickBooks</Button>
              <Button variant="outlined" sx={{ ml: 2 }}>
                Connect Sage
              </Button>
            </Grid>
          </Grid>
        </TabPanel>
      </Paper>
    </PageLayout>
  );
} 