import React, { useState } from 'react'
import "./AddNewMenu.css"
import useMenus from '../../../Hook/useMenus'

const AddNewMenu = ({ category }) => {
    const { InsertCoffee, InsertTea } = useMenus()

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [image_url, setImage_url] = useState("")

    const [isOpenNewMenuName, setIsOpenNewMenuName] = useState(false)
    const [isOpenNewMenuPrice, setIsOpenNewMenuPrice] = useState(false)
    const [isOpenNewMenuDescription, setIsOpenNewMenuDescription] = useState(false)
    const [isOpenNewMenuImageUrl, setIsOpenNewMenuImageUrl] = useState(false)

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

    const handleAddNewMenu = (event, category) => {
        event.preventDefault()
        const floatPrice = parseFloat(price)
        const data = {
            name,
            price: floatPrice,
            description,
            image_url,
            category: category.toLowerCase()
        }
        if (category === "Coffee") {
            InsertCoffee(data)
        } else if (category === "Tea") {
            InsertTea(data)
        }
    }

    return (

        <>
            <form className='add-new-menu-container' onSubmit={(event) => handleAddNewMenu(event, menuName)}>
                <div className='add-new-menu'>
                    <div className='add-new-menu-heading'>
                        <h1>
                            Add New {category}
                        </h1>
                    </div>

                    <div
                        className='new-menu-name'
                        onClick={() => handleToggleOpenAddNewMenu("coffeeName")}
                    >
                        <h1>{category} Name: {name} </h1>
                        {isOpenNewMenuName &&
                            <div className='new-menu-name-input' onClick={(event) => event.stopPropagation()}>
                                <h2>
                                    New {category} Name: <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
                                </h2>
                            </div>
                        }
                    </div>

                    <div
                        className='new-menu-price'
                        onClick={() => handleToggleOpenAddNewMenu("coffeePrice")}
                    >
                        <h1>{category} Price: {price}฿ </h1>
                        {isOpenNewMenuPrice &&
                            <div className='new-menu-price-input' onClick={(event) => event.stopPropagation()}>
                                <h2>
                                    New {category} Price: <input type="number" value={price} onChange={(event) => setPrice(event.target.value)} />
                                </h2>
                            </div>
                        }
                    </div>

                    <div
                        className='new-menu-description'
                        onClick={() => handleToggleOpenAddNewMenu("coffeeDescription")}
                    >
                        <h1>{category} Description: <br /> </h1>
                        <p>
                            {description}
                        </p>
                        {isOpenNewMenuDescription &&
                            <div className='new-menu-description-input' onClick={(event) => event.stopPropagation()}>
                                <h2>
                                    New {category} Description: <br />
                                </h2>
                                <textarea cols="40" rows="10" value={description} onChange={(event) => setDescription(event.target.value)}></textarea>
                            </div>
                        }
                    </div>

                    <div
                        className='new-menu-image-url'
                        onClick={() => handleToggleOpenAddNewMenu("coffeeImageUrl")}
                    >
                        <h1>{category} ImageURL: <br /> </h1>
                        <img src={image_url} alt={name + " Picture"} className={image_url === "" ? "" : "load-img"} />
                        {isOpenNewMenuImageUrl &&
                            <div className='new-menu-image-url-input' onClick={(event) => event.stopPropagation()}>
                                <h2>
                                    New {category} ImageURL: <br />
                                </h2>
                                <textarea cols="40" rows="10" value={image_url} onChange={(event) => setImage_url(event.target.value)}></textarea>
                            </div>
                        }
                    </div>

                </div>

                <div className='submit-add-new-menu'>
                    <button type='submit'>
                        <h1>
                            Add New {category}
                        </h1>
                    </button>
                </div>

            </form>



        </>
    )
}

export default AddNewMenu