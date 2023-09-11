import React, { useState, useEffect } from 'react'
import './BuyMenuPage.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import NavigationbarProfile from '../../../Components/Navigationbar/NavigationbarProfile'
import Footer from '../../../Components/Footer/Footer'

const BuyMenuPage = () => {
    const { category, menuId } = useParams();

    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [coffeeData, setCoffeeData] = useState({})

    const getMenuId = async () => {
        try {
            setIsError(false)
            setIsLoading(true)
            const result = await axios.get(`http://localhost:4000/menus/${category}/${menuId}`)
            setCoffeeData(result.data.data)
            setIsLoading(false)
        } catch (error) {
            setIsError(true)
            setIsLoading(false)
            console.log(error);
        }
    }

    useEffect(() => {
        getMenuId()
    }, [])


    return (
        <>

            <NavigationbarProfile />

            <section className='buy-menu-container'>
                <div className='buy-menu-data-container'>
                    <div className='buy-menu-data'>
                        <div className='buy-menu-name-heading'>
                            <h1>
                                {coffeeData.Name}
                            </h1>
                        </div>
                        <img src={coffeeData.Image_url} alt={`${coffeeData.Name} image`} className='buy-menu-img' />

                        <div className='buy-menu-price'>
                            <h2>
                                {coffeeData.Price}฿
                            </h2>
                        </div>

                        <div className='buy-menu-description'>
                            <p>
                                {coffeeData.Description}
                            </p>
                        </div>

                        <div className='buy-menu-buy'>
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

export default BuyMenuPage