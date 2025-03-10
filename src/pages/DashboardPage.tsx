import { Grid, Box, Typography, Paper } from '@mui/material';
import { PageLayout } from '../components/PageLayout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export function DashboardPage() {
  // Sample data - replace with real data from your state
  const trendData = [
    { month: 'Jan', amount: 2400 },
    { month: 'Feb', amount: 1398 },
    { month: 'Mar', amount: 9800 },
    { month: 'Apr', amount: 3908 },
    { month: 'May', amount: 4800 },
    { month: 'Jun', amount: 3800 },
  ];

  const categoryData = [
    { name: 'Travel', value: 35 },
    { name: 'Meals', value: 25 },
    { name: 'Office', value: 20 },
    { name: 'Software', value: 15 },
    { name: 'Other', value: 5 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <PageLayout title="Dashboard">
      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} md={6} lg={3}>
          <Paper 
            sx={{ 
              p: 3, 
              textAlign: 'center',
              background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
              color: 'white'
            }}
          >
            <Typography variant="h6">Total Expenses</Typography>
            <Typography variant="h3">$12,450</Typography>
            <Typography variant="body2">This Month</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Paper 
            sx={{ 
              p: 3, 
              textAlign: 'center',
              background: 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)',
              color: 'white'
            }}
          >
            <Typography variant="h6">Pending Approvals</Typography>
            <Typography variant="h3">8</Typography>
            <Typography variant="body2">Requires Action</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Paper 
            sx={{ 
              p: 3, 
              textAlign: 'center',
              background: 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)',
              color: 'white'
            }}
          >
            <Typography variant="h6">Approved</Typography>
            <Typography variant="h3">45</Typography>
            <Typography variant="body2">This Month</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Paper 
            sx={{ 
              p: 3, 
              textAlign: 'center',
              background: 'linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%)',
              color: 'white'
            }}
          >
            <Typography variant="h6">Rejected</Typography>
            <Typography variant="h3">3</Typography>
            <Typography variant="body2">This Month</Typography>
          </Paper>
        </Grid>

        {/* Charts Section */}
        <Grid item xs={12} lg={8}>
          <Paper sx={{ p: 3, height: '400px' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Expense Trends</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Paper sx={{ p: 3, height: '400px' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Category Distribution</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </PageLayout>
  );
} 