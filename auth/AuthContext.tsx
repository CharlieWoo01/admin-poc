
import React, { createContext, useState, useMemo, useCallback } from 'react';
import type { Role } from '../types';

interface AuthUser {
  username: string;
  roles: Role[];
}

interface AuthContextType {
  user: AuthUser;
  setUser: (user: AuthUser) => void;
  hasRole: (roles: Role[]) => boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const users: Record<string, AuthUser> = {
  super_admin: { username: 'SuperAdmin', roles: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN', 'ROLE_MODERATOR'] },
  admin: { username: 'AdminUser', roles: ['ROLE_ADMIN', 'ROLE_MODERATOR'] },
  moderator: { username: 'ModUser', roles: ['ROLE_MODERATOR'] },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<AuthUser>(users.super_admin);

  const hasRole = useCallback((requiredRoles: Role[]): boolean => {
    if (!requiredRoles || requiredRoles.length === 0) return true;
    return requiredRoles.some(role => currentUser.roles.includes(role));
  }, [currentUser.roles]);

  const value = useMemo(() => ({
    user: currentUser,
    setUser: (user: AuthUser) => setCurrentUser(user),
    hasRole,
  }), [currentUser, hasRole]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const ALL_USERS = users;
