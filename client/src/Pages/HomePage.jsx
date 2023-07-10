import React, { useEffect, useRef, useState } from 'react'
import './HomePage.css'
import { IngredientsCoffeeData, OtherAboutCoffeeData } from '../data/CoffeeData.js'
import Arrow_Left_Icon from '../assets/Icon/Arrow_Left_Icon.png'
import Arrow_Right_Icon from '../assets/Icon/Arrow_Right_Icon.png'
import NavigationbarNonLogin from '../Components/NavigationbarNonLogin'
import Footer from '../Components/Footer'
import useCoffee from '../Hook/useCoffee'


const HomePage = () => {
    const { getAllSuggestionsCoffee, suggestionsCoffee } = useCoffee()
    const scrollContainerRef = useRef(null)

    useEffect(() => {
        getAllSuggestionsCoffee()
    }, [])

    const ScrollLeft = () => {
        scrollContainerRef.current.scrollBy({
            left: -250,
            behavior: 'smooth',
        });
    };
    const ScrollRight = () => {
        scrollContainerRef.current.scrollBy({
            left: 250,
            behavior: 'smooth',
        });
    };

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
                        <img src="https://framerusercontent.com/images/AQCFkA5IzU2aAVoezMQDdr33U.jpg?scale-down-to=512" alt="coffee-machine"></img>
                    </div>
                </div>

                {/* Suggestions Coffee Session */}
                <div className='suggestions-coffee-container' id='suggestions-coffee'>
                    <h1>Suggestions Coffee</h1>
                    <div className='scroll-image-container'>
                        <div className='scroll-image-view-all'>
                            <h2>View All</h2>
                        </div>
                        <div className='scroll-image-arrow'>
                            <div className="scroll-image-arrow-left" onClick={() => ScrollLeft()}>
                                <img src={Arrow_Left_Icon} alt="arrow left icon" className='arrow-left' />
                            </div>
                            <div className="scroll-image-arrow-right" onClick={ScrollRight}>
                                <img src={Arrow_Right_Icon} alt="arrow left icon" className='arrow-right' />

                            </div>
                        </div>
                    </div>
                    <div className='suggestions-coffee'>
                        <div className='suggestions-menu-container' ref={scrollContainerRef}>
                            {suggestionsCoffee.map((item, index) => {
                                return (
                                    <div
                                        className='suggestions-menu'
                                        key={index}
                                    >
                                        <h3>{item.Name}</h3>

                                        <h4>{item.Price}฿</h4>
                                        <img src={item.Image_url} alt="img" />

                                        <div className='suggestions-menu-button'>
                                            <button className='buy-now'>Buy Now</button>
                                            <button className='learn-more'>Learn more</button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                    </div>
                </div>

                {/* What is Cafe-Crafter Session */}
                <div className='cafe-crafter-container' id='cafe-crafter?'>
                    <h1>Cafe-Crafter?</h1>

                    <div className='cafe-crafter-content'>
                        <p>
                            Discover a world of coffee goodness with Cafe-Crafter. We obsessively craft the most exquisite concoctions to bring you an extraordinary coffee experience. Let us guide you through a magical dance of flavors.
                        </p>
                        <p>
                            Our mission is to explore the unique corners of the earth in search of the finest beans. After all, life is too short for mediocre coffee. Join us as we unleash the mysterious power of the perfect brew and fuel your daily adventures.
                        </p>
                    </div>
                </div>

                <div className='coffee-ingredients-container'>
                    {IngredientsCoffeeData.map((item, index) => {
                        return (
                            <div className='coffee-ingredients' key={index}>
                                <img src={item.imageUrl} alt={item.title} />
                                <h4>{item.title}</h4>
                                <p>{item.description}</p>
                            </div>
                        )
                    })}
                </div>

                <div className='other-about-coffee-container'>
                    {OtherAboutCoffeeData.map((item, index) => {
                        return (
                            <div className='other-about-coffee' key={index}>
                                <h6>
                                    {item.title}
                                </h6>
                                <ul>
                                    <li>
                                        {item.subContentOne}
                                    </li>
                                    <li>
                                        {item.subContentTwo}
                                    </li>
                                    <li>
                                        {item.subContentThree}
                                    </li>
                                </ul>
                            </div>
                        )
                    })}
                </div>
            </main>
            <Footer />
        </>
    )
}

export default HomePage