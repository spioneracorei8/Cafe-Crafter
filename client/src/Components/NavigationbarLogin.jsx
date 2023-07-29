import React, { useEffect, useState } from 'react'
import './NavigationbarLogin.css'
import { useNavigate, Link } from 'react-router-dom'
import Cafe_Crafter_Logo from "../assets/Logo/Cafe_Crafter_Logo.png"
import { useAuth } from '../Context/Authentication'
import HomePageLogin from '../Pages/HomePageLogin'
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: 10,
        top: 10,
        border: `2px solid ${theme.palette.background.paper}`,
        position: 'absolute',
    }
}));

const NavigationbarLogin = () => {
    const navigate = useNavigate()
    const { logout } = useAuth()

    const [category, setCategory] = useState("Coffee")

    const handleNavigate = (event, id) => {
        event.preventDefault()
        const element = document.getElementById(id)
        if (element.id === "cafe-crafter-logo") {
            window.location.replace("/")
        } else if (element) {
            element.scrollIntoView({ behavior: "smooth" })
        }
    }

    const handleCategory = (event, categry) => {
        event.preventDefault()
        setCategory(categry)
    }

    HomePageLogin({ category })

    return (
        <header className='login-header'>
            <nav className="header-container">
                <div>
                    <Link to={"/"} onClick={(event) => handleNavigate(event, "cafe-crafter-logo")}>
                        <img src={Cafe_Crafter_Logo} alt="Cafe_Crafter_Logo" className="cc-logo" id="cafe-crafter-logo" />
                    </Link>
                </div>
                <div className='nav-middle-crafter'>
                    <ul>
                        <li className={category === "Coffee" ? 'load-coffee-category' : 'unload-coffee-category'}>
                            <button
                                onClick={(event) => handleCategory(event, "Coffee")}
                            >
                                Coffee
                            </button>
                        </li>
                        <li className={category === "Tea" ? 'load-tea-category' : 'unload-tea-category'}>
                            <button
                                onClick={(event) => handleCategory(event, "Tea")}
                            >
                                Tea
                            </button>
                        </li>
                        <li className={category === "Cake" ? 'load-cake-category' : 'unload-cake-category'}>
                            <button
                                onClick={(event) => handleCategory(event, "Cake")}
                            >
                                Cake
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="nav-right-crafter-login">
                    <IconButton aria-label="cart">

                        <StyledBadge badgeContent={5} color="warning">
                            <ShoppingCartIcon />

                        </StyledBadge>
                    </IconButton>
                    <button>
                        Profile
                    </button>
                    <button
                        onClick={() => logout()}
                    >
                        Logout
                    </button>
                </div>
            </nav>
        </header>
    )
}

export default NavigationbarLogin