import React, { useRef, useState } from 'react'
import './HomePageNonLogin.css'
import { IngredientsCoffeeData, OtherAboutCoffeeData } from '../data/CoffeeData.js'
import NavigationbarNonLogin from '../Components/NavigationbarNonLogin'
import Footer from '../Components/Footer'
import SuggestionsCoffeePopup from '../Components/SuggestionsCoffeePopup'
import Loading from '../Components/Loading'
import Arrow_Left_Icon from '../assets/Icon/Arrow_Left_Icon.png'
import Arrow_Right_Icon from '../assets/Icon/Arrow_Right_Icon.png'
import useCoffee from '../Hook/useCoffee'
import axios from 'axios'
import { Link } from 'react-router-dom'

const HomePageNonLogin = () => {
    const { isLoading, setIsLoading, isError, setIsError, suggestCoffee } = useCoffee()
    const scrollContainerRef = useRef(null)
    const [suggestCoffeeName, setSuggestCoffeeName] = useState({})
    const [coffeePopUp, setCoffeePopUp] = useState(false)

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

    const getCoffeeName = async (coffeeName) => {
        try {
            setIsError(false);
            setIsLoading(true);
            const result = await axios.get(`http://localhost:4000/suggest-coffee/${coffeeName}`)
            setSuggestCoffeeName(result.data.data)
            setIsLoading(false)
        } catch (error) {
            setIsError(true);
            setIsLoading(false);
            console.log(error);
        }
    }

    const handleShowPopUp = () => {
        setCoffeePopUp(true)
    }

    const handleClosePopUp = () => {
        setCoffeePopUp(false)
    }

    return (
        <>
            {isError &&
                <h1>Fetching Data Error...</h1>
            }
            {isLoading &&
                <Loading />
            }
            <NavigationbarNonLogin />
            {coffeePopUp &&
                <SuggestionsCoffeePopup
                    handleClosePopUp={handleClosePopUp}
                    suggestionsCoffee={suggestCoffeeName}
                />
            }

            <main className='main-container'>

                <section className='discover-you-brew'>
                    <div className='discover-content'>
                        <h1>Discover Your Brew!</h1>
                        <p>Explore the world of coffee with Cafe-Crafter, and be prepared for a caffeine-fueled journey. Scratch your itch for knowledge by learning about coffee origins, brewing methods and more, while enjoying a seamless online experience.</p>
                    </div>
                    <div className='discover-machine'>
                        <img src="https://framerusercontent.com/images/AQCFkA5IzU2aAVoezMQDdr33U.jpg?scale-down-to=512" alt="coffee-machine"></img>
                    </div>
                </section>

                {/* Suggestions Coffee Session */}
                <div className='suggest-coffee-container' id='suggestions-coffee'>
                    <h1>Suggestions Coffee</h1>
                    <div className='scroll-image-container'>
                        <div className='scroll-image-view-all'>
                            <h2>View All</h2>
                        </div>
                        <div className='scroll-arrow'>
                            <div className="scroll-arrow-left" onClick={() => ScrollLeft()}>
                                <img src={Arrow_Left_Icon} alt="arrow left icon" className='arrow-left' />
                            </div>
                            <div className="scroll-arrow-right" onClick={ScrollRight}>
                                <img src={Arrow_Right_Icon} alt="arrow left icon" className='arrow-right' />

                            </div>
                        </div>
                    </div>

                    <div

                    >
                        <div className='suggest-coffee'>
                            <div className='suggest-coffee-menu' ref={scrollContainerRef}>
                                {suggestCoffee.map((item, index) => {
                                    return (
                                        <div
                                            className='suggestions-menu'
                                            key={index}
                                        >
                                            <h3>{item.Name}</h3>

                                            <h4>{item.Price}฿</h4>
                                            <img src={item.Image_url} alt="img" />

                                            <div className='buy-now-container'>
                                                <button className='buy-now'>Buy Now</button>
                                                <button
                                                    className='learn-more'
                                                    onClick={(() => {
                                                        return (
                                                            getCoffeeName(item.Name),
                                                            handleShowPopUp()
                                                        )
                                                    })}
                                                >
                                                    Learn more
                                                </button>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
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
                                    <Link to={`/Coffee-${item.title}-${item.subContentOne}`} target='_blank'>
                                        <li>
                                            {item.subContentOne}
                                        </li>
                                    </Link>

                                    <Link to={`/Coffee-${item.title}-${item.subContentTwo}`} target='_blank'>
                                        <li>
                                            {item.subContentTwo}
                                        </li>
                                    </Link>

                                    <Link to={`/Coffee-${item.title}-${item.subContentThree}`} target='_blank'>
                                        <li>
                                            {item.subContentThree}
                                        </li>
                                    </Link>
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

export default HomePageNonLogin