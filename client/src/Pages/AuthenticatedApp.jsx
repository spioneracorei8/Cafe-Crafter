import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePageLogin from './HomePageLogin'
import PageNotFound from './PageNotFound'
import ProfilePage from "./ProfilePage"
const AuthenticatedApp = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePageLogin />} />
                <Route path="/Cafe-Crafter-Twitter" element={<PageNotFound />} />
                <Route path="/Cafe-Crafter-Instagram" element={<PageNotFound />} />
                <Route path="/Cafe-Crafter-Facebook" element={<PageNotFound />} />
                <Route path="/Cafe-Crafter-Twitch" element={<PageNotFound />} />
                <Route path="/Profile" element={<ProfilePage />} />

            </Routes>
        </>
    )
}

export default AuthenticatedApp