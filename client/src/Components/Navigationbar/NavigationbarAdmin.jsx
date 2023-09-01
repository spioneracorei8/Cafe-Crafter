import React, { useState } from 'react'
import "./NavigationbarAdmin.css"
import Cafe_Crafter_Logo from "../../assets/Logo/Cafe_Crafter_Logo.png"
import { useAuth } from '../../Context/Authentication'
import { Link } from 'react-router-dom'


const NavigationbarAdmin = () => {
    const { logout } = useAuth()

    const handleNavigate = (event, id) => {
        event.preventDefault()
        const element = document.getElementById(id)

        if (element?.id === "cafe-crafter-logo") {
            window.location.replace("/")
        }
    }

    return (

        <>

            <header className='header-navbar-admin'>
                <nav>
                    <Link to={"/"} onClick={(event) => handleNavigate(event, "cafe-crafter-logo")}>
                        <img src={Cafe_Crafter_Logo} alt="Cafe crafter logo" className='cc-logo'
                            id='cafe-crafter-logo' />
                    </Link>

                    <button
                        onClick={() => logout()}
                    >
                        Logout
                    </button>
                </nav>
            </header>



        </>
    )
}

export default NavigationbarAdmin