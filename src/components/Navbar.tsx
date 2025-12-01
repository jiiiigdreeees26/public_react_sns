import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthButton } from './AuthButton';

export const Navbar = () => {
  // const location = useLocation();

  // 現在のページと一致する場合に適用するスタイル
  const linkStyle = (path: string) =>
    path ? 'text-yellow-400 font-bold' : 'text-white hover:text-gray-300';

  return (
    <nav>
      <AuthButton />
    </nav>
  );
};
