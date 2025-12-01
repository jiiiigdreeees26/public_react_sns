import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
};

export const Button = ({
  children,
  onClick,
  variant = 'primary',
}: ButtonProps) => {
  const baseStyle = 'px-4 py-2 rounded-lg text-white font-bold transition';
  const styles = {
    primary: 'bg-blue-500 hover:bg-blue-600',
    secondary: 'bg-gray-500 hover:bg-gray-600',
  };

  return (
    <button className={`${baseStyle} ${styles[variant]}`} onClick={onClick}>
      {children}
    </button>
  );
};
