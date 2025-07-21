import { Navigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { authAtom } from '../../context/auth';
import type { JSX } from 'react';

interface ProtectedRouteProps {
  element: JSX.Element;
  role?: 'user' | 'admin';
}

export function ProtectedRoute({ element, role }: ProtectedRouteProps) {
  const [auth] = useAtom(authAtom);

  if (!auth.token) {
    return <Navigate to="/login" replace />;
  }

  if (role && auth.user?.role !== role) {
    return <Navigate to="/" replace />;
  }

  return element;
}