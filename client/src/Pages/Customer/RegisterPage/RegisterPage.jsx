import React, { useState, useEffect } from 'react'
import './RegisterPage.css'
import NavigationbarRegisLogin from '../../../Components/Navigationbar/NavigationbarRegisLogin'
import Footer from "../../../Components/Footer/Footer"
import Coffee_Beans from "../../../assets/Background/Coffee_Beans.jpg"
import Cafe_Crafter_Logo from "../../../assets/Logo/Cafe_Crafter_Logo.png"
import { useAuth } from '../../../Context/Authentication'
import CountryStateData from "../../../data/CountryStateData.json"
import AlertPopUp from '../../../Components/AlertPopUp/AlertPopUp'

const RegisterPage = () => {

    let [registerPage, setRegisterPage] = useState(1)

    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [gender, setGender] = useState("male")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [country, setCountry] = useState("")
    const [city, setCity] = useState("")
    const [phone_number, setPhone_number] = useState("")

    const { register } = useAuth()

    const phoneNumberRegex = /^[0-9]+$/

    const countries = CountryStateData
    const cities = CountryStateData.flatMap(country => country.states)

    const [alertPopUpOne, setAlertPopUpOne] = useState(false)
    const [alertPopUpTwo, setAlertPopUpTwo] = useState(false)

    const handleNextRegisterPage = (event) => {

        event.preventDefault()

        if (name === "") {
            setAlertPopUpOne(true)
        } else if (username === "") {
            setAlertPopUpOne(true)
        } else if (username.length < 8) {
            setAlertPopUpOne(true)
        } else if (password === "") {
            setAlertPopUpOne(true)
        } else if (password.length < 10) {
            setAlertPopUpOne(true)
        } else if (confirmPassword === "") {
            setAlertPopUpOne(true)
        } else if (password != confirmPassword) {
            setAlertPopUpOne(true)
        }
        else {
            setRegisterPage(registerPage = 2)
        }
    }

    const handlePreviousRegisterPage = (event) => {
        event.preventDefault();
        setRegisterPage(registerPage = 1)
    }

    const handleRegisterNow = (event) => {
        event.preventDefault()

        if (email === "") {
            setAlertPopUpTwo(true)
        } else if (phone_number === "") {
            setAlertPopUpTwo(true)
        } else if (phone_number.length < 10) {
            setAlertPopUpTwo(true)
        } else if (!phoneNumberRegex.test(phone_number)) {
            setAlertPopUpTwo(true)
        } else if (address === "") {
            setAlertPopUpTwo(true)
        } else if (address.length < 30) {
            setAlertPopUpTwo(true)
        } else if (country === "") {
            setAlertPopUpTwo(true)
        } else if (city === "") {
            setAlertPopUpTwo(true)
        }
        else {
            const data = {
                name,
                username,
                password,
                gender,
                email,
                address,
                country,
                city,
                phone_number,
            }
            register(data)

        }
    }

    if (alertPopUpOne) {
        setTimeout(() => {
            setAlertPopUpOne(false)
        }, 3500);
    }
    if (alertPopUpTwo) {
        setTimeout(() => {
            setAlertPopUpTwo(false)
        }, 3500);
    }


    return (
        <>
            {alertPopUpOne && (
                <>
                    {confirmPassword != password && (
                        <AlertPopUp
                            headingAlert="Wrong Password"
                            detailsAlert="The Password not match."
                        />
                    )}
                    {confirmPassword === "" && (
                        <AlertPopUp
                            headingAlert="Wrong Confirm Password"
                            detailsAlert="The Confirm Password input cannot be blank."
                        />
                    )}
                    {password.length < 10 && (
                        <AlertPopUp
                            headingAlert="Wrong Password"
                            detailsAlert="The Password input should enter at least 10 characters."
                        />
                    )}
                    {password === "" && (
                        <AlertPopUp
                            headingAlert="Wrong Password"
                            detailsAlert="The Password input cannot be blank."
                        />
                    )}
                    {username.length < 8 && (
                        <AlertPopUp
                            headingAlert="Wrong Username"
                            detailsAlert="The Username input should enter at least 8 characters."
                        />
                    )
                    }
                    {username === "" && (
                        <AlertPopUp
                            headingAlert="Wrong Username"
                            detailsAlert="The Username input cannot be blank."
                        />
                    )}
                    {name === "" && (
                        <AlertPopUp
                            headingAlert="Wrong Name"
                            detailsAlert="The Name input cannot be blank."
                        />
                    )}
                </>
            )}

            {alertPopUpTwo && (
                <>
                    {city === "" && (
                        <AlertPopUp
                            headingAlert="Wrong City"
                            detailsAlert="The City input cannot be blank."
                        />
                    )}
                    {country === "" && (
                        <AlertPopUp
                            headingAlert="Wrong Country"
                            detailsAlert="The Country input cannot be blank."
                        />
                    )}
                    {address.length < 30 && (
                        <AlertPopUp
                            headingAlert="Wrong Address"
                            detailsAlert="The Address input should have at least 30 characters."
                        />
                    )}
                    {address === "" && (
                        <AlertPopUp
                            headingAlert="Wrong Address"
                            detailsAlert="The Address input cannot be blank."
                        />
                    )}
                    {!phoneNumberRegex.test(phone_number) && (
                        <AlertPopUp
                            headingAlert="Wrong Phone Number"
                            detailsAlert="The Phone Number input is malformed."
                        />
                    )
                    }
                    {phone_number.length < 10 && (
                        <AlertPopUp
                            headingAlert="Wrong Phone Number"
                            detailsAlert="The Phone Number input should have at least 10 digits."
                        />
                    )}
                    {phone_number === "" && (
                        <AlertPopUp
                            headingAlert="Wrong Phone Number"
                            detailsAlert="The Phone Number input cannot be blank."
                        />
                    )}
                    {email === "" && (
                        <AlertPopUp
                            headingAlert="Wrong Email"
                            detailsAlert="The Email input cannot be blank."
                        />
                    )}
                </>
            )}
            <NavigationbarRegisLogin />
            <img src={Coffee_Beans} alt="coffee beans" className='register-background' />
            <div className='register-container'>

                <form className='register-form' onSubmit={(event) => handleRegisterNow(event)}>
                    <div className='register-form-page'>
                        <button
                            className={registerPage === 1 ? "load-page-one" : "unload-page-one"}
                            onClick={(event) => handlePreviousRegisterPage(event)}

                        >
                            1
                        </button>
                        <button
                            className={registerPage === 2 ? "load-page-two" : "unload-page-two"}
                            onClick={(event) => handleNextRegisterPage(event)}

                        >
                            2
                        </button>
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
                                            <select
                                                className='form-select'
                                                value={gender}>
                                                onChange={(event) => setGender(event.target.value)}
                                                <option value="male">male</option>
                                                <option value="female">female</option>
                                            </select>
                                        </div>

                                        <div className='register-form-input'>
                                            <label htmlFor="city">city</label>
                                            <select className='form-select'
                                                value={city}
                                                onChange={(event) => setCity(event.target.value)}
                                            >

                                                <option value="">Select your city</option>
                                                {cities
                                                    .filter((city) => {
                                                        const filterCountries = CountryStateData.filter((country) => {
                                                            return country.country_id === city.country_id;
                                                        });
                                                        return filterCountries.some(
                                                            (filterCountry) => filterCountry.country_name === country
                                                        );
                                                    })
                                                    .sort((a, b) => {
                                                        return a > b ? -1 : 1;
                                                    })
                                                    .map((city, index) => {
                                                        return (
                                                            <option value={city.state_name} key={index}>
                                                                {city.state_name}
                                                            </option>
                                                        );
                                                    })}
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

                                        <div className='register-form-input'>
                                            <label htmlFor="country">country</label>
                                            <select className='form-select'
                                                value={country}
                                                onChange={(event) => setCountry(event.target.value)}
                                            >
                                                <option value="">Select your country</option>
                                                {countries
                                                    .sort((a, b) => {
                                                        return a > b ? 1 : -1;
                                                    })
                                                    .map((country, index) => (
                                                        <option value={country.country_name} key={index}>
                                                            {country.country_name}
                                                        </option>
                                                    ))}
                                            </select>

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

export default RegisterPage