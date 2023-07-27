import React from "react";
import { Link, useNavigate } from "react-router-dom"
import "./NavigationbarNonLogin.css"
import Cafe_Crafter_Logo from "../assets/Logo/Cafe_Crafter_Logo.png"

const NavigationbarNonLogin = () => {
    const navigate = useNavigate()

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
        <header className="non-login-header">
            <nav className="header-container">
                <div>
                    <Link to={"/"} onClick={(event) => handleNavigate(event, "cafe-crafter-logo")}>
                        <img src={Cafe_Crafter_Logo} alt="Cafe_Crafter_Logo" className="cc-logo" id="cafe-crafter-logo" />
                    </Link>
                </div>
                <div className="nav-middle-crafter">
                    <ul>
                        <li>
                            <Link to={"/"} onClick={(event) => handleNavigate(event, "suggestions-coffee")}>
                                Suggestions Coffee
                            </Link>
                        </li>
                        <li>
                            <Link to={"/"} onClick={(event) => handleNavigate(event, "cafe-crafter?")}>
                                Cafe-Crafter?
                            </Link>
                        </li>
                        <li>
                            <Link to={"/"} onClick={(event) => handleNavigate(event, "contact-us")}>
                                Contact us
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="nav-right-crafter">
                    <button onClick={() => navigate("/Register")}>Register</button>
                    <button onClick={() => navigate("/Login")}>Login</button>
                </div>
            </nav>
        </header>
    )
}

export default NavigationbarNonLogin