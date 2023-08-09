import React, { useState, useEffect } from 'react'
import './BuyCoffeePage.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import NavigationbarProfile from '../Components/NavigationbarProfile'
import Coffee_Beans from "../assets/Background/Coffee_Beans.jpg"


const BuyCoffeePage = () => {
    const { coffeeName, coffeeId } = useParams();
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [coffeeData, setCoffeeData] = useState({})

    console.log(coffeeData);

    const getCoffeeId = async () => {
        try {
            setIsError(false)
            setIsLoading(true)
            const result = await axios.get(`http://localhost:4000/coffee/${coffeeId}`)
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
                        <h1 className='buy-coffee-heading1'>
                            Coffee Name
                        </h1>
                        <img src={Coffee_Beans} alt="google" className='buy-coffee-img' />
                    </div>
                </div>
            </section>


        </>

    )
}

export default BuyCoffeePage