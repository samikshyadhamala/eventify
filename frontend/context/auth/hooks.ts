import { useContext } from 'react';
import { AuthContext } from './index';
import { AuthContextType } from './types';

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export const useRole = () => {
  const { user } = useAuth();
  return user?.role || null;
}
