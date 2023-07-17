import React from 'react'
import './NavigationbarRegisLogin.css'
import { Link, useNavigate } from "react-router-dom"
import Cafe_Crafter_Logo from "../assets/Logo/Cafe_Crafter_Logo.png"

const NavigationbarRegisLogin = () => {
    const navigate = useNavigate()

    const handleNavigate = (event, id) => {
        event.preventDefault()
        const element = document.getElementById(id)
        if (element.id === "cafe-crafter-logo") {
            window.location.replace("/")
        }
    }

    return (
        <>
            <nav>
                <div className='nav-left-logo'>
                    <Link to={"/"} onClick={(event) => handleNavigate(event, "cafe-crafter-logo")}>
                        <img src={Cafe_Crafter_Logo} alt="Cafe_Crafter_Logo" className="cc-logo" id="cafe-crafter-logo" />
                    </Link>
                    <div className="nav-right-button">
                        <button onClick={() => navigate("/Register")}>Register</button>
                        <button onClick={() => navigate("/Login")}>Login</button>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavigationbarRegisLogin