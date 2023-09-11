import React, { Suspense } from 'react'
import './MenuPopup.css'
import Loading from '../Loading/Loading'
import Cross from '../../assets/Icon/Cross.png'
import { useNavigate } from 'react-router-dom'

const MenuPopup = ({ menuData, handleMenuPopUp }) => {

    const navigate = useNavigate()

    const {
        Id,
        Name,
        Image_url,
        Price,
        Description,
        Category
    } = menuData

    const fitstLetterCategory = Category?.charAt(0).toUpperCase()
    const capitalCategory = fitstLetterCategory + Category?.slice(1)

    const handleBuyNow = (coffeeName, coffeeId, category) => {
        window.scrollTo(0, 0)
        navigate(`/Buy/${coffeeId}/${coffeeName}/${category}`)
    }

    return (
        <div className={Category === "coffee" ? 'buy-coffee-popup-container' : Category === "tea" ? 'buy-tea-popup-container' : Category === "cake" ? 'buy-cake-popup-container' : "buy-menu-popup-container"} onClick={() => handleMenuPopUp()}>
            <div className='buy-menu-popup' onClick={(event) => event.stopPropagation()}>
                <div className='cross-icon'>
                    <button onClick={() => handleMenuPopUp()}>
                        <img src={Cross} alt="cross icon" />
                    </button>
                </div>
                <Suspense fallback={<Loading />}>
                    <div className="menu-popup-content">
                        <h1>{Name}</h1>
                        <h3>{Price}฿</h3>
                        <img src={Image_url} alt={Name} loading='lazy' />
                        <p><span>{capitalCategory} Details:</span> {Description}</p>
                    </div>
                </Suspense>
                <div className='menu-popup-button'>
                    <button
                        onClick={() => handleBuyNow(Name, Id, Category)}
                        className={Category === "coffee" ? "coffee-popup-button" : Category === "tea" ? "tea-popup-button" : Category === "cake" ? "cake-popup-button" : ""}
                    >
                        Buy {capitalCategory} Now!
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MenuPopup