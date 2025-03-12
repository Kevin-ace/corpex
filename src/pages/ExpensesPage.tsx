import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Chip,
  InputAdornment,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  GetApp as ExportIcon,
} from '@mui/icons-material';
import { PageLayout } from '../components/PageLayout';
import { RootState, AppDispatch } from '../store/store';
import { fetchExpenses, setFilters, setPage, setLimit } from '../store/slices/expenseSlice';
import { type ExpenseStatus, type ExpenseCategory } from '../types/expense';

// Define the expense categories
const expenseCategories: ExpenseCategory[] = [
  'Travel',
  'Meals',
  'Office Supplies',
  'Technology',
  'Other',
];

export function ExpensesPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { items, filters, pagination, isLoading } = useSelector(
    (state: RootState) => state.expenses
  );

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchExpenses({ filters, pagination }));
  }, [dispatch, filters, pagination]);

  const handleStatusChange = (status: ExpenseStatus) => {
    dispatch(setFilters({ ...filters, status }));
  };

  const handleCategoryChange = (category: ExpenseCategory) => {
    dispatch(setFilters({ ...filters, category }));
  };

  const handleSearch = () => {
    dispatch(setFilters({ ...filters, search: searchTerm }));
  };

  const handleExport = () => {
    // TODO: Implement export functionality
  };

  return (
    <PageLayout title="Expenses">
      <Paper sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField
            placeholder="Search expenses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ flexGrow: 1 }}
          />
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={filters.status || ''}
              label="Status"
              onChange={(e) => handleStatusChange(e.target.value as ExpenseStatus)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Approved">Approved</MenuItem>
              <MenuItem value="Rejected">Rejected</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={filters.category || ''}
              label="Category"
              onChange={(e) =>
                handleCategoryChange(e.target.value as ExpenseCategory)
              }
            >
              <MenuItem value="">All</MenuItem>
              {expenseCategories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            startIcon={<ExportIcon />}
            onClick={handleExport}
          >
            Export
          </Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Merchant</TableCell>
                <TableCell>Category</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((expense) => (
                <TableRow
                  key={expense.id}
                  hover
                  onClick={() => navigate(`/expenses/${expense.id}`)}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell>
                    {new Date(expense.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{expense.merchant}</TableCell>
                  <TableCell>{expense.category}</TableCell>
                  <TableCell align="right">
                    ${expense.amount.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={expense.status}
                      color={
                        expense.status === 'Approved'
                          ? 'success'
                          : expense.status === 'Rejected'
                          ? 'error'
                          : 'warning'
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Button size="small" onClick={() => navigate(`/expenses/${expense.id}`)}>
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={pagination.total}
          page={pagination.page - 1}
          rowsPerPage={pagination.limit}
          onPageChange={(_, newPage) => dispatch(setPage(newPage + 1))}
          onRowsPerPageChange={(e) =>
            dispatch(setLimit(parseInt(e.target.value, 10)))
          }
        />
      </Paper>
    </PageLayout>
  );
} 