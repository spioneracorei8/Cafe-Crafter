import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePageLogin from './HomePageLogin'
const AuthenticatedApp = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePageLogin />} />
            </Routes>
        </>
    )
}

export default AuthenticatedApp