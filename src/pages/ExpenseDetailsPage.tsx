import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Chip,
  Button,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { PageLayout } from '../components/PageLayout';
import { RootState } from '../store/store';
import { updateExpense } from '../store/expenseSlice';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';

export function ExpenseDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isEditMode, setIsEditMode] = useState(false);
  const [comment, setComment] = useState('');
  const [files, setFiles] = useState<File[]>([]);

  // Get expense from Redux store
  const expense = useSelector((state: RootState) =>
    state.expenses.expenses.find(e => e.id === id)
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
      'application/pdf': ['.pdf'],
    },
    onDrop: acceptedFiles => {
      setFiles(prev => [...prev, ...acceptedFiles]);
    },
  });

  const handleApprove = () => {
    if (expense) {
      dispatch(updateExpense({
        ...expense,
        status: 'approved',
        approvedOn: new Date().toISOString(),
        approvedBy: 'current-user-id',
        comment,
      }));
      navigate('/expenses');
    }
  };

  const handleReject = () => {
    if (expense) {
      dispatch(updateExpense({
        ...expense,
        status: 'rejected',
        rejectedOn: new Date().toISOString(),
        rejectedBy: 'current-user-id',
        comment,
      }));
      navigate('/expenses');
    }
  };

  if (!expense) {
    return <Typography>Expense not found</Typography>;
  }

  return (
    <PageLayout title="Expense Details">
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6">Expense Information</Typography>
              <Chip
                label={expense.status.toUpperCase()}
                color={
                  expense.status === 'approved'
                    ? 'success'
                    : expense.status === 'rejected'
                    ? 'error'
                    : 'warning'
                }
              />
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="textSecondary">
                  Merchant
                </Typography>
                <Typography variant="body1">{expense.merchant}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="textSecondary">
                  Amount
                </Typography>
                <Typography variant="body1">
                  ${expense.amount.toFixed(2)}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="textSecondary">
                  Category
                </Typography>
                <Typography variant="body1">{expense.category}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="textSecondary">
                  Date
                </Typography>
                <Typography variant="body1">
                  {new Date(expense.date).toLocaleDateString()}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="textSecondary">
                  Description
                </Typography>
                <Typography variant="body1">{expense.description}</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Receipts & Documents
            </Typography>
            <Box
              {...getRootProps()}
              sx={{
                border: '2px dashed',
                borderColor: 'divider',
                borderRadius: 1,
                p: 3,
                textAlign: 'center',
                cursor: 'pointer',
              }}
            >
              <input {...getInputProps()} />
              <CloudUploadIcon sx={{ fontSize: 40, color: 'primary.main' }} />
              <Typography>
                Drag & drop files here, or click to select files
              </Typography>
            </Box>
            {files.length > 0 && (
              <Box sx={{ mt: 2 }}>
                {files.map((file, index) => (
                  <Typography key={index} variant="body2">
                    {file.name}
                  </Typography>
                ))}
              </Box>
            )}
          </Paper>

          {expense.status === 'pending' && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Actions
              </Typography>
              <TextField
                fullWidth
                label="Comment"
                multiline
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  fullWidth
                  variant="contained"
                  color="success"
                  onClick={handleApprove}
                >
                  Approve
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  color="error"
                  onClick={handleReject}
                >
                  Reject
                </Button>
              </Box>
            </Paper>
          )}
        </Grid>
      </Grid>
    </PageLayout>
  );
} 