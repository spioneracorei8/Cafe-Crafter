import React from 'react'
import './Footer.css'
import Twitter_Icon_Black from "../assets/Icon/Twitter_Icon_Black.svg"
import Twitter_Icon_White from "../assets/Icon/Twitter_Icon_White.png"
import Twitch_Icon_Black from "../assets/Icon/Twitch_Icon_Black.svg"
import Twitch_Icon_White from "../assets/Icon/Twitch_Icon_White.png"
import Instagram_Icon_Black from "../assets/Icon/Instagram_Icon_Black.svg"
import Instagram_Icon_White from "../assets/Icon/Instagram_Icon_White.png"
import Facebook_Icon_Black from "../assets/Icon/Facebook_Icon_Black.svg"
import Facebook_Icon_White from "../assets/Icon/Facebook_Icon_White.png"


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
                            ? <Link to={"/Cafe-Crafter-Twitter"} target='_blank'>
                                <img src={Twitter_Icon_White} a="twitter icon" className='twitter-icon' onMouseLeave={() => setState({ ...state, isHoverTwitter: false })} />
                            </Link>
                            : <Link to={"/Cafe-Crafter-Twitter"} target='_blank'>
                                <img src={Twitter_Icon_Black} a="twitter icon" className='twitter-icon' onMouseEnter={() => setState({ ...state, isHoverTwitter: true })} />
                            </Link>
                    }

                    {
                        state.isHoverInstagram
                            ? <Link to={"/Cafe-Crafter-Instagram"} target='_blank'>
                                <img src={Instagram_Icon_White} alt="instagram icon" className='instagram-icon' onMouseLeave={() => setState({ ...state, isHoverInstagram: false })} />
                            </Link>
                            : <Link to={"/Cafe-Crafter-Instagram"} target='_blank'>
                                <img src={Instagram_Icon_Black} alt="instagram icon" className='instagram-icon' onMouseEnter={() => setState({ ...state, isHoverInstagram: true })} />
                            </Link>
                    }


                    {
                        state.isHoverFacebook
                            ? <Link to={"/Cafe-Crafter-Facebook"} target='_blank'>
                                <img src={Facebook_Icon_White} alt="facebook icon" className='facebook-icon' onMouseLeave={() => setState({ ...state, isHoverFacebook: false })} />

                            </Link>
                            : <Link to={"/Cafe-Crafter-Facebook"} target='_blank'>
                                <img src={Facebook_Icon_Black} alt="facebook icon" className='facebook-icon' onMouseEnter={() => setState({ ...state, isHoverFacebook: true })} />

                            </Link>
                    }

                    {
                        state.isHoverTwitch
                            ? <Link to={"/Cafe-Crafter-Twitch"} target='_blank'>
                                <img src={Twitch_Icon_White} alt="twitch icon" className='twitch-icon' onMouseLeave={() => setState({ ...state, isHoverTwitch: false })} />

                            </Link>
                            : <Link to={"/Cafe-Crafter-Twitch"} target='_blank'>
                                <img src={Twitch_Icon_Black} alt="twitch icon" className='twitch-icon' onMouseEnter={() => setState({ ...state, isHoverTwitch: true })} />

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