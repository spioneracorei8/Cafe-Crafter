import React, { useState } from 'react'
import './LoginPage.css'
import NavigationbarRegisLogin from '../Components/NavigationbarRegisLogin'
import Coffee_Cup from "../assets/Background/Coffee_Cup.jpeg"
import Cafe_Crafter_Logo from '../assets/Logo/Cafe_Crafter_Logo.png'
import Footer from '../Components/Footer'
import { useAuth } from '../Context/Authentication'
const LoginPage = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const { login } = useAuth()

    const handleLogin = (event) => {
        event.preventDefault()
        const data = {
            username,
            password
        }
        login(data)

    }
    return (
        <>
            < NavigationbarRegisLogin />
            <img src={Coffee_Cup} alt="coffee cup" className='coffee-cup-bg' />
            <div className='login-container'>
                <form className='login-form' onSubmit={(event) => handleLogin(event)}>
                    <div className='login-form-top'>
                        <img src={Cafe_Crafter_Logo} alt="Cafe crafter logo" />
                        <h2>Login</h2>
                    </div>
                    <div className='login-whole-form'>
                        <div className="login-form-input-container">
                            <div className='login-form-input'>
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    placeholder='Username...'
                                    onChange={(event) => setUsername(event.target.value)}
                                    value={username}
                                />
                            </div>
                            <div className='login-form-input'>
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    placeholder='************'
                                    onChange={(event) => setPassword(event.target.value)}
                                    value={password}
                                />
                            </div>

                        </div>
                    </div>
                    <div className='logging-in-button'>
                        <button type='submit'>Login</button>
                    </div>
                </form >
            </div >
            < Footer />
        </>
    )
}

export default LoginPage