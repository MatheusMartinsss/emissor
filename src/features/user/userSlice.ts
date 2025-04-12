import { jwtDecode } from 'jwt-decode'
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { isTokenExpired } from '@/utils/utils';

export interface JwtPayload {
  sub: number;
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  company_id: number
  role: string;
  iat: number;
  exp: number;
}

export interface IUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  company_id: number;

}


interface UserState {
  token: string;
  user: IUser | null;
  mode: 'light' | 'dark';
}

const initialState: UserState = {
  token: localStorage.getItem('accessToken') || '',
  user: null,
  mode: localStorage.getItem('mode')
    ? (localStorage.getItem('mode') as 'light' | 'dark')
    : window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ accessToken: string; }>) => {
      const decodedToken = jwtDecode<JwtPayload>(action.payload.accessToken);
      state.token = action.payload.accessToken;
      state.user = {
        id: decodedToken.id,
        email: decodedToken.email,
        company_id: decodedToken.company_id,
        firstName: decodedToken.firstName,
        lastName: decodedToken.lastName,
        role: decodedToken.role

      }
      //  localStorage.setItem('refreshToken', action.payload.refreshToken)
      localStorage.setItem('accessToken', action.payload.accessToken)

    },

    changeMode: (state) => {
      if (state.mode === 'light') {
        state.mode = 'dark';
        localStorage.setItem('mode', 'dark');
      } else {
        state.mode = 'light';
        localStorage.setItem('mode', 'light');
      }
    },
    initializeAuth: (state) => {
      const storedToken = localStorage.getItem('accessToken');
      const storedMode = localStorage.getItem('mode') as 'dark' | 'light';

      if (storedMode) {
        state.mode = storedMode;
      }

      if (storedToken) {
        state.token = storedToken;
        const decoded = jwtDecode<JwtPayload>(storedToken);
        state.user = {
          id: decoded.id,
          email: decoded.email,
          firstName: decoded.firstName || '',
          lastName: decoded.lastName,
          role: decoded.role,
          company_id: decoded.company_id
        };
      }
    },
    logout: (state) => {
      state.token = ''
      state.user = null
      localStorage.removeItem('accessToken')
    }
  }
});



export const { setCredentials, changeMode, logout, initializeAuth } = userSlice.actions;

export default userSlice.reducer;
