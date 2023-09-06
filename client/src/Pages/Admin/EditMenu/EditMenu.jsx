import React, { useState } from 'react'
import "./EditMenu.css"
import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
import Menus from '../Menus/Menus'

const EditMenu = (props) => {

    const [isOpenEditMenuName, setIsOpenEditMenuName] = useState(false)
    const [isOpenEditMenuPrice, setIsOpenEditMenuPrice] = useState(false)
    const [isOpenEditMenuDescription, setIsOpenEditMenuDescription] = useState(false)
    const [isOpenEditMenuImageUrl, setIsOpenEditMenuImageUrl] = useState(false)

    const menuName = props?.name

    const handleToggleOpenAddNewMenu = (newMenu) => {
        if (newMenu === "coffeeName") {
            setIsOpenEditMenuName(!isOpenEditMenuName)
        } else if (newMenu === "coffeePrice") {
            setIsOpenEditMenuPrice(!isOpenEditMenuPrice)
        } else if (newMenu === "coffeeDescription") {
            setIsOpenEditMenuDescription(!isOpenEditMenuDescription)
        } else if (newMenu === "coffeeImageUrl") {
            setIsOpenEditMenuImageUrl(!isOpenEditMenuImageUrl)
        }
    }

    return (
        <>

            <form className='edit-menu-container' onSubmit={(event) => (event, "coffee")}>

                <Menus />
                
                <div className='edit-menu'>
                    <div className='edit-menu-heading'>
                        <h1>
                            Edit {menuName}
                        </h1>
                    </div>

                    <div
                        className='edit-menu-name'
                        onClick={() => handleToggleOpenAddNewMenu("coffeeName")}
                    >
                        <h1>{menuName} Name: {"name"} </h1>
                        {isOpenEditMenuName &&
                            <div className='edit-menu-name-input' onClick={(event) => event.stopPropagation()}>
                                <h2>
                                    New {menuName} Name: <input type="text" value={"name"} onChange={(event) => setName(event.target.value)} />
                                </h2>
                            </div>
                        }
                    </div>

                    <div
                        className='edit-menu-price'
                        onClick={() => handleToggleOpenAddNewMenu("coffeePrice")}
                    >
                        <h1>{menuName} Price: {"price"}฿ </h1>
                        {isOpenEditMenuPrice &&
                            <div className='edit-menu-price-input' onClick={(event) => event.stopPropagation()}>
                                <h2>
                                    New {menuName} Price: <input type="number" value={"price"} onChange={(event) => setPrice(event.target.value)} />
                                </h2>
                            </div>
                        }
                    </div>

                    <div
                        className='edit-menu-description'
                        onClick={() => handleToggleOpenAddNewMenu("coffeeDescription")}
                    >
                        <h1>{menuName} Description: <br /> {"description"}</h1>
                        {isOpenEditMenuDescription &&
                            <div className='edit-menu-description-input' onClick={(event) => event.stopPropagation()}>
                                <h2>
                                    New {menuName} Description: <br /> <textarea cols="40" rows="10" value={"description"} onChange={(event) => setDescription(event.target.value)}></textarea>
                                </h2>
                            </div>
                        }
                    </div>

                    <div
                        className='edit-menu-image-url'
                        onClick={() => handleToggleOpenAddNewMenu("coffeeImageUrl")}
                    >
                        <h1>{menuName} ImageURL: <br /> </h1>
                        <img src={"image_url"} alt={name + " Picture"} className={"image_url" === "" ? "" : "load-img"} />
                        {isOpenEditMenuImageUrl &&
                            <div className='edit-menu-image-url-input' onClick={(event) => event.stopPropagation()}>
                                <h2>
                                    New {menuName} ImageURL: <br /> <textarea cols="40" rows="10" value={"image_url"} onChange={(event) => setImage_url(event.target.value)}></textarea>
                                </h2>
                            </div>
                        }
                    </div>

                </div>

                <div className='submit-edit-menu'>
                    <button type='submit'>
                        <h1>
                            Edit {menuName}
                        </h1>
                    </button>
                </div>

            </form>

        </>
    )
}

export default EditMenu