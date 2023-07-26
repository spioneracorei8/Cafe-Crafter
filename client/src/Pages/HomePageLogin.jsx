import React from 'react'
import { useAuth } from '../Context/Authentication'

const HomePageLogin = () => {
    const { logout } = useAuth()
    return (
        <div>
            HomePageLogin
            <button onClick={logout}>
                here
            </button>
        </div>
    )
}

export default HomePageLogin