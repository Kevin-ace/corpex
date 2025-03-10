export interface Expense {
  id: string;
  date: string;
  amount: number;
  category: ExpenseCategory;
  description: string;
  status: ExpenseStatus;
  merchant: string;
  receipt?: string;
  mpesaRef?: string;
  approvedBy?: string;
  approvedOn?: string;
  rejectedBy?: string;
  rejectedOn?: string;
  comments?: string[];
}

export type ExpenseCategory =
  | 'Travel'
  | 'Meals'
  | 'Office Supplies'
  | 'Technology'
  | 'Other';

export type ExpenseStatus = 'Pending' | 'Approved' | 'Rejected';

export interface ExpenseFilters {
  startDate?: string;
  endDate?: string;
  category?: ExpenseCategory;
  status?: ExpenseStatus;
  minAmount?: number;
  maxAmount?: number;
  search?: string;
}

export interface ExpensePagination {
  page: number;
  limit: number;
  total: number;
} 