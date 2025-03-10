import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Box,
  TextField,
  Button,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Typography,
} from '@mui/material';
import { PageLayout } from '../components/PageLayout';
import { addExpense } from '../store/expenseSlice';
import { ExpenseCategory } from '../types/expense';

export function AddExpensePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    merchant: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    category: '' as ExpenseCategory,
    description: '',
    project: '',
    client: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newExpense = {
      id: Date.now().toString(),
      ...formData,
      amount: parseFloat(formData.amount),
      status: 'pending',
      submittedBy: 'current-user-id',
      submittedOn: new Date().toISOString(),
    };

    dispatch(addExpense(newExpense));
    navigate('/expenses');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name as string]: value,
    }));
  };

  return (
    <PageLayout title="Add New Expense">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Merchant"
              name="merchant"
              value={formData.merchant}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Amount"
              name="amount"
              type="number"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth required>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={formData.category}
                onChange={handleChange}
                label="Category"
              >
                <MenuItem value="Travel">Travel</MenuItem>
                <MenuItem value="Meals & Entertainment">Meals & Entertainment</MenuItem>
                <MenuItem value="Office">Office</MenuItem>
                <MenuItem value="Transportation">Transportation</MenuItem>
                <MenuItem value="Software">Software</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              multiline
              rows={4}
              value={formData.description}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Project"
              name="project"
              value={formData.project}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Client"
              name="client"
              value={formData.client}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button variant="outlined" onClick={() => navigate('/expenses')}>
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                Submit Expense
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </PageLayout>
  );
} 