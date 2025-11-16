
import { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';

export const useRBAC = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useRBAC must be used within an AuthProvider');
  }
  return context;
};
