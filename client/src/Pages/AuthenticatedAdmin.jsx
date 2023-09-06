import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminHomePage from './Admin/AdminHomePage'
import EditMenu from './Admin/EditMenu/EditMenu'

const AuthenticatedAdmin = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<AdminHomePage />} />
                <Route path='/edit-menu' element={<EditMenu />} />
            </Routes>
        </>
    )
}

export default AuthenticatedAdmin