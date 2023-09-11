import React, { useEffect, useState } from 'react'
import "./Tea.css"
import useMenus from '../../Hook/useMenus'
import MenuPopup from '../PopUp/MenuPopup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import BuyCoffeePage from '../../Pages/Customer/BuyMenuPage/BuyMenuPage'

const Tea = () => {
    const navigate = useNavigate()

    const { getAllTea, allTea } = useMenus()

    const [menuPopUp, setMenuPopUp] = useState(false)

    const [menuData, setMenuData] = useState({})

    useEffect(() => {
        getAllTea()
    }, [])

    const getTeaId = async (teaId) => {
        try {
            const result = await axios.get(`http://localhost:4000/menus/tea/${teaId}`)
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
        window.scrollTo(0, 0),
            < BuyCoffeePage
                category="tea"
            />
        navigate(`/Buy/${menuId}/${menuName}/tea`)
    }

    return (
        <>

            {menuPopUp &&
                <MenuPopup
                    handleMenuPopUp={handleMenuPopUp}
                    menuData={menuData}
                />

            }

            <section className='tea-menu-background'>
                {allTea.map((item, index) => {
                    return (
                        <div
                            className='tea-menu'
                            key={index}
                        >
                            <h3>{item.Name}</h3>

                            <h4>{item.Price}฿</h4>
                            <img src={item.Image_url} alt="img" />

                            <div className='tea-three-button-container'>
                                <button
                                    className='tea-buy-now'
                                    onClick={(event) => handleBuyNow(event, item.Id, item.Name)}
                                >
                                    Buy Now
                                </button>
                                <button
                                    className='tea-learn-more'
                                    onClick={(() => {
                                        getTeaId(item?.Id)
                                        handleMenuPopUp()
                                    })}
                                >
                                    Details
                                </button>
                                <button
                                    className='tea-add-to-cart'
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


export default Tea