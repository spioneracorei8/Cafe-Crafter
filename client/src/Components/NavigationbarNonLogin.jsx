import React from "react";
import "./NavigationbarNonLogin.css"
import Cafe_Crafter_Logo from "../assets/Logo/Cafe_Crafter_Logo.png"

const NavigationbarNonLogin = () => {

    return (
        <header>
            <nav className="header-container">
                <div>
                    <img src={Cafe_Crafter_Logo} alt="Cafe_Crafter_Logo" className="cc-logo" />
                </div>
                <div className="nav-middle-crafter">
                    <ul>
                        <li>
                            Suggestions Coffee
                        </li>
                        <li>
                            Cafe-Crafter?
                        </li>
                        <li>
                            Contact us
                        </li>
                    </ul>
                </div>
                <div className="nav-right-crafter">
                    <button>Register</button>
                    <button>Login</button>
                </div>
            </nav>
        </header>
    )
}

export default NavigationbarNonLogin