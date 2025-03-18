import axios from 'axios';

// Configure axios with default settings
const API_URL = 'http://localhost:8000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Cache implementation
class AnalyticsCache {
  constructor() {
    this.cache = {};
    this.expiry = {};
    this.DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds
  }

  // Set data in cache with expiry
  set(key, data, ttl = this.DEFAULT_TTL) {
    this.cache[key] = data;
    this.expiry[key] = Date.now() + ttl;
    
    // Store in localStorage for persistence across page refreshes
    try {
      localStorage.setItem(`analytics_${key}`, JSON.stringify({
        data,
        expiry: this.expiry[key]
      }));
    } catch (error) {
      console.error('Error storing data in localStorage:', error);
    }
  }

  // Get data from cache if not expired
  get(key) {
    // First try to get from memory cache
    if (this.cache[key] && this.expiry[key] > Date.now()) {
      return this.cache[key];
    }
    
    // If not in memory, try localStorage
    try {
      const stored = localStorage.getItem(`analytics_${key}`);
      if (stored) {
        const { data, expiry } = JSON.parse(stored);
        if (expiry > Date.now()) {
          // Restore to memory cache
          this.cache[key] = data;
          this.expiry[key] = expiry;
          return data;
        } else {
          // Remove expired data
          localStorage.removeItem(`analytics_${key}`);
        }
      }
    } catch (error) {
      console.error('Error retrieving data from localStorage:', error);
    }
    
    return null;
  }

  // Check if cache has valid data for key
  has(key) {
    return this.get(key) !== null;
  }

  // Clear specific cache entry
  clear(key) {
    delete this.cache[key];
    delete this.expiry[key];
    try {
      localStorage.removeItem(`analytics_${key}`);
    } catch (error) {
      console.error('Error removing data from localStorage:', error);
    }
  }

  // Clear all cache
  clearAll() {
    this.cache = {};
    this.expiry = {};
    try {
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('analytics_')) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }
}

// Create cache instance
const analyticsCache = new AnalyticsCache();

// Authentication service
const authService = {
  login: async (username, password) => {
    try {
      const response = await api.post('/token/', { username, password });
      const { access, refresh } = response.data;
      
      // Store tokens
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      
      // Set auth header for future requests
      api.defaults.headers.common['Authorization'] = `Bearer ${access}`;
      
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  },
  
  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    delete api.defaults.headers.common['Authorization'];
    analyticsCache.clearAll();
  },
  
  refreshToken: async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }
      
      const response = await api.post('/token/refresh/', { refresh: refreshToken });
      const { access } = response.data;
      
      localStorage.setItem('access_token', access);
      api.defaults.headers.common['Authorization'] = `Bearer ${access}`;
      
      return true;
    } catch (error) {
      console.error('Token refresh failed:', error);
      authService.logout();
      return false;
    }
  },
  
  isAuthenticated: () => {
    return !!localStorage.getItem('access_token');
  },
  
  setupInterceptors: () => {
    // Add request interceptor to include auth token
    api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    
    // Add response interceptor to handle token refresh
    api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        
        // If error is 401 and we haven't tried to refresh token yet
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          
          try {
            const refreshed = await authService.refreshToken();
            if (refreshed) {
              return api(originalRequest);
            }
          } catch (refreshError) {
            return Promise.reject(refreshError);
          }
        }
        
        return Promise.reject(error);
      }
    );
  }
};

// Initialize auth interceptors
authService.setupInterceptors();

// Analytics service with caching
const analyticsService = {
  // Get all analytics data
  getAllAnalytics: async (forceRefresh = false) => {
    const cacheKey = 'all_analytics';
    
    if (!forceRefresh && analyticsCache.has(cacheKey)) {
      return analyticsCache.get(cacheKey);
    }
    
    try {
      const response = await api.get('/analytics/');
      analyticsCache.set(cacheKey, response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching analytics:', error);
      throw error;
    }
  },
  
  // Get expense summary
  getExpenseSummary: async (forceRefresh = false) => {
    const cacheKey = 'expense_summary';
    
    if (!forceRefresh && analyticsCache.has(cacheKey)) {
      return analyticsCache.get(cacheKey);
    }
    
    try {
      const response = await api.get('/analytics/expense-summary/');
      analyticsCache.set(cacheKey, response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching expense summary:', error);
      throw error;
    }
  },
  
  // Get expense by category
  getExpenseByCategory: async (forceRefresh = false) => {
    const cacheKey = 'expense_by_category';
    
    if (!forceRefresh && analyticsCache.has(cacheKey)) {
      return analyticsCache.get(cacheKey);
    }
    
    try {
      const response = await api.get('/analytics/expense-by-category/');
      analyticsCache.set(cacheKey, response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching expense by category:', error);
      throw error;
    }
  },
  
  // Get expense by status
  getExpenseByStatus: async (forceRefresh = false) => {
    const cacheKey = 'expense_by_status';
    
    if (!forceRefresh && analyticsCache.has(cacheKey)) {
      return analyticsCache.get(cacheKey);
    }
    
    try {
      const response = await api.get('/analytics/expense-by-status/');
      analyticsCache.set(cacheKey, response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching expense by status:', error);
      throw error;
    }
  },
  
  // Get monthly expenses
  getMonthlyExpenses: async (forceRefresh = false) => {
    const cacheKey = 'monthly_expenses';
    
    if (!forceRefresh && analyticsCache.has(cacheKey)) {
      return analyticsCache.get(cacheKey);
    }
    
    try {
      const response = await api.get('/analytics/monthly-expenses/');
      analyticsCache.set(cacheKey, response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching monthly expenses:', error);
      throw error;
    }
  },
  
  // Get category trends
  getCategoryTrends: async (forceRefresh = false) => {
    const cacheKey = 'category_trends';
    
    if (!forceRefresh && analyticsCache.has(cacheKey)) {
      return analyticsCache.get(cacheKey);
    }
    
    try {
      const response = await api.get('/analytics/category-trends/');
      analyticsCache.set(cacheKey, response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching category trends:', error);
      throw error;
    }
  },
  
  // Get payment statistics
  getPaymentStatistics: async (forceRefresh = false) => {
    const cacheKey = 'payment_statistics';
    
    if (!forceRefresh && analyticsCache.has(cacheKey)) {
      return analyticsCache.get(cacheKey);
    }
    
    try {
      const response = await api.get('/analytics/payment-statistics/');
      analyticsCache.set(cacheKey, response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching payment statistics:', error);
      throw error;
    }
  },
  
  // Force refresh all analytics data
  refreshAllAnalytics: async () => {
    try {
      const response = await api.get('/analytics/');
      analyticsCache.set('all_analytics', response.data);
      
      // Also update individual caches
      if (response.data.expense_summary) {
        analyticsCache.set('expense_summary', response.data.expense_summary);
      }
      if (response.data.expense_by_category) {
        analyticsCache.set('expense_by_category', response.data.expense_by_category);
      }
      if (response.data.expense_by_status) {
        analyticsCache.set('expense_by_status', response.data.expense_by_status);
      }
      if (response.data.monthly_expenses) {
        analyticsCache.set('monthly_expenses', response.data.monthly_expenses);
      }
      if (response.data.category_trends) {
        analyticsCache.set('category_trends', response.data.category_trends);
      }
      if (response.data.payment_statistics) {
        analyticsCache.set('payment_statistics', response.data.payment_statistics);
      }
      
      return response.data;
    } catch (error) {
      console.error('Error refreshing analytics:', error);
      throw error;
    }
  }
};

// Expense service
const expenseService = {
  // Get all expenses
  getAllExpenses: async () => {
    try {
      const response = await api.get('/expenses/');
      return response.data;
    } catch (error) {
      console.error('Error fetching expenses:', error);
      throw error;
    }
  },
  
  // Get expense by ID
  getExpenseById: async (id) => {
    try {
      const response = await api.get(`/expenses/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching expense ${id}:`, error);
      throw error;
    }
  },
  
  // Create new expense
  createExpense: async (expenseData) => {
    try {
      const response = await api.post('/expenses/', expenseData);
      // Clear analytics cache since data has changed
      analyticsCache.clearAll();
      return response.data;
    } catch (error) {
      console.error('Error creating expense:', error);
      throw error;
    }
  },
  
  // Update expense
  updateExpense: async (id, expenseData) => {
    try {
      const response = await api.put(`/expenses/${id}/`, expenseData);
      // Clear analytics cache since data has changed
      analyticsCache.clearAll();
      return response.data;
    } catch (error) {
      console.error(`Error updating expense ${id}:`, error);
      throw error;
    }
  },
  
  // Delete expense
  deleteExpense: async (id) => {
    try {
      await api.delete(`/expenses/${id}/`);
      // Clear analytics cache since data has changed
      analyticsCache.clearAll();
      return true;
    } catch (error) {
      console.error(`Error deleting expense ${id}:`, error);
      throw error;
    }
  },
  
  // Approve expense
  approveExpense: async (id) => {
    try {
      const response = await api.post(`/expenses/${id}/approve/`);
      // Clear analytics cache since data has changed
      analyticsCache.clearAll();
      return response.data;
    } catch (error) {
      console.error(`Error approving expense ${id}:`, error);
      throw error;
    }
  },
  
  // Reject expense
  rejectExpense: async (id) => {
    try {
      const response = await api.post(`/expenses/${id}/reject/`);
      // Clear analytics cache since data has changed
      analyticsCache.clearAll();
      return response.data;
    } catch (error) {
      console.error(`Error rejecting expense ${id}:`, error);
      throw error;
    }
  },
  
  // Process payment for expense
  processPayment: async (id, paymentData) => {
    try {
      const response = await api.post(`/expenses/${id}/process_payment/`, paymentData);
      // Clear analytics cache since data has changed
      analyticsCache.clearAll();
      return response.data;
    } catch (error) {
      console.error(`Error processing payment for expense ${id}:`, error);
      throw error;
    }
  }
};

// Payment service
const paymentService = {
  // Get all payments
  getAllPayments: async () => {
    try {
      const response = await api.get('/payments/');
      return response.data;
    } catch (error) {
      console.error('Error fetching payments:', error);
      throw error;
    }
  },
  
  // Get payment by ID
  getPaymentById: async (id) => {
    try {
      const response = await api.get(`/payments/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching payment ${id}:`, error);
      throw error;
    }
  }
};

// User service
const userService = {
  // Get current user profile
  getCurrentUser: async () => {
    try {
      const response = await api.get('/users/');
      return response.data.results[0]; // Current user should be the only one returned
    } catch (error) {
      console.error('Error fetching current user:', error);
      throw error;
    }
  }
};

export {
  api,
  authService,
  analyticsService,
  expenseService,
  paymentService,
  userService,
  analyticsCache
};
