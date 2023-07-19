import React from 'react'
import './Footer.css'
import Twitter_Icon from "../assets/Icon/Twitter_Icon.svg"
import Instagram_Icon from "../assets/Icon/Instagram_Icon.svg"
import Facebook_Icon from "../assets/Icon/Facebook_Icon.svg"
import Facebook_Icon_Hover from "../assets/Icon/Facebook_Icon_Hover.png"
import Twitter_Icon_Hover from "../assets/Icon/Twitter_Icon_Hover.png"
import Instagram_Icon_Hover from "../assets/Icon/Instagram_Icon_Hover.png"
import Twitch_Icon_Hover from "../assets/Icon/Twitch_Icon_Hover.png"
import Twitch_Icon from "../assets/Icon/Twitch_Icon.svg"
import Network_Icon from "../assets/Icon/Network_Icon.svg"
import { Link } from "react-router-dom"
import { useState } from 'react'

const Footer = () => {
    const [state, setState] = useState({
        isHoverTwitter: false,
        isHoverInstagram: false,
        isHoverFacebook: false,
        isHoverTwitch: false
    })

    return (
        <footer id='contact-us'>
            <div className='footer-container'>
                <div className='coffee-icon'>☕</div>

                <div className='contact-icon'>

                    {
                        state.isHoverTwitter
                            ? <Link to={"/pageNotFound"} target='_blank'>
                                <img src={Twitter_Icon_Hover} a="twitter icon" className='twitter-icon' onMouseLeave={() => setState({ ...state, isHoverTwitter: false })} />
                            </Link>
                            : <Link to={"/pageNotFound"} target='_blank'>
                                <img src={Twitter_Icon} a="twitter icon" className='twitter-icon' onMouseEnter={() => setState({ ...state, isHoverTwitter: true })} />
                            </Link>
                    }

                    {
                        state.isHoverInstagram
                            ? <Link to={"/pageNotFound"} target='_blank'>
                                <img src={Instagram_Icon_Hover} alt="instagram icon" className='instagram-icon' onMouseLeave={() => setState({ ...state, isHoverInstagram: false })} />
                            </Link>
                            : <Link to={"/pageNotFound"} target='_blank'>
                                <img src={Instagram_Icon} alt="instagram icon" className='instagram-icon' onMouseEnter={() => setState({ ...state, isHoverInstagram: true })} />
                            </Link>
                    }


                    {
                        state.isHoverFacebook
                            ? <Link to={"/pageNotFound"} target='_blank'>
                                <img src={Facebook_Icon_Hover} alt="facebook icon" className='facebook-icon' onMouseLeave={() => setState({ ...state, isHoverFacebook: false })} />

                            </Link>
                            : <Link to={"/pageNotFound"} target='_blank'>
                                <img src={Facebook_Icon} alt="facebook icon" className='facebook-icon' onMouseEnter={() => setState({ ...state, isHoverFacebook: true })} />

                            </Link>
                    }

                    {
                        state.isHoverTwitch
                            ? <Link to={"/pageNotFound"} target='_blank'>
                                <img src={Twitch_Icon_Hover} alt="twitch icon" className='twitch-icon' onMouseLeave={() => setState({ ...state, isHoverTwitch: false })} />

                            </Link>
                            : <Link to={"/pageNotFound"} target='_blank'>
                                <img src={Twitch_Icon} alt="twitch icon" className='twitch-icon' onMouseEnter={() => setState({ ...state, isHoverTwitch: true })} />

                            </Link>
                    }

                </div>
                <div className='copyright'>
                    <p>© 2023 Cafe-Crafter. All Rights Brewserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer