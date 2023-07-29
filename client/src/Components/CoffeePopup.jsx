import React, { Suspense } from 'react'
import './CoffeePopup.css'
import Loading from './Loading'
import Cross from '../assets/Icon/Cross.png'

const CoffeePopup = (props) => {
    const {
        Name,
        Image_url,
        Price,
        Description
    } = props?.coffeeData


    return (
        <div className='coffee-popup-container' onClick={() => props.handleCoffeePopUp()}>
            <div className='coffee-popup' onClick={(event) => event.stopPropagation()}>
                <div className='cross-icon'>
                    <button onClick={() => props.handleCoffeePopUp()}>
                        <img src={Cross} alt="cross icon" />
                    </button>
                </div>
                <Suspense fallback={<Loading />}>
                    <div className="popup-content">
                        <h1>{Name}</h1>
                        <h3>{Price}฿</h3>
                        <img src={Image_url} alt={Name} />
                        <p><span>Coffee Details:</span> {Description}</p>
                    </div>
                </Suspense>
                <div className='popup-button'>
                    <button>Buy Now!!</button>
                </div>
            </div>
        </div>
    )
}

export default CoffeePopup