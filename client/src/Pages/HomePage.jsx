import React from 'react'
import NavigationbarNonLogin from '../Components/NavigationbarNonLogin'
import './HomePage.css'
const HomePage = () => {
    return (
        <>
            <NavigationbarNonLogin />
            <main className='main-container'>
                <div className='discover-you-brew'>
                    <div className='coffee-content'>
                        <h1>Discover Your Brew!</h1>
                        <p>Explore the world of coffee with Cafe-Crafter, and be prepared for a caffeine-fueled journey. Scratch your itch for knowledge by learning about coffee origins, brewing methods and more, while enjoying a seamless online experience.</p>
                    </div>
                    <div className='coffee-machine'>
                        <img src="https://framerusercontent.com/images/AQCFkA5IzU2aAVoezMQDdr33U.jpg?scale-down-to=512" alt="coffee-machine" srcset="https://framerusercontent.com/images/AQCFkA5IzU2aAVoezMQDdr33U.jpg?scale-down-to=512 341w, https://framerusercontent.com/images/AQCFkA5IzU2aAVoezMQDdr33U.jpg?scale-down-to=1024 682w, https://framerusercontent.com/images/AQCFkA5IzU2aAVoezMQDdr33U.jpg" ></img>
                    </div>
                </div>
            </main>
        </>
    )
}

export default HomePage