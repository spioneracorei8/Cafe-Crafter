import React, { useEffect, useState } from 'react'
import './LoggedInHomePage.css'

import { useAuth } from '../../../Context/Authentication'
import useMenus from '../../../Hook/useMenus'
import useCart from '../../../Hook/useCart'

import Footer from "../../../Components/Footer/Footer"
import Loading from '../../../Components/Loading/Loading'

import Coffee from '../../../Components/Coffee/Coffee'
import Tea from '../../../Components/Tea/Tea'
import Cake from '../../../Components/Cake/Cake'

import { useNavigate, Link } from 'react-router-dom'

import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Cafe_Crafter_Logo from "../../../assets/Logo/Cafe_Crafter_Logo.png"

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: 10,
        top: 10,
        border: `2px solid ${theme.palette.background.paper}`,
        position: 'absolute',
    }
}));


const LoggedInHomePage = () => {

    const navigate = useNavigate()

    const { logout } = useAuth()

    const { getAllCoffee } = useMenus()

    const { getCartQuantity, cartQuantity, isLoading, isError } = useCart()

    const [category, setCategory] = useState("Coffee")


    useEffect(() => {
        getAllCoffee()
    }, [])
    useEffect(() => {
        getCartQuantity()
    }, [])

    const handleNavigate = (event, id) => {
        event.preventDefault()

        const element = document.getElementById(id)

        if (element?.id === "cafe-crafter-logo") {
            window.location.replace("/")
        } else if (element?.id === "/Cart") {
            navigate("/Cart")
        } else if (element?.id === "/Profile") {
            navigate("/Profile")
        }
    }

    const handleCategory = (event, categry) => {
        setCategory(categry)
    }

    return (
        <>
            {isLoading &&
                <Loading />
            }

            {isError &&
                <h1>Fetching Data Error...</h1>
            }

            <header className='login-header-container'>
                <nav className="nav-login-container">
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
                        <IconButton
                            aria-label="cart"
                            id='/Cart'
                            onClick={(event) => handleNavigate(event, "/Cart")}

                        >

                            <StyledBadge badgeContent={cartQuantity} color="warning">
                                <ShoppingCartIcon />

                            </StyledBadge>
                        </IconButton>
                        <button
                            id='/Profile'
                            onClick={(event) => handleNavigate(event, "/Profile")}
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

            <main className='menu-container'>

                {category === "Coffee" ?
                    <Coffee />
                    : category === "Tea" ?
                        <Tea />
                        : category === "Cake" ?
                            <Cake />
                            : ""
                }

            </main>

            <Footer />
        </>
    )
}

export default LoggedInHomePage