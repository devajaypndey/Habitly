import { useAppSelector } from '@/app/hooks'
import React from 'react'
import { Navigate } from 'react-router-dom';

export default function PublicRoute({children}) {
    const isAuthenticated = useAppSelector(
        (state) => state.auth.isAuthenticated
    );

    if(isAuthenticated){
        return <Navigate to="/dashboard" replace />
    }

    return children;
}
