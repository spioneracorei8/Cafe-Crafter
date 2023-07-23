import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './HomePage'
import Register from './Register'
import Login from './Login'
import PageNotFound from './PageNotFound'

const UnauthenticatedApp = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/pageNotFound" element={<PageNotFound />} />
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