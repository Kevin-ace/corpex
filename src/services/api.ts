import { Expense, type ExpenseCategory, type ExpenseStatus } from '../types/expense';

// Mock delay function
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock data
const mockExpenses: Expense[] = [
  {
    id: '1',
    date: '2024-03-15',
    amount: 1250.00,
    category: 'Travel',
    description: 'Flight to Nairobi - Client Meeting',
    status: 'Approved',
    merchant: 'Kenya Airways',
    receipt: 'receipt1.pdf',
    mpesaRef: 'MPESA7890123',
  },
  // Add more mock expenses...
];

export const api = {
  // Auth
  login: async (credentials: { email: string; password: string }) => {
    await delay(1000);
    if (credentials.email === 'demo@corpex.com' && credentials.password === 'demo123') {
      return {
        user: {
          id: '1',
          name: 'John Doe',
          email: credentials.email,
          role: 'Finance Manager',
        },
        token: 'mock_jwt_token',
      };
    }
    throw new Error('Invalid credentials');
  },

  // Expenses
  getExpenses: async (filters: any, pagination: any) => {
    await delay(800);
    return {
      items: mockExpenses,
      total: mockExpenses.length,
    };
  },

  uploadReceipt: async (file: File) => {
    await delay(1500);
    return {
      url: URL.createObjectURL(file),
      filename: file.name,
    };
  },

  // OCR Processing
  processReceipt: async (file: File) => {
    await delay(2000);
    return {
      merchant: 'Auto-detected Merchant',
      amount: 1234.56,
      date: new Date().toISOString().split('T')[0],
      category: 'Travel' as ExpenseCategory,
    };
  },

  // Reports
  generateReport: async (params: any) => {
    await delay(1500);
    return {
      url: 'mock-report.pdf',
    };
  },
}; 