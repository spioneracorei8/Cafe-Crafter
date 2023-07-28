import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePageLogin from './HomePageLogin'
import PageNotFound from './PageNotFound'
const AuthenticatedApp = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePageLogin />} />
                <Route path="/Cafe-Crafter-Twitter" element={<PageNotFound />} />
                <Route path="/Cafe-Crafter-Instagram" element={<PageNotFound />} />
                <Route path="/Cafe-Crafter-Facebook" element={<PageNotFound />} />
                <Route path="/Cafe-Crafter-Twitch" element={<PageNotFound />} />

            </Routes>
        </>
    )
}

export default AuthenticatedApp