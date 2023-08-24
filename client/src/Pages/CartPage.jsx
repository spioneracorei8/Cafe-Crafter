import React, { useEffect, useState } from 'react'
import "./CartPage.css"
import NavigationbarProfile from '../Components/NavigationbarProfile'
import Footer from '../Components/Footer'
import axios from 'axios'
import Loading from '../Components/Loading'


const CartPage = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [carts, setCarts] = useState([])

    const GetCarts = async () => {
        try {
            setIsLoading(true)
            setIsError(false)
            const result = await axios.get(`http://localhost:4000/cart/${localStorage.getItem("id")}`)
            setCarts(result?.data?.data)
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            setIsError(true)
        }
    }

    useEffect(() => {
        GetCarts()
    }, [])


    return (

        <>

            {isLoading &&
                <Loading />
            }

            {isError &&
                <h1>Fetching Data Error...</h1>
            }

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

                {
                    carts?.map((item, index) => (
                        <CartItem
                            key={index}
                            item={item}
                            isLoading={isLoading}
                            setIsLoading={setIsLoading}
                            isError={isError}
                            setIsError={setIsError}
                        />
                    ))
                }

                <div className='bill-container'>
                    <div className='coupon-code'>
                        <div className='input-coupon'>
                            <input type="text" placeholder='Apply The Coupon' />
                            <button>
                                <h1>
                                    Check Discount Coupon
                                </h1>
                            </button>
                        </div>
                    </div>
                    <div className='check-bill'>
                        <div className='sub-total'>
                            <h3>
                                Subtotal:
                            </h3>
                            <h3>
                                100฿
                            </h3>
                        </div>
                        <div className='coupon-total'>
                            <h3>
                                Discount Coupon:
                            </h3>
                            <h3>
                                100฿
                            </h3>
                        </div>
                        <div className='grand-total'>
                            <h3>
                                <span>?</span> Grand total:
                            </h3>
                            <h3>
                                100฿
                            </h3>
                        </div>

                    </div>

                </div>
                <div className='proceed-to-checkout'>
                    <button>
                        <h1>Proceed to checkout </h1>
                    </button>
                </div>
            </section>

            <Footer />
        </>
    )
}

const CartItem = ({ item, isLoading, setIsLoading, isError, setIsError }) => {
    const [quantity, setQuantity] = useState(item?.Quantity)
    const price = item?.Price
    const [totalMenuPrice, setTotalMenuPrice] = useState(0)

    const addQuantity = async (event, cart_id) => {
        event.preventDefault()
        setQuantity(quantity + 1)
        try {
            setIsLoading(true)
            setIsError(false)
            await axios.put(`http://localhost:4000/cart/add/${cart_id}/${localStorage.getItem("id")}`)
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            setIsError(true)
            console.log(error);
        }
    }

    const reduceQuantity = async (event, cart_id) => {
        event.preventDefault()
        if (quantity === 1) {
            setQuantity(1)
        } else {
            setQuantity(quantity - 1)
            try {
                setIsLoading(true)
                setIsError(false)
                await axios.put(`http://localhost:4000/cart/reduce/${cart_id}/${localStorage.getItem("id")}`)
                setIsLoading(false)
            } catch (error) {
                setIsLoading(false)
                setIsError(true)
                console.log(error);
            }
        }
    }

    const handleCalculatePriceMenu = () => {
        setTotalMenuPrice(price * quantity)
    }


    useEffect(() => {
        handleCalculatePriceMenu()
    }, [quantity])

    return (
        <div className='added-menu-container'>
            <div className='img-name-added'>
                <img src={item.Image_url} alt="coffee" className='img-added' />
                <div className="coffee-name-added">
                    <p>
                        {item.Name}
                    </p>
                </div>
            </div>

            <div className='category-price-added'>
                <div className='category-added'>
                    <p>{item.Category}</p>
                </div>
                <div className='price-added'>
                    <p>{item.Price}฿</p>
                </div>
            </div>

            <div className='quantity-total-added'>
                <div className='add-reduce-quantity'>
                    <p
                        className='add-symbol'
                        onClick={(event) => reduceQuantity(event, item?.Cart_id)}
                    >
                        −
                    </p>
                    <p className='quantity-added'>
                        {quantity}
                    </p>
                    <p
                        className='reduce-symbol'
                        onClick={(event) => addQuantity(event, item?.Cart_id)}
                    >
                        +
                    </p>
                </div>
                <div className='total-added'>
                    <p>{totalMenuPrice}฿</p>
                </div>
            </div>

        </div>
    )
}


export default CartPage