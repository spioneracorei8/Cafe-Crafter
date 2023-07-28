import React, { useEffect } from 'react'
import NavigationbarLogin from '../Components/NavigationbarLogin'
import './HomePageLogin.css'
import useCoffee from '../Hook/useCoffee'
const HomePageLogin = () => {

    const { getAllCoffee, allCoffee } = useCoffee()


    useEffect(() => {
        getAllCoffee()
    }, [])


    return (
        <>
            <NavigationbarLogin />
            <nav className='category-menu'>
                <ul>
                    <li>Coffee</li>
                    <li>Tea</li>
                    <li>Cake</li>
                </ul>
            </nav>
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
            </div>
        </>
    )
}

export default HomePageLogin