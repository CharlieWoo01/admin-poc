
import React from 'react';
import Button from '../ui/Button';
import Guard from '../../auth/Guard';
import type { Role } from '../../types';

export interface ButtonAction {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  roles: Role[];
  disabled?: boolean;
}

interface ButtonBarProps {
  actions: ButtonAction[];
}

const ButtonBar: React.FC<ButtonBarProps> = ({ actions }) => {
  return (
    <div className="mt-6 flex items-center space-x-3">
      {actions.map((action, index) => (
        <Guard key={index} roles={action.roles}>
          <Button onClick={action.onClick} variant={action.variant} disabled={action.disabled}>
            {action.label}
          </Button>
        </Guard>
      ))}
    </div>
  );
};

export default ButtonBar;
