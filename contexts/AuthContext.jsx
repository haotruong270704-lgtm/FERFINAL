import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { authService } from '../services/authService';
import { clearStoredSession, readStoredSession } from '../utils/authStorage';

const AuthContext = createContext(null);

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  error: null
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'INIT_SESSION':
      return {
        ...state,
        user: action.payload?.user || null,
        token: action.payload?.token || null,
        isAuthenticated: Boolean(action.payload?.token),
        isLoading: false,
        error: null
      };
    case 'LOGIN_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        error: null
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case 'LOGOUT':
      return {
        ...initialState,
        isLoading: false
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const session = readStoredSession();
    dispatch({ type: 'INIT_SESSION', payload: session });
  }, []);

  useEffect(() => {
    const handleUnauthorized = () => {
      clearStoredSession();
      dispatch({ type: 'LOGOUT' });
    };

    window.addEventListener('auth:unauthorized', handleUnauthorized);

    return () => {
      window.removeEventListener('auth:unauthorized', handleUnauthorized);
    };
  }, []);

  const login = async (email, password) => {
    dispatch({ type: 'LOGIN_REQUEST' });

    try {
      const session = await authService.login(email, password);
      dispatch({ type: 'LOGIN_SUCCESS', payload: session });
      return session;
    } catch (error) {
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: error.message || 'Dang nhap that bai.'
      });
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    dispatch({ type: 'LOGOUT' });
  };

  const value = useMemo(
    () => ({
      ...state,
      login,
      logout,
      isAdmin: state.user?.role === 'admin'
    }),
    [state]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth phai duoc su dung ben trong AuthProvider.');
  }

  return context;
};



