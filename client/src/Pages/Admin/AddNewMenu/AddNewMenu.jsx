import React, { useState } from 'react'
import "./AddNewMenu.css"
import useCoffee from '../../../Hook/useCoffee'

const AddNewMenu = (props) => {
    const { InsertCoffee } = useCoffee()

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [image_url, setImage_url] = useState("")

    const [isOpenNewMenuName, setIsOpenNewMenuName] = useState(false)
    const [isOpenNewMenuPrice, setIsOpenNewMenuPrice] = useState(false)
    const [isOpenNewMenuDescription, setIsOpenNewMenuDescription] = useState(false)
    const [isOpenNewMenuImageUrl, setIsOpenNewMenuImageUrl] = useState(false)

    const menuName = props?.name

    const handleToggleOpenAddNewMenu = (newMenu) => {
        if (newMenu === "coffeeName") {
            setIsOpenNewMenuName(!isOpenNewMenuName)
        } else if (newMenu === "coffeePrice") {
            setIsOpenNewMenuPrice(!isOpenNewMenuPrice)
        } else if (newMenu === "coffeeDescription") {
            setIsOpenNewMenuDescription(!isOpenNewMenuDescription)
        } else if (newMenu === "coffeeImageUrl") {
            setIsOpenNewMenuImageUrl(!isOpenNewMenuImageUrl)
        }
    }

    const handleAddNewMenu = (event, menu) => {
        event.preventDefault()
        if (menu === "coffee") {
            const floatPrice = parseFloat(price)
            const data = {
                name,
                price: floatPrice,
                description,
                image_url,
                category: menu
            }
            InsertCoffee(data)
        }
    }

    return (

        <>
            <form className='add-new-menu-container' onSubmit={(event) => handleAddNewMenu(event, "coffee")}>
                <div className='add-new-menu'>
                    <div className='add-new-menu-heading'>
                        <h1>
                            Add New {menuName}
                        </h1>
                    </div>

                    <div
                        className='new-menu-name'
                        onClick={() => handleToggleOpenAddNewMenu("coffeeName")}
                    >
                        <h1>{menuName} Name: {name} </h1>
                        {isOpenNewMenuName &&
                            <div className='new-menu-name-input' onClick={(event) => event.stopPropagation()}>
                                <h2>
                                    New {menuName} Name: <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
                                </h2>
                            </div>
                        }
                    </div>

                    <div
                        className='new-menu-price'
                        onClick={() => handleToggleOpenAddNewMenu("coffeePrice")}
                    >
                        <h1>{menuName} Price: {price}฿ </h1>
                        {isOpenNewMenuPrice &&
                            <div className='new-menu-price-input' onClick={(event) => event.stopPropagation()}>
                                <h2>
                                    New {menuName} Price: <input type="number" value={price} onChange={(event) => setPrice(event.target.value)} />
                                </h2>
                            </div>
                        }
                    </div>

                    <div
                        className='new-menu-description'
                        onClick={() => handleToggleOpenAddNewMenu("coffeeDescription")}
                    >
                        <h1>{menuName} Description: <br /> {description}</h1>
                        {isOpenNewMenuDescription &&
                            <div className='new-menu-description-input' onClick={(event) => event.stopPropagation()}>
                                <h2>
                                    New {menuName} Description: <br /> <textarea cols="40" rows="10" value={description} onChange={(event) => setDescription(event.target.value)}></textarea>
                                </h2>
                            </div>
                        }
                    </div>

                    <div
                        className='new-menu-image-url'
                        onClick={() => handleToggleOpenAddNewMenu("coffeeImageUrl")}
                    >
                        <h1>{menuName} ImageURL: <br /> </h1>
                        <img src={image_url} alt={name + " Picture"} className={image_url === "" ? "" : "load-img"} />
                        {isOpenNewMenuImageUrl &&
                            <div className='new-menu-image-url-input' onClick={(event) => event.stopPropagation()}>
                                <h2>
                                    New {menuName} ImageURL: <br /> <textarea cols="40" rows="10" value={image_url} onChange={(event) => setImage_url(event.target.value)}></textarea>
                                </h2>
                            </div>
                        }
                    </div>

                </div>

                <div className='submit-add-new-menu'>
                    <button type='submit'>
                        <h1>
                            Add New {menuName}
                        </h1>
                    </button>
                </div>

            </form>



        </>
    )
}

export default AddNewMenu