
import React from 'react';
import { useRBAC } from '../hooks/useRBAC';
import type { Role } from '../types';

interface GuardProps {
  children: React.ReactNode;
  roles: Role[];
  fallback?: React.ReactNode;
}

const Guard: React.FC<GuardProps> = ({ children, roles, fallback = null }) => {
  const { hasRole } = useRBAC();

  if (hasRole(roles)) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
};

export default Guard;
