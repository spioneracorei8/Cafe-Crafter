import React, { useEffect, useState } from 'react'
import './HomePageLogin.css'
import { useNavigate, Link } from 'react-router-dom'
import useCoffee from '../Hook/useCoffee'
import { useAuth } from '../Context/Authentication'
import axios from 'axios'
import Footer from "../Components/Footer"
import CoffeePopup from '../Components/CoffeePopup'
import Loading from '../Components/Loading'
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Cafe_Crafter_Logo from "../assets/Logo/Cafe_Crafter_Logo.png"

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: 10,
        top: 10,
        border: `2px solid ${theme.palette.background.paper}`,
        position: 'absolute',
    }
}));

const HomePageLogin = () => {

    const navigate = useNavigate()
    const { getAllCoffee, allCoffee, isLoading, setIsLoading, isError, setIsError } = useCoffee()
    const { logout } = useAuth()
    const [coffeeData, setCoffeeData] = useState({})
    const [coffeePopUp, setCoffeePopUp] = useState(false)
    const [category, setCategory] = useState("Coffee")

    useEffect(() => {
        getAllCoffee()
    }, [])

    const getCoffeeName = async (coffeeById) => {
        try {
            setIsError(false)
            setIsLoading(true)
            const result = await axios.get(`http://localhost:4000/coffee/${coffeeById}`)
            setCoffeeData(result.data.data)
            setIsLoading(false)
        } catch (error) {
            setIsError(true)
            setIsLoading(false)
            console.log(error);
        }
    }

    const handleCoffeePopUp = () => {
        setCoffeePopUp(!coffeePopUp)
    }

    const handleNavigate = (event, id) => {
        event.preventDefault()

        const element = document.getElementById(id)

        if (element?.id === "cafe-crafter-logo") {
            window.location.replace("/")
        } else if (element?.id === "/Cart") {
            navigate("/Cart")
            // window.location.replace("/Cart")
        } else if (element?.id === "/Profile") {
            navigate("/Profile")
            // window.location.replace("/Profile")
        }
    }

    const handleCategory = (event, categry) => {
        event.preventDefault()
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

            {coffeePopUp &&
                <CoffeePopup
                    handleCoffeePopUp={handleCoffeePopUp}
                    coffeeData={coffeeData}
                />

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

                            <StyledBadge badgeContent={5} color="warning">
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
                <section className='menu-background'>
                    {allCoffee.map((item, index) => {
                        return (
                            <div
                                className='menu'
                                key={index}
                            >
                                <h3>{item.Name}</h3>

                                <h4>{item.Price}฿</h4>
                                <img src={item.Image_url} alt="img" />

                                <div className='three-button-container'>
                                    <button className='buy-now'>Buy Now</button>
                                    <button
                                        className='learn-more'
                                        onClick={(() => {
                                            getCoffeeName(item.Id)
                                            handleCoffeePopUp()
                                        })}
                                    >
                                        Learn More
                                    </button>
                                    <button
                                        className='add-to-cart'
                                    >
                                        Add To Cart
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </section>
                <div className='see-more'>
                    <button>
                        <h1>See more</h1>
                    </button>
                </div>
            </main>

            <Footer />
        </>
    )
}

export default HomePageLogin