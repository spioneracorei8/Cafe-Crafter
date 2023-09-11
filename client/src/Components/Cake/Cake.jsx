import React, { useState, useEffect } from 'react'
import "./Cake.css"
import useMenus from '../../Hook/useMenus'
import axios from 'axios'
import MenuPopup from '../PopUp/MenuPopup'
import { useNavigate } from 'react-router-dom'

const Cake = () => {
    const navigate = useNavigate()

    const { getAllCake, allCake } = useMenus()

    const [menuPopUp, setMenuPopUp] = useState(false)
    const [menuData, setMenuData] = useState({})

    useEffect(() => {
        getAllCake()
    }, [])

    const getCakeId = async (teaId) => {
        try {
            const result = await axios.get(`http://localhost:4000/menus/cake/${teaId}`)
            setMenuData(result.data.data)
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
        navigate(`/Buy/${menuId}/${menuName}/cake`)
    }

    return (
        <>

            {menuPopUp &&
                <MenuPopup
                    handleMenuPopUp={handleMenuPopUp}
                    menuData={menuData}
                />

            }

            <section className='menu-background'>
                {allCake.map((item, index) => {
                    return (
                        <div
                            className='menu'
                            key={index}
                        >
                            <h3>{item.Name}</h3>

                            <h4>{item.Price}฿</h4>
                            <img src={item.Image_url} alt="img" />

                            <div className='three-button-container'>
                                <button
                                    className='buy-now'
                                    onClick={(event) => handleBuyNow(event, item.Id, item.Name)}
                                >
                                    Buy Now
                                </button>
                                <button
                                    className='learn-more'
                                    onClick={(() => {
                                        getCakeId(item?.Id)
                                        handleMenuPopUp()
                                    })}
                                >
                                    Details
                                </button>
                                <button
                                    className='add-to-cart'
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

export default Cake