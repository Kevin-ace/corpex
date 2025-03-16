import { Grid, Box, Typography, Paper, useTheme, useMediaQuery } from '@mui/material';
import { PageLayout } from '../components/PageLayout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { formatCurrency } from '../utils/formatters';

export function DashboardPage() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'lg'));

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
      <Grid container spacing={{ xs: 2, sm: 3 }}>
        {/* Summary Cards */}
        <Grid item xs={6} sm={6} md={3}>
          <Paper 
            sx={{ 
              p: { xs: 2, sm: 3 }, 
              textAlign: 'center',
              background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
              color: 'white',
              borderRadius: 2,
              boxShadow: 2,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <Typography variant={isSmallScreen ? "subtitle1" : "h6"}>Total Expenses</Typography>
            <Typography variant={isSmallScreen ? "h4" : "h3"} sx={{ my: 1 }}>{formatCurrency(1562500)}</Typography>
            <Typography variant="body2">This Month</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <Paper 
            sx={{ 
              p: { xs: 2, sm: 3 }, 
              textAlign: 'center',
              background: 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)',
              color: 'white',
              borderRadius: 2,
              boxShadow: 2,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <Typography variant={isSmallScreen ? "subtitle1" : "h6"}>Pending Approvals</Typography>
            <Typography variant={isSmallScreen ? "h4" : "h3"} sx={{ my: 1 }}>8</Typography>
            <Typography variant="body2">Requires Action</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <Paper 
            sx={{ 
              p: { xs: 2, sm: 3 }, 
              textAlign: 'center',
              background: 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)',
              color: 'white',
              borderRadius: 2,
              boxShadow: 2,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <Typography variant={isSmallScreen ? "subtitle1" : "h6"}>Approved</Typography>
            <Typography variant={isSmallScreen ? "h4" : "h3"} sx={{ my: 1 }}>45</Typography>
            <Typography variant="body2">This Month</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <Paper 
            sx={{ 
              p: { xs: 2, sm: 3 }, 
              textAlign: 'center',
              background: 'linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%)',
              color: 'white',
              borderRadius: 2,
              boxShadow: 2,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <Typography variant={isSmallScreen ? "subtitle1" : "h6"}>Rejected</Typography>
            <Typography variant={isSmallScreen ? "h4" : "h3"} sx={{ my: 1 }}>3</Typography>
            <Typography variant="body2">This Month</Typography>
          </Paper>
        </Grid>

        {/* Charts Section */}
        <Grid item xs={12} lg={8}>
          <Paper sx={{ 
            p: { xs: 2, sm: 3 }, 
            height: { xs: '350px', sm: '400px', lg: '450px' },
            borderRadius: 2,
            boxShadow: 2
          }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Expense Trends</Typography>
            <ResponsiveContainer width="100%" height={isSmallScreen ? 250 : 300}>
              <BarChart data={trendData} margin={{ 
                top: 5, 
                right: isSmallScreen ? 10 : 30, 
                left: isSmallScreen ? -20 : 0, 
                bottom: 5 
              }}>
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
          <Paper sx={{ 
            p: { xs: 2, sm: 3 }, 
            height: { xs: '350px', sm: '400px', lg: '450px' },
            borderRadius: 2,
            boxShadow: 2
          }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Category Distribution</Typography>
            <ResponsiveContainer width="100%" height={isSmallScreen ? 250 : 300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => isSmallScreen ? (percent * 100).toFixed(0) + '%' : `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={isSmallScreen ? 60 : 80}
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