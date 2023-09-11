import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LoggedInHomePage from './Customer/HomePage/LoggedInHomePage'
import PageNotFound from './PageNotFound'
import ProfilePage from "./Customer/ProfilePage/ProfilePage"
import CartPage from './Customer/CartPage/CartPage'
import BuyMenuPage from './Customer/BuyMenuPage/BuyMenuPage'

const AuthenticatedApp = () => {

    return (
        <>
            <Routes>
                <Route path="/" element={<LoggedInHomePage />} />
                <Route path="/Cafe-Crafter-Twitter" element={<PageNotFound />} />
                <Route path="/Cafe-Crafter-Instagram" element={<PageNotFound />} />
                <Route path="/Cafe-Crafter-Facebook" element={<PageNotFound />} />
                <Route path="/Cafe-Crafter-Twitch" element={<PageNotFound />} />
                <Route path="/Profile" element={<ProfilePage />} />
                <Route path="/Cart" element={<CartPage />} />
                <Route path={`/Buy/:menuId/:menuName/:category`} element={<BuyMenuPage />} />
            </Routes>
        </>
    )
}

export default AuthenticatedApp