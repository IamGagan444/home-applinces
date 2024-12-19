import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookie from 'js-cookie';

interface AuthState {
  userId: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  userId: Cookie.get('userId') || null, // Initialize from cookie if available
  isAuthenticated: !!Cookie.get('userId'), // Set authentication based on cookie
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ userId: string }>) => {
      console.log("hii hoelkfdslk",action.payload)
      state.userId = action.payload.userId;
      state.isAuthenticated = true;
      

      // Store userId in cookies (expires in 7 days)
      Cookie.set('userId', action.payload.userId, { expires: 7 });
    },
    logout: (state) => {
      state.userId = null;
      state.isAuthenticated = false;

      // Remove userId from cookies
      Cookie.remove('userId');
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
