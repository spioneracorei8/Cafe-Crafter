import React from 'react'
import './Footer.css'
import Twitter_Icon from "../assets/Icon/Twitter_Icon.svg"
import Instagram_Icon from "../assets/Icon/Instagram_Icon.svg"
import Facebook_Icon from "../assets/Icon/Facebook_Icon.svg"
import Twitch_Icon from "../assets/Icon/Twitch_Icon.svg"
import Network_Icon from "../assets/Icon/Network_Icon.svg"

const Footer = () => {
    return (
        <footer>
            <div className='footer-container'>
                <img src={Network_Icon} alt="network icon" className='network-icon' />
                <div className='contact-icon'>
                    <img src={Twitter_Icon} alt="twitter icon" className='twitter-icon' />
                    <img src={Instagram_Icon} alt="instagram icon" className='instagram-icon' />
                    <img src={Facebook_Icon} alt="facebook icon" className='facebook-icon' />
                    <img src={Twitch_Icon} alt="twitch icon" className='twitch-icon' />
                </div>
                <div className='copyright'>
                    <p>© 2023 Cafe-Crafter. All Rights Brewserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer