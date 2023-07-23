import React, { useState } from 'react'
import './Register.css'
import NavigationbarRegisLogin from '../Components/NavigationbarRegisLogin'
import Footer from "../Components/Footer"
import Coffee_Beans from "../assets/Background/Coffee_Beans.jpg"
import Cafe_Crafter_Logo from '../assets/Logo/Cafe_Crafter_Logo.png'
import { useAuth } from '../Context/Authentication'


const Register = () => {
    let [registerPage, setRegisterPage] = useState(1)
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [gender, setGender] = useState("male")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [phone_number, setPhone_number] = useState("")
    const { register } = useAuth()

    const handleNextRegisterPage = (event) => {
        event.preventDefault()
        setRegisterPage(registerPage = 2)
    }

    const handlePreviousRegisterPage = (event) => {
        event.preventDefault();
        setRegisterPage(registerPage = 1)

    }
    const handleRegisterNow = (event) => {
        event.preventDefault()
        const data = {
            name,
            username,
            password,
            gender,
            email,
            address,
            phone_number,
        }

        register(data)

    }

    return (
        <>
            <NavigationbarRegisLogin />
            <img src={Coffee_Beans} alt="coffee beans" className='register-background' />
            <div className='register-container'>

                <form className='register-form' onSubmit={(event) => handleRegisterNow(event)}>
                    <div className='register-form-page'>
                        <button onClick={(event) => handlePreviousRegisterPage(event)}>1</button>
                        <button onClick={(event) => handleNextRegisterPage(event)}>2</button>
                    </div>
                    <div className='register-form-top'>
                        <img src={Cafe_Crafter_Logo} alt="Cafe crafter logo" />
                        <h2>Create An Account</h2>
                    </div>
                    {
                        registerPage === 1
                            ? <div className='register-whole-form-1'>
                                <div className="register-form-input-container">
                                    <div className='register-form-input'>
                                        <label htmlFor="name">Name</label>
                                        <input
                                            type="text"
                                            placeholder='Name...'
                                            onChange={(event) => setName(event.target.value)}
                                            value={name}
                                        />

                                    </div>
                                    <div className='register-form-input'>
                                        <label htmlFor="password">Password</label>
                                        <input
                                            type="password"
                                            placeholder='************'
                                            onChange={(event) => setPassword(event.target.value)}
                                            value={password}
                                        />
                                    </div>
                                </div>
                                <div className="register-form-input-container">
                                    <div className='register-form-input'>
                                        <label htmlFor="username">Username</label>
                                        <input
                                            type="text"
                                            placeholder='Username...'
                                            onChange={(event) => setUsername(event.target.value)}
                                            value={username}
                                        />
                                    </div>

                                    <div className='register-form-input'>
                                        <label htmlFor="confirm password">Confirm Password</label>
                                        <input
                                            type="password"
                                            placeholder='************'
                                            onChange={(event) => setConfirmPassword(event.target.value)}
                                            value={confirmPassword}
                                        />
                                    </div>
                                </div>

                            </div>
                            : registerPage == 2
                                ? <div className='register-whole-form-2'>
                                    <div className="register-form-input-container">
                                        <div className='register-form-input'>
                                            <label htmlFor="email">Email</label>
                                            <input
                                                type="email"
                                                placeholder='Email...'
                                                onChange={(event) => setEmail(event.target.value)}
                                                value={email}
                                            />
                                        </div>
                                        <div className='register-form-input'>
                                            <label htmlFor="gender">Gender</label>
                                            <select className='form-select' onChange={(event) => setGender(event.target.value)} value={gender}>
                                                <option value="male">male</option>
                                                <option value="female">female</option>
                                            </select>
                                        </div>

                                    </div>
                                    <div className="register-form-input-container">
                                        <div className='register-form-input'>
                                            <label htmlFor="phone number">Phone Number</label>
                                            <input
                                                type="tel"
                                                placeholder='Phone Number...'
                                                onChange={(event) => setPhone_number(event.target.value)}
                                                value={phone_number}
                                            />
                                        </div>

                                        <div className='register-form-input-textarea'>
                                            <label htmlFor="address">Address</label>
                                            <textarea
                                                cols="25"
                                                rows="8"
                                                className='form-textarea'
                                                style={{
                                                    marginBottom: "1.5rem"
                                                }}
                                                onChange={(event) => setAddress(event.target.value)}
                                                value={address}
                                            >

                                            </textarea>
                                        </div>
                                        <div className='register-form-checkbox'>
                                            <p>I agree to the <span>Terms of service</span></p>
                                            <input type="checkbox" />
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
                                        <button type='submit'>Register Now!</button>
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