import React, { useEffect } from 'react'
import NavigationbarLogin from '../Components/NavigationbarLogin'
import './HomePageLogin.css'
import useCoffee from '../Hook/useCoffee'
import Footer from "../Components/Footer"

const HomePageLogin = () => {

    const { getAllCoffee, allCoffee } = useCoffee()


    useEffect(() => {
        getAllCoffee()
    }, [])


    return (
        <>
            <NavigationbarLogin />

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

                                <div className='buy-now-container'>
                                    <button className='buy-now'>Buy Now</button>
                                    <button
                                        className='learn-more'
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