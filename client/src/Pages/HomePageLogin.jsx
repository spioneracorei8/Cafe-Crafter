import React from 'react'
import { useAuth } from '../Context/Authentication'
import NavigationbarLogin from '../Components/NavigationbarLogin'
import './HomePageLogin.css'
const HomePageLogin = () => {
    const { logout } = useAuth()
    return (
        <>
            <NavigationbarLogin />
            <nav className='category-menu'>
                <ul>
                    <li>Coffee</li>
                    <li>Tea</li>
                    <li>Cake</li>
                </ul>
            </nav>
        </>
    )
}

export default HomePageLogin