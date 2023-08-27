import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Cafe_Crafter_Logo from "../../assets/Logo/Cafe_Crafter_Logo.png"
import { useAuth } from '../../Context/Authentication'
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

const NavigationbarProfile = () => {
    const navigate = useNavigate()
    const { logout } = useAuth()


    const handleNavigate = (event, id) => {
        event.preventDefault()

        const element = document.getElementById(id)

        if (element?.id === "cafe-crafter-logo") {
            window.location.replace("/")
        } else if (id === "/Cart") {
            navigate("/Cart")
        }
    }


    return (
        <header className='login-header-container'>
            <nav className="nav-login-container">
                <div>
                    <Link to={"/"} onClick={(event) => handleNavigate(event, "cafe-crafter-logo")}>
                        <img src={Cafe_Crafter_Logo} alt="Cafe_Crafter_Logo" className="cc-logo" id="cafe-crafter-logo" />
                    </Link>
                </div>

                <div className="nav-right-crafter-login">
                    <IconButton
                        aria-label="cart"
                        onClick={() => navigate("/Cart")}

                    >

                        <StyledBadge badgeContent={5} color="warning">
                            <ShoppingCartIcon />

                        </StyledBadge>
                    </IconButton>
                    <button
                        onClick={() => navigate("/Profile")}
                    >
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

export default NavigationbarProfile