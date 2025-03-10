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

const initialState: ExpenseState = {
  items: [],
  filters: {},
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
  },
  isLoading: false,
  error: null,
};

export const fetchExpenses = createAsyncThunk(
  'expenses/fetchExpenses',
  async ({ filters, pagination }: { filters: ExpenseFilters; pagination: ExpensePagination }) => {
    // TODO: Replace with actual API call
    const response = await new Promise<{ items: Expense[]; total: number }>((resolve) => {
      setTimeout(() => {
        const mockExpenses: Expense[] = [
          {
            id: '1',
            date: '2024-03-15',
            amount: 125.50,
            category: 'Travel',
            description: 'Flight to client meeting',
            status: 'Approved',
          },
          // Add more mock expenses...
        ];
        resolve({
          items: mockExpenses,
          total: 100, // Mock total count
        });
      }, 1000);
    });

    return response;
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