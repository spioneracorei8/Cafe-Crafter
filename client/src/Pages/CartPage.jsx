import React from 'react'
import "./CartPage.css"
import NavigationbarProfile from '../Components/NavigationbarProfile'
import Coffee_Beans from "../assets/Background/Coffee_Beans.jpg"
import Footer from '../Components/Footer'

const CartPage = () => {

    return (
        <>

            <NavigationbarProfile />

            <section className='cart-container'>
                <div className='cart-heading'>
                    <h1>
                        Cart
                    </h1>
                </div>
                <div className='cart-topic'>
                    <div>
                        <ul className='container-cart-list'>
                            <li>Added Menus</li>
                        </ul>
                    </div>

                    <div>
                        <ul className='container-cart-list'>
                            <li>
                                Category
                            </li>
                            <li>
                                Price
                            </li>
                        </ul>
                    </div>

                    <div>
                        <ul className='container-cart-list'>
                            <li>
                                Quantity
                            </li>
                            <li>
                                Total
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='underline-cart-topic'></div>

                <div className='added-menu-container'>
                    <div className='img-name-added'>
                        <img src={Coffee_Beans} alt="coffee" className='img-added' />
                        <div className="coffee-name-added">
                            <p>
                                Coffeeesdeeeeeeeeeeeeeeeeeeee
                            </p>
                        </div>
                    </div>
                    <div className='category-price-added'>
                        <div className='category-added'>
                            <p>Coffee</p>
                        </div>
                        <div className='price-added'>
                            <p>100$</p>
                        </div>
                    </div>
                    <div className='quantity-total-added'>
                        <div className='add-reduce-quantity'>
                            <p className='add-symbol'>
                                +
                            </p>
                            <p className='quantity-added'>1</p>
                            <p className='reduce-symbol'>
                                −
                            </p>
                        </div>
                        <div className='total-added'>
                            <p>10000000$</p>
                        </div>
                    </div>

                </div>

            </section>

            <Footer />
        </>
    )
}

export default CartPage