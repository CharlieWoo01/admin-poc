// Fix: Replaced the incorrect Modal component with the correct type definitions.
import type React from 'react';

export type Role = 'ROLE_SUPER_ADMIN' | 'ROLE_ADMIN' | 'ROLE_MODERATOR';

export interface User {
  id: string;
  username: string;
  email: string;
  roles: Role[];
  createdAt: string;
  status: 'banned' | 'active';
}

export interface Award {
  id: string;
  name: string;
  recipient: string;
  recipe: string;
  generatedAt: string;
  imageUrl: string;
}

export interface Ban {
  id: string;
  user: string;
  reason: string;
  expiresAt: string | null;
  bannedBy: string;
  createdAt: string;
}

export interface Fixture {
  id: string;
  week: number;
  stage: string;
  teamA: string;
  teamB: string;
  scoreA: number | null;
  scoreB: number | null;
  status: 'completed' | 'scheduled';
}

export interface Stat {
    id: string;
    player: string;
    statName: string;
    value: number;
    fixtureId: string;
    team: string;
}

export interface AdminLog {
    id: string;
    admin: string;
    action: string;
    target: string;
    timestamp: string;
}

export interface League {
    id: string;
    name: string;
}

export interface Team {
    id: string;
    name: string;
    leagueId: string;
}

export interface ColumnDefinition<T> {
    key: keyof T | string;
    header: string;
    cell?: (item: T) => React.ReactNode;
}
