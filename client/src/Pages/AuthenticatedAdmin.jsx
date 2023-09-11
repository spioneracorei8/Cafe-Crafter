import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminHomePage from './Admin/AdminHomePage'

const AuthenticatedAdmin = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<AdminHomePage />} />
            </Routes>
        </>
    )
}

export default AuthenticatedAdmin