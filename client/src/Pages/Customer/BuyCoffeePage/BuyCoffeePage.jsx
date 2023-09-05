import React, { useState, useEffect } from 'react'
import './BuyCoffeePage.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import NavigationbarProfile from '../../../Components/Navigationbar/NavigationbarProfile'
import Footer from '../../../Components/Footer/Footer'

const BuyCoffeePage = () => {
    const { coffeeId } = useParams();
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [coffeeData, setCoffeeData] = useState({})
    const getCoffeeId = async () => {
        try {
            setIsError(false)
            setIsLoading(true)
            const result = await axios.get(`http://localhost:4000/menus/coffee/${coffeeId}`)
            setCoffeeData(result.data.data)
            setIsLoading(false)
        } catch (error) {
            setIsError(true)
            setIsLoading(false)
            console.log(error);
        }
    }

    useEffect(() => {
        getCoffeeId()
    }, [])
    

    return (
        <>

            <NavigationbarProfile />

            <section className='buy-coffee-container'>
                <div className='buy-coffee-data-container'>
                    <div className='buy-coffee-data'>
                        <div className='buy-coffee-name-heading'>
                            <h1>
                                {coffeeData.Name}
                            </h1>
                        </div>
                        <img src={coffeeData.Image_url} alt={`${coffeeData.Name} image`} className='buy-coffee-img' />

                        <div className='buy-coffee-price'>
                            <h2>
                                {coffeeData.Price}฿
                            </h2>
                        </div>

                        <div className='buy-coffee-description'>
                            <p>
                                {coffeeData.Description}
                            </p>
                        </div>

                        <div className='buy-coffee-buy'>
                            <button>
                                <h1>
                                    Buy Now!
                                </h1>
                            </button>
                        </div>

                    </div>

                </div>
            </section>

            <Footer />
        </>

    )
}

export default BuyCoffeePage