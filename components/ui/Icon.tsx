
import React from 'react';

// Fix: Export the IconName type to make it available for other modules.
export type IconName = 'dashboard' | 'users' | 'awards' | 'ban' | 'fixtures' | 'stats' | 'dots' | 'edit' | 'delete' | 'view' | 'chevron-down' | 'search' | 'external-link' | 'generate-fixtures' | 'settings' | 'menu' | 'close';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  className?: string;
}

const ICONS: Record<IconName, React.ReactNode> = {
  dashboard: <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h-1.5m1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 1.5m1-1.5l1 1.5m0 0l.5 1.5m-1.5-1.5l-1.5-1.5m0 0l-1 1.5m1-1.5l1 1.5" />,
  users: <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-4.663M12 3.375c-3.418 0-6.167 2.67-6.167 5.95s2.75 5.95 6.167 5.95 6.167-2.67 6.167-5.95S15.418 3.375 12 3.375z" />,
  awards: <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9a9.75 9.75 0 1011.693-9.123 7.5 7.5 0 01-1.12 6.551M16.5 18.75a9.75 9.75 0 00-11.693-9.123" />,
  ban: <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />,
  fixtures: <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M12 12.75h.008v.008H12v-.008z" />,
  stats: <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v16.5h16.5" />,
  dots: <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />,
  edit: <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />,
  delete: <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.036-2.134H8.716c-1.126 0-2.037.954-2.037 2.134v.916m7.5 0a48.667 48.667 0 00-7.5 0" />,
  view: <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.432 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />,
  'chevron-down': <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />,
  search: <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />,
  'external-link': <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-4.5 0V6m0 0h-3m3 0l-7.5 7.5" />,
  'generate-fixtures': <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M12 11.25v3m1.5-1.5h-3" />,
  settings: <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-1.008 1.11-1.212l2.158-.81c.29-.11.62-.11.91 0l2.158.81c.55.204 1.02.67 1.11 1.212l.332 1.992a.9.9 0 00.82.723l2.22-.178c.55-.044.99.4 1.04.948l.12 1.992a1 1 0 01-.56 1.05l-1.93.965a.9.9 0 00-.37 1.19l1.19 2.058c.32.55-.09 1.23-.74 1.23h-2.19a.9.9 0 00-.81.54l-.94 1.88a1 1 0 01-.9 1.11h-2.4a1 1 0 01-.9-1.11l-.94-1.88a.9.9 0 00-.81-.54H5.09c-.65 0-1.06-.68-.74-1.23l1.19-2.058a.9.9 0 00-.37-1.19L3.24 13.5c-.55-.27-.68-.92-.56-1.05l.12-1.992c.05-.55.49-.99.04-1.04l2.22-.178a.9.9 0 00.82-.723l.332-1.992z" />,
  menu: <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />,
  close: <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />,
};

const Icon: React.FC<IconProps> = ({ name, className = 'h-6 w-6', ...props }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} {...props}>
      {ICONS[name]}
    </svg>
  );
};

export default Icon;
