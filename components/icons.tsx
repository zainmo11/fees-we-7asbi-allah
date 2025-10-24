import React from 'react';

export const MostaqlIcon: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="50" fill="#4CAF50"/>
    <path d="M25 75V25H35L50 50L65 25H75V75H65V40L50 65L35 40V75H25Z" fill="white"/>
  </svg>
);

export const UpworkIcon: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM9.6 15.6c-.7 0-1.2-.5-1.2-1.2V9.6c0-.7.5-1.2 1.2-1.2h4.8c.7 0 1.2.5 1.2 1.2v4.8c0 .7-.5 1.2-1.2 1.2H9.6zm2.4-6c-.7 0-1.2.5-1.2 1.2v2.4c0 .7.5 1.2 1.2 1.2s1.2-.5 1.2-1.2V10.8c0-.7-.5-1.2-1.2-1.2z" fill="#6FDA44"/>
  </svg>
);

export const PaypalIcon: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.324 6.946c.148-1.043.914-2.11 2.36-2.11h10.11c3.15 0 4.887 2.013 4.54 5.04-.256 2.24-1.85 3.59-4.04 3.59h-2.34c-.64 0-1.01.38-1.18 1.18l-.53 2.58c-.11.53-.45.85-.98.85h-2.34c-.58 0-.68-.22-.53-.85l.8-3.77c.14-.68.5-1.04 1.18-1.04h.63c1.78 0 2.87-1.01 3.05-2.58.2-.95-.3-1.64-1.27-1.64h-3.05c-.64 0-1.08.38-1.25 1.22l-1.33 5.43c-.11.53-.45.85-.99.85H3.64c-.58 0-.68-.22-.53-.85l.9-4.3-.09-.39z" fill="#253B80"/>
    <path d="M5.594 4.546c.18-1.28 1.1-2.51 2.86-2.51h10.1c3.8 0 5.86 2.43 5.46 6.06-.31 2.69-2.22 4.31-4.85 4.31h-2.81c-.77 0-1.21.46-1.42 1.42l-.63 3.09c-.14.64-.54 1.02-1.18 1.02H7.61c-.7 0-.82-.26-.64-1.02l.96-4.52c.17-.81.6-1.25 1.42-1.25h.75c2.14 0 3.44-1.21 3.66-3.09.23-1.14-.36-1.97-1.53-1.97h-3.66c-.77 0-1.3.46-1.5 1.46L8.03 16.2c-.14.64-.54 1.02-1.18 1.02H4.37c-.7 0-.82-.26-.64-1.02l1.08-5.16-.12-.47z" fill="#179BD7"/>
  </svg>
);

export const AirtmIcon: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M32 0C14.327 0 0 14.327 0 32s14.327 32 32 32 32-14.327 32-32S49.673 0 32 0z" fill="#00D4D4"/>
    <path d="M48.24 33.64c-1.34-4.8-5.64-8.12-10.42-8.12-1.62 0-3.18.38-4.6 1.06-.24.12-.48.24-.7.38l-1.44-.82c-.96.52-1.84 1.12-2.66 1.8l1.32.76c-3.12 2.22-5.1 5.84-5.1 9.82 0 6.64 5.38 12.02 12.02 12.02 5.6 0 10.38-3.84 11.7-9.02l-.08.12-.04.08z" fill="#fff"/>
  </svg>
);

export const EGPIcon: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="#84CC16" strokeWidth="2"/>
    <text x="12" y="16" textAnchor="middle" fontSize="12" fill="#84CC16" fontWeight="bold">E£</text>
  </svg>
);

export const ArrowRightIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

export const ArrowDownIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 13l-5 5m0 0l-5-5m5 5V6" />
    </svg>
);