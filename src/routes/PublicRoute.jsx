import { useAppSelector } from '@/app/hooks'
import React from 'react'
import { Navigate } from 'react-router-dom';

export default function PublicRoute({children}) {
    const isAuthtenicated = useAppSelector(
        (state) => state.auth.isAuthtenicated
    );

    if(isAuthtenicated){
        return <Navigate to="/dashboard" replace />
    }

    return children;
}
