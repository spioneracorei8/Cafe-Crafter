import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminPage from './Admin/AdminPage'

const AuthenticatedAdmin = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<AdminPage />} />
            </Routes>
        </>
    )
}

export default AuthenticatedAdmin