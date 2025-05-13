import { useContext } from 'react';
import { AuthContext } from './index';
import { AuthContextType } from './types';

export const useAuth = (): AuthContextType => {
  return useContext(AuthContext);
}

export const useRole = () => {
  const { user } = useAuth();
  return user?.role || null;
} 