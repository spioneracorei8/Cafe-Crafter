import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePageNonLogin from './HomePageNonLogin'
import RegisterPage from './RegisterPage'
import LoginPage from './LoginPage'
import PageNotFound from './PageNotFound'

const UnauthenticatedApp = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePageNonLogin />} />
                <Route path="/Register" element={<RegisterPage />} />
                <Route path="/Login" element={<LoginPage />} />
                <Route path="/pageNotFound" element={<PageNotFound />} />

                <Route path="/Cafe-Crafter-Twitter" element={<PageNotFound />} />
                <Route path="/Cafe-Crafter-Instagram" element={<PageNotFound />} />
                <Route path="/Cafe-Crafter-Facebook" element={<PageNotFound />} />
                <Route path="/Cafe-Crafter-Twitch" element={<PageNotFound />} />
                <Route path="/Coffee-Beans-Arabica" element={<PageNotFound />} />
                <Route path="/Coffee-Beans-Robusta" element={<PageNotFound />} />
                <Route path="/Coffee-Beans-Liberica" element={<PageNotFound />} />
                <Route path="/Coffee-Roasts-Light" element={<PageNotFound />} />
                <Route path="/Coffee-Roasts-Medium" element={<PageNotFound />} />
                <Route path="/Coffee-Roasts-Dark" element={<PageNotFound />} />
                <Route path="/Coffee-Explore-About" element={<PageNotFound />} />
                <Route path="/Coffee-Explore-Events" element={<PageNotFound />} />
                <Route path="/Coffee-Explore-Community" element={<PageNotFound />} />
            </Routes>
        </>
    )
}

export default UnauthenticatedApp