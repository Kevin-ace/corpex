import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Expense } from '../types/expense';

interface ExpenseState {
  expenses: Expense[];
  loading: boolean;
  error: string | null;
}

const initialState: ExpenseState = {
  expenses: [],
  loading: false,
  error: null,
};

const expenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<Expense>) => {
      state.expenses.push(action.payload);
    },
    updateExpense: (state, action: PayloadAction<Expense>) => {
      const index = state.expenses.findIndex(e => e.id === action.payload.id);
      if (index !== -1) {
        state.expenses[index] = action.payload;
      }
    },
    setExpenses: (state, action: PayloadAction<Expense[]>) => {
      state.expenses = action.payload;
    },
  },
});

export const { addExpense, updateExpense, setExpenses } = expenseSlice.actions;
export default expenseSlice.reducer; 