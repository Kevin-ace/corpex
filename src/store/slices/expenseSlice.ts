import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Expense, ExpenseFilters, ExpensePagination } from '../../types/expense';

interface ExpenseState {
  items: Expense[];
  filters: ExpenseFilters;
  pagination: ExpensePagination;
  isLoading: boolean;
  error: string | null;
}

// Add mock data
const mockExpenses: Expense[] = [
  {
    id: '1',
    date: '2024-03-15',
    amount: 1250.50,
    category: 'Travel',
    description: 'Flight to Nairobi for client meeting',
    status: 'Approved',
    merchant: 'Kenya Airways',
    mpesaRef: 'MPESA123456',
  },
  {
    id: '2',
    date: '2024-03-14',
    amount: 350.75,
    category: 'Meals',
    description: 'Business lunch with potential clients',
    status: 'Pending',
    merchant: 'Carnivore Restaurant',
  },
  {
    id: '3',
    date: '2024-03-10',
    amount: 780.25,
    category: 'Office Supplies',
    description: 'New printer and stationery',
    status: 'Rejected',
    merchant: 'Office Mart',
    rejectedBy: 'Jane Doe',
    rejectedOn: '2024-03-11',
  },
  {
    id: '4',
    date: '2024-03-05',
    amount: 450.00,
    category: 'Technology',
    description: 'Software subscription - Q1',
    status: 'Approved',
    merchant: 'Microsoft',
    mpesaRef: 'MPESA789012',
  },
  {
    id: '5',
    date: '2024-03-01',
    amount: 125.30,
    category: 'Travel',
    description: 'Taxi to airport',
    status: 'Pending',
    merchant: 'Uber',
  }
];

const initialState: ExpenseState = {
  items: mockExpenses, // Initialize with mock data
  filters: {},
  pagination: {
    page: 1,
    limit: 10,
    total: mockExpenses.length,
  },
  isLoading: false,
  error: null,
};

export const fetchExpenses = createAsyncThunk(
  'expenses/fetchExpenses',
  async ({ filters, pagination }: { filters: ExpenseFilters; pagination: ExpensePagination }) => {
    // Simulate API call with delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Apply filters (simplified)
    let filtered = [...mockExpenses];
    
    if (filters.category) {
      filtered = filtered.filter(exp => exp.category === filters.category);
    }
    
    if (filters.status) {
      filtered = filtered.filter(exp => exp.status === filters.status);
    }
    
    if (filters.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(exp => 
        exp.description.toLowerCase().includes(search) || 
        exp.merchant.toLowerCase().includes(search)
      );
    }
    
    return {
      items: filtered,
      total: filtered.length,
    };
  }
);

const expenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<ExpenseFilters>) => {
      state.filters = action.payload;
      state.pagination.page = 1; // Reset to first page when filters change
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.pagination.limit = action.payload;
      state.pagination.page = 1; // Reset to first page when limit changes
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.items;
        state.pagination.total = action.payload.total;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch expenses';
      });
  },
});

export const { setFilters, setPage, setLimit } = expenseSlice.actions;
export default expenseSlice.reducer; 