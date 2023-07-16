import React, { Suspense } from 'react'
import './SuggestionsCoffeePopup.css'
import Loading from './Loading'


const SuggestionsCoffeePopup = (props) => {
    const {
        Name,
        Image_url,
        Price,
        Description
    } = props?.suggestionsCoffee


    return (
        <div className='coffee-popup-container' onClick={props.handleClosePopUp}>
            <div className='coffee-popup' onClick={(event) => event.stopPropagation()}>
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

export default SuggestionsCoffeePopup