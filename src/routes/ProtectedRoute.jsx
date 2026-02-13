import { useAppSelector } from '@/app/hooks'
import React from 'react'
import { Navigate } from 'react-router-dom';

function ProtectedRoute({children}) {
    const isAuthtenicated = useAppSelector(
        (state) => state.auth.isAuthtenicated
    );

    if(!isAuthtenicated){
        return <Navigate to="/login" replace/>
    }

    return children;
}

export default ProtectedRoute