import React, { useEffect, useState } from 'react'
import NavigationbarLogin from '../Components/NavigationbarLogin'
import './HomePageLogin.css'
import useCoffee from '../Hook/useCoffee'
import Footer from "../Components/Footer"
import axios from 'axios'
import CoffeePopup from '../Components/CoffeePopup'
import Loading from '../Components/Loading'
import { useNavigate } from 'react-router-dom'

const HomePageLogin = (props) => {

    const { getAllCoffee, allCoffee, isLoading, setIsLoading, isError, setIsError } = useCoffee()
    const [coffeeData, setCoffeeData] = useState({})
    const [coffeePopUp, setCoffeePopUp] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        getAllCoffee()
    }, [])

    const getCoffeeName = async (coffeeById) => {
        try {
            setIsError(false)
            setIsError(true)
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

    // console.log(props?.category);

    return (
        <>
            {isLoading &&
                <Loading />
            }

            {isError &&
                <h1>Fetching Data Error...</h1>
            }

            <NavigationbarLogin />

            {coffeePopUp &&
                <CoffeePopup
                    handleCoffeePopUp={handleCoffeePopUp}
                    coffeeData={coffeeData}
                />

            }

            <div className='menu-container'>
                <div className='menu-background'>
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
                </div>
                <div className='see-more'>
                    <button>
                        <h1>See more</h1>
                    </button>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default HomePageLogin