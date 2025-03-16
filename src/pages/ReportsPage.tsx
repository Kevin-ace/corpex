import { useState } from 'react';
import { Grid, Paper, Typography, Box, Select, MenuItem, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { PageLayout } from '../components/PageLayout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { formatCurrency } from '../utils/formatters';

export function ReportsPage() {
  const [timeRange, setTimeRange] = useState('thisMonth');

  // Sample data - replace with real data from your state
  const monthlyData = [
    { month: 'Jan', amount: 4500 },
    { month: 'Feb', amount: 3200 },
    { month: 'Mar', amount: 6800 },
    { month: 'Apr', amount: 2400 },
    { month: 'May', amount: 5100 },
    { month: 'Jun', amount: 3900 },
  ];

  const categoryData = [
    { name: 'Travel', value: 35 },
    { name: 'Meals', value: 25 },
    { name: 'Office', value: 20 },
    { name: 'Software', value: 15 },
    { name: 'Other', value: 5 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  const topExpenses = [
    { id: 1, merchant: 'Delta Airlines', amount: 1250, category: 'Travel', date: '2024-03-15' },
    { id: 2, merchant: 'Hilton Hotels', amount: 850, category: 'Travel', date: '2024-03-14' },
    { id: 3, merchant: 'Adobe Systems', amount: 599, category: 'Software', date: '2024-03-10' },
    { id: 4, merchant: 'Office Depot', amount: 425, category: 'Office', date: '2024-03-08' },
    { id: 5, merchant: 'Uber', amount: 345, category: 'Transportation', date: '2024-03-05' },
  ];

  return (
    <PageLayout title="Reports">
      <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
        <Select
          value={timeRange}
          size="small"
          sx={{ width: 200 }}
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <MenuItem value="thisMonth">This Month</MenuItem>
          <MenuItem value="lastMonth">Last Month</MenuItem>
          <MenuItem value="thisYear">This Year</MenuItem>
        </Select>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Paper sx={{ p: 3, height: '400px' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Monthly Expenses</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
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
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Top Expenses</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Merchant</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell align="right">Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {topExpenses.map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                    <TableCell>{expense.merchant}</TableCell>
                    <TableCell>{expense.category}</TableCell>
                    <TableCell align="right">{formatCurrency(expense.amount)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </PageLayout>
  );
} 