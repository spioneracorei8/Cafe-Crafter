import React from 'react'
import './Login.css'
import NavigationbarRegisLogin from '../Components/NavigationbarRegisLogin'
import Coffee_Cup from "../assets/Background/Coffee_Cup.jpeg"
import Cafe_Crafter_Logo from '../assets/Logo/Cafe_Crafter_Logo.png'
import Footer from '../Components/Footer' 

const Login = () => {
    return (
        <>
            < NavigationbarRegisLogin />
            <img src={Coffee_Cup} alt="coffee cup" className='coffee-cup-bg' />
            <div className='login-container'>
                <form className='login-form'>
                    <div className='login-form-top'>
                        <img src={Cafe_Crafter_Logo} alt="Cafe crafter logo" />
                        <h2>Login</h2>
                    </div>
                    <div className='login-whole-form'>
                        <div className="login-form-input-container">
                            <div className='login-form-input'>
                                <label htmlFor="username">Username</label>
                                <input type="text" placeholder='Username...' />
                            </div>
                            <div className='login-form-input'>
                                <label htmlFor="password">Password</label>
                                <input type="password" placeholder='************' />
                            </div>
                            
                        </div>
                    </div>
                    <div className='logging-in-button'>
                        <button onClick={(event) => console.log("Loginnfgnn")}>Login</button>
                    </div>
                </form >
            </div >
            < Footer />
        </>
    )
}

export default Login