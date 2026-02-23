import { useAppSelector } from '@/app/hooks'
import React from 'react'
import { Navigate } from 'react-router-dom';

function ProtectedRoute({children}) {
    const isAuthenticated = useAppSelector(
        (state) => state.auth.isAuthenticated
    );

    if(!isAuthenticated){
        return <Navigate to="/login" replace/>
    }

    return children;
}

export default ProtectedRoute