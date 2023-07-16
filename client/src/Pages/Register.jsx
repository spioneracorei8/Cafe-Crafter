import React, { useState } from 'react'
import './Register.css'
import NavigationbarNonLogin from '../Components/NavigationbarNonLogin'
import Footer from "../Components/Footer"
import Coffee_Beans from "../assets/Background/Coffee_Beans.jpg"
import Cafe_Crafter_Logo from '../assets/Logo/Cafe_Crafter_Logo.png'

const Register = () => {
    let [registerPage, setRegisterPage] = useState(1)

    const handleNextRegisterPage = (event) => {
        event.preventDefault()
        setRegisterPage(registerPage = 2)
    }

    const handlePreviousRegisterPage = (event) => {
        event.preventDefault()
        setRegisterPage(registerPage = 1)

    }
    console.log(registerPage);
    return (
        <>
            <NavigationbarNonLogin />
            <img src={Coffee_Beans} alt="coffee beans" className='register-background' />
            <div className='register-container'>

                <form className='register-form'>
                    <div className='register-form-page'>
                        <button onClick={(event) => handlePreviousRegisterPage(event)}>1</button>
                        <button onClick={(event) => handleNextRegisterPage(event)}>2</button>
                    </div>
                    <div className='register-form-header'>
                        <img src={Cafe_Crafter_Logo} alt="Cafe crafter logo" />
                        <h2>Create An Account</h2>
                    </div>
                    {
                        registerPage === 1
                            ? <div className='register-whole-form-1'>
                                <div className="register-form-input-container">
                                    <div className='register-form-input'>
                                        <label htmlFor="name">Name</label>
                                        <input type="text" placeholder='Name...' />

                                    </div>
                                    <div className='register-form-input'>
                                        <label htmlFor="password">Password</label>
                                        <input type="password" placeholder='************' />
                                    </div>
                                </div>
                                <div className="register-form-input-container">
                                    <div className='register-form-input'>
                                        <label htmlFor="username">Username</label>
                                        <input type="text" placeholder='Username...' />
                                    </div>

                                    <div className='register-form-input'>
                                        <label htmlFor="confirm password">Confirm Password</label>
                                        <input type="password" placeholder='************' />
                                    </div>
                                </div>

                            </div>
                            : registerPage == 2
                                ? <div className='register-whole-form-2'>
                                    <div className="register-form-input-container">
                                        <div className='register-form-input'>
                                            <label htmlFor="email">Email</label>
                                            <input type="email" placeholder='Email...' />
                                        </div>
                                        <div className='register-form-input'>
                                            <label htmlFor="gender">Gender</label>
                                            <select className='form-select'>
                                                <option value="male">male</option>
                                                <option value="female">female</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="register-form-input-container">
                                        <div className='register-form-input'>
                                            <label htmlFor="phone number">Phone Number</label>
                                            <input type="tel" placeholder='Phone Number...' />
                                        </div>

                                        <div className='register-form-input'>
                                            <label htmlFor="address">Address</label>
                                            <textarea
                                                cols="25"
                                                rows="8"
                                                className='form-textarea'
                                                style={{
                                                    marginBottom: "1.5rem"
                                                }}
                                            ></textarea>
                                        </div>
                                    </div>

                                </div>
                                : ""
                    }

                    {
                        registerPage === 1
                            ? <div className='register-next-button'>
                                <button className='next-button' onClick={(event) => handleNextRegisterPage(event)}>Next</button>
                            </div>
                            : registerPage === 2
                                ? <>
                                    <div className='register-previous-button'>
                                        <button className='previous-button' onClick={(event) => handlePreviousRegisterPage(event)}>Previous</button>
                                    </div>
                                    <div className='registering-button'>
                                        <button onClick={(event) => console.log("Registerrrr")}>Register Now!</button>
                                    </div>
                                </>
                                : ""
                    }

                </form>
            </div >
            <Footer />
        </>
    )
}

export default Register