import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  isLoading: false,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }) => {
    // TODO: Replace with actual API call
    const response = await new Promise<{ user: User; token: string }>((resolve, reject) => {
      setTimeout(() => {
        // Use demo@corpex.com/demo123 as valid credentials
        if (credentials.email === 'demo@corpex.com' && credentials.password === 'demo123') {
          resolve({
            user: {
              id: '1',
              email: credentials.email,
              name: 'John Doe',
            },
            token: 'dummy_token',
          });
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 1000);
    });

    localStorage.setItem('token', response.token);
    return response;
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData: { name: string; email: string; password: string; confirmPassword: string }) => {
    // Validate password match
    if (userData.password !== userData.confirmPassword) {
      throw new Error('Passwords do not match');
    }

    // TODO: Replace with actual API call
    const response = await new Promise<{ user: User; token: string }>((resolve, reject) => {
      setTimeout(() => {
        // Simulate email validation
        if (!userData.email.includes('@')) {
          reject(new Error('Please enter a valid email address'));
          return;
        }

        // Simulate password strength validation
        if (userData.password.length < 6) {
          reject(new Error('Password must be at least 6 characters'));
          return;
        }

        resolve({
          user: {
            id: Math.random().toString(36).substring(2, 9), // Generate random ID
            email: userData.email,
            name: userData.name,
          },
          token: 'dummy_token_' + Math.random().toString(36).substring(2, 9),
        });
      }, 1000);
    });

    localStorage.setItem('token', response.token);
    return response;
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('token');
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to login';
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to register';
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer; 