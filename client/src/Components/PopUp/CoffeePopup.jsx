import React, { Suspense } from 'react'
import './CoffeePopup.css'
import Loading from '../Loading/Loading'
import Cross from '../../assets/Icon/Cross.png'
import { useNavigate } from 'react-router-dom'
const CoffeePopup = (props) => {
    const navigate = useNavigate()
    const {
        Id,
        Name,
        Image_url,
        Price,
        Description
    } = props?.coffeeData

    const handleBuyNow = (event, coffeeName, coffeeId) => {
        event.preventDefault()
        window.scrollTo(0, 0)
        navigate(`/Buy/${coffeeId}/${coffeeName}`)
    }

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
                    <button
                        onClick={(event) => handleBuyNow(event, Name, Id)}
                    >
                        Buy Now!
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CoffeePopup