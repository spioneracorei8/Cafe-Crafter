import React, { useEffect, useState } from 'react'
import "./Coffee.css"
import useMenus from "../../Hook/useMenus"
import axios from 'axios'
import MenuPopup from '../PopUp/MenuPopup'
import { useNavigate } from "react-router-dom"

const Coffee = () => {

    const navigate = useNavigate()

    const { getAllCoffee, allCoffee } = useMenus()

    const [menuData, setMenuData] = useState({})
    const [menuPopUp, setMenuPopUp] = useState(false)

    useEffect(() => {
        getAllCoffee()
    }, [])


    const getCoffeeId = async (coffeeId) => {
        try {
            const result = await axios.get(`http://localhost:4000/menus/coffee/${coffeeId}`)
            setMenuData(result.data.data)
        } catch (error) {
            console.log(error);
        }
    }

    const handleAddtoCart = async (event, coffeeId) => {
        event.preventDefault()
        const data = {
            coffee_id: coffeeId,
            category: "coffee"
        }
        try {
            await axios.post(`http://localhost:4000/cart/${localStorage.getItem("id")}`, data)
        } catch (error) {
            console.log(error);
        }
    }

    const handleMenuPopUp = () => {
        setMenuPopUp(!menuPopUp)
    }

    const handleBuyNow = (event, menuId, menuName) => {
        event.preventDefault()
        window.scrollTo(0, 0)
        navigate(`/Buy/${menuId}/${menuName}/coffee`)
    }


    return (
        <>

            {menuPopUp &&
                <MenuPopup
                    handleMenuPopUp={handleMenuPopUp}
                    menuData={menuData}
                />

            }

            <section className='coffee-menu-background'>
                {allCoffee.map((item, index) => {
                    return (
                        <div
                            className='coffee-menu'
                            key={index}
                        >
                            <h3>{item.Name}</h3>

                            <h4>{item.Price}฿</h4>
                            <img src={item.Image_url} alt={item.Name + " Picture"} />

                            <div className='coffee-three-button-container'>
                                <button
                                    className='coffee-buy-now'
                                    onClick={(event) => handleBuyNow(event, item.Id, item.Name)}
                                >
                                    Buy Now
                                </button>
                                <button
                                    className='coffee-learn-more'
                                    onClick={(() => {
                                        getCoffeeId(item.Id)
                                        handleMenuPopUp()
                                    })}
                                >
                                    Details
                                </button>
                                <button
                                    className='coffee-add-to-cart'
                                    onClick={(event) => handleAddtoCart(event, item.Id)}
                                >
                                    Add To Cart
                                </button>
                            </div>
                        </div>
                    )
                })}
            </section>


        </>

    )
}

export default Coffee