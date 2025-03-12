import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Box,
  Grid,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Alert,
} from '@mui/material';
import { PageLayout } from '../components/PageLayout';
import { OCRScanner } from '../components/OCRScanner';
import { MpesaPayment } from '../components/MpesaPayment';
import { type ExpenseCategory } from '../types/expense';

const categories: ExpenseCategory[] = [
  'Travel',
  'Meals',
  'Office Supplies',
  'Technology',
  'Other',
];

export function AddExpensePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    merchant: '',
    amount: '',
    date: '',
    category: '',
    description: '',
  });
  const [showMpesa, setShowMpesa] = useState(false);
  const [receipt, setReceipt] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleOCRComplete = (data: any) => {
    setFormData({
      ...formData,
      merchant: data.merchant,
      amount: data.amount.toString(),
      date: data.date,
      category: data.category,
    });
  };

  const handleMpesaSuccess = (reference: string) => {
    setShowMpesa(false);
    // Handle successful payment
    handleSubmit(reference);
  };

  const handleSubmit = async (mpesaRef?: string) => {
    try {
      // TODO: Implement actual submission
      navigate('/expenses');
    } catch (err) {
      setError('Failed to submit expense');
    }
  };

  return (
    <PageLayout title="Add New Expense">
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Expense Details
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <OCRScanner onScanComplete={handleOCRComplete} />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Merchant"
                  value={formData.merchant}
                  onChange={(e) =>
                    setFormData({ ...formData, merchant: e.target.value })
                  }
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Amount"
                  type="number"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Date"
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={formData.category}
                    label="Category"
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                  >
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                  <Button variant="outlined" onClick={() => navigate('/expenses')}>
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => setShowMpesa(true)}
                  >
                    Submit & Pay
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      {showMpesa && (
        <MpesaPayment
          amount={Number(formData.amount) || 0}
          onSuccess={handleMpesaSuccess}
          onCancel={() => setShowMpesa(false)}
        />
      )}
    </PageLayout>
  );
} 