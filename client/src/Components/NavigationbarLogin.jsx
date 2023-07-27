import React from 'react'
import './NavigationbarLogin.css'
import { useNavigate, Link } from 'react-router-dom'
import Cafe_Crafter_Logo from "../assets/Logo/Cafe_Crafter_Logo.png"
import { useAuth } from '../Context/Authentication'
const NavigationbarLogin = () => {
    const navigate = useNavigate()
    const { logout } = useAuth()
    const handleNavigate = (event, id) => {
        event.preventDefault()
        const element = document.getElementById(id)
        if (element.id === "cafe-crafter-logo") {
            window.location.replace("/")
        } else if (element) {
            element.scrollIntoView({ behavior: "smooth" })
        }
    }

    return (
        <header className='login-header'>
            <nav className="header-container">
                <div>
                    <Link to={"/"} onClick={(event) => handleNavigate(event, "cafe-crafter-logo")}>
                        <img src={Cafe_Crafter_Logo} alt="Cafe_Crafter_Logo" className="cc-logo" id="cafe-crafter-logo" />
                    </Link>
                </div>

                <div className="nav-right-crafter">
                    <button onClick={() => logout()}>Logout</button>
                </div>
            </nav>
        </header>
    )
}

export default NavigationbarLogin