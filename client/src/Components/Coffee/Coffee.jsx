import "./Coffee.css"
import React, { useEffect, useState } from 'react'
import useCoffee from '../../Hook/useCoffee'
import axios from 'axios'
import CoffeePopup from '../PopUp/CoffeePopup'
import { useNavigate } from "react-router-dom"
import useCart from '../../Hook/useCart'
import NagigationbarLoggedIn from "../Navigationbar/NavigationbarLoggedIn"

const Coffee = () => {

    const navigate = useNavigate()
    const { getAllCoffee, allCoffee, setIsError, setIsLoading, isLoading } = useCoffee()
    const { getCartQuantity, cartQuantity } = useCart()
    const [coffeeData, setCoffeeData] = useState({})
    const [coffeePopUp, setCoffeePopUp] = useState(false)

    useEffect(() => {
        getAllCoffee()
    }, [])

    useEffect(() => {
        getCartQuantity()
    }, [isLoading])

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

    const handleAddtoCart = async (event, coffeeId) => {
        event.preventDefault()
        const data = {
            coffee_id: coffeeId,
            quantity: 1
        }
        try {
            setIsError(false)
            setIsLoading(true)
            await axios.post(`http://localhost:4000/cart/${localStorage.getItem("id")}`, data)
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

    const handleBuyNow = (event, coffeeName, coffeeId) => {
        event.preventDefault()
        window.scrollTo(0, 0)
        navigate(`/Buy/${coffeeId}/${coffeeName}`)
    }


    return (
        <>
            
            {coffeePopUp &&
                <CoffeePopup
                    handleCoffeePopUp={handleCoffeePopUp}
                    coffeeData={coffeeData}
                />

            }

            <NagigationbarLoggedIn
                cartQuantity={cartQuantity}
            />

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
                                <button
                                    className='buy-now'
                                    onClick={(event) => handleBuyNow(event, item.Name, item.Id)}
                                >
                                    Buy Now
                                </button>
                                <button
                                    className='learn-more'
                                    onClick={(() => {
                                        getCoffeeName(item.Id)
                                        handleCoffeePopUp()
                                    })}
                                >
                                    Details
                                </button>
                                <button
                                    className='add-to-cart'
                                    onClick={(event) => handleAddtoCart(event, item.Id)}
                                >
                                    Add To Cart
                                </button>
                            </div>
                        </div>
                    )
                })}
            </section>


        </>

    )
}

export default Coffee