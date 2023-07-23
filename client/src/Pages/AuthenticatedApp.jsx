import React from 'react'
import { Routes, Route } from 'react-router-dom'
const AuthenticatedApp = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />

            </Routes>
        </>
    )
}

export default AuthenticatedApp