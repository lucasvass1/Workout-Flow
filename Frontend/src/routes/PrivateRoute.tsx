import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';
import type { JSX } from 'react/jsx-runtime';

export function PrivateRoute({ children }: { children: JSX.Element }) {
    if (!isAuthenticated()) {
        return <Navigate to="/login" />;
    }
    return children;
}