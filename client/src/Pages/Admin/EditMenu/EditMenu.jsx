import React, { useEffect, useState } from 'react'
import "./EditMenu.css"
import useMenus from '../../../Hook/useMenus'
import Carousel from 'react-elastic-carousel';
import axios from 'axios';
import Search_Icon from "../../../assets/Icon/Search_Icon.png"

const EditMenu = ({ category, toggleNavbarLeft }) => {

    const fitstLetterCategory = category.charAt(0).toUpperCase()
    const capitalCategory = fitstLetterCategory + category.slice(1)

    const { getAllCoffee, UpdateMenu, allCoffee, setAllCoffee, getAllTea, UpdateTea, allTea, setAllTea } = useMenus()

    const [isOpenEditMenuName, setIsOpenEditMenuName] = useState(false)
    const [isOpenEditMenuPrice, setIsOpenEditMenuPrice] = useState(false)
    const [isOpenEditMenuDescription, setIsOpenEditMenuDescription] = useState(false)
    const [isOpenEditMenuImageUrl, setIsOpenEditMenuImageUrl] = useState(false)

    const [editMenuId, setEditMenuId] = useState(0)
    const [editMenuName, setEditMenuName] = useState("")
    const [editMenuPrice, setEditMenuPrice] = useState(0)
    const [editMenuDescription, setEditMenuDescription] = useState("")
    const [editMenuImageUrl, setEditMenuImageUrl] = useState("")

    const [searchMenuName, setSearchMenuName] = useState("")

    const breakPoints = [
        {
            width: 1200, itemsToShow: 3,
        }
    ]

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

    if (category === "coffee") {
        useEffect(() => {
            getAllCoffee()
            setAllTea([])
        }, [category])
    } else if (category === "tea") {
        useEffect(() => {
            getAllTea()
            setAllCoffee([])
        }, [category])
    }

    const handleSelectEditMenu = async (menuId, category) => {
        const result = await axios.get(`http://localhost:4000/menus/${category}/${menuId}`)
        setEditMenuName(result.data.data?.Name)
        setEditMenuPrice(result.data.data?.Price)
        setEditMenuDescription(result.data.data?.Description)
        setEditMenuImageUrl(result.data.data?.Image_url)
    }



    const handleEditMenu = (category) => {
        const floatPrice = parseFloat(editMenuPrice)
        const data = {
            name: editMenuName,
            price: floatPrice,
            description: editMenuDescription,
            image_url: editMenuImageUrl,
            category

        }
        if (category === "coffee") {
            UpdateMenu(data, editMenuId, "coffee")
        } else if (category === "tea") {
            UpdateMenu(data, editMenuId, "tea")
        }
    }

    const handleSearchInputChange = (category) => {
        if (category == "coffee") {
            const menuDataInput = allCoffee.find((item) => {
                return searchMenuName === item.Name
            })
            handleSelectEditMenu(menuDataInput?.Id, "coffee")
        } else if (category === "tea") {
            const menuDataInput = allTea.find((item) => {
                return searchMenuName === item.Name
            })
            handleSelectEditMenu(menuDataInput?.Id, "tea")
        }
    }

    const handleOptionSelect = (event, category) => {
        if (category === "coffee") {
            const menuDataInput = allCoffee.find((item) => {
                return searchMenuName === item.Name
            })
            handleSelectEditMenu(menuDataInput?.Id, "coffee")
        } else if (category === "tea") {
            const menuDataInput = allTea.find((item) => {
                return searchMenuName === item.Name
            })
            handleSelectEditMenu(menuDataInput?.Id, "tea")
        }

    }

    return (
        <>

            <form className='edit-menu-container' onSubmit={() => handleEditMenu(category)}>

                <div className='edit-menu-heading'>
                    <h1>
                        Edit {capitalCategory}
                    </h1>
                    <h2>Select {capitalCategory} to Edit</h2>
                </div>

                <div className='menus-container'>
                    <div className='menus'>
                        <Carousel
                            breakPoints={breakPoints}
                            className={toggleNavbarLeft ? "rec-carousel-wrapper-load" : "rec-carousel-wrapper-unload"}
                        >
                            {category === "coffee"
                                ? allCoffee.map((item, index) => {
                                    return (
                                        <>
                                            <div className="menus-list-container" key={index}>
                                                <div className='menus-list'>
                                                    <h3>
                                                        {item?.Name}
                                                    </h3>
                                                    <img src={item?.Image_url} alt={item?.Name + " Picture"} loading='lazy' onClick={() => {
                                                        return (
                                                            handleSelectEditMenu(item?.Id, "coffee"),
                                                            setEditMenuId(item?.Id)
                                                        )
                                                    }} />
                                                </div>
                                            </div>
                                        </>
                                    )
                                })
                                : category === "tea"
                                    ? allTea.map((item, index) => {
                                        return (
                                            <>
                                                <div className="menus-list-container" key={index}>
                                                    <div className='menus-list' >
                                                        <h3>
                                                            {item?.Name}
                                                        </h3>
                                                        <img src={item?.Image_url} alt={item?.Name + " Picture"} loading='lazy' onClick={() => {
                                                            return (
                                                                handleSelectEditMenu(item?.Id, "tea"),
                                                                setEditMenuId(item?.Id)
                                                            )
                                                        }} />
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })
                                    : ""
                            }
                        </Carousel>
                    </div>
                </div>

                <div className='edit-menu'>

                    <div className='edit-menu-search-input'>
                        <label>Search {category} menu</label>
                        <input
                            type="text"
                            list='menu-name'
                            value={searchMenuName}
                            onChange={(event) => setSearchMenuName(event.target.value)}
                            onBlur={(event) => handleOptionSelect(setSearchMenuName(event.target.value), category)}
                        />

                        <datalist id='menu-name'>
                            {category === "coffee"
                                ? allCoffee.map((item, index) => {
                                    return (
                                        <option value={item?.Name} key={index} />
                                    )
                                })
                                : category === "tea"
                                    ? allTea.map((item, index) => {
                                        return (
                                            <option value={item?.Name} key={index}></option>
                                        )
                                    })
                                    : ""
                            }
                        </datalist>

                        <img
                            src={Search_Icon}
                            alt="Search"
                            className='search-icon'
                            onClick={() => handleSearchInputChange(category)}
                        />
                    </div>

                    <div
                        className='edit-menu-name'
                        onClick={() => handleToggleOpenAddNewMenu("coffeeName")}
                    >
                        <h1>{capitalCategory} Name: {editMenuName} </h1>
                        {isOpenEditMenuName &&
                            <div className='edit-menu-name-input' onClick={(event) => event.stopPropagation()}>
                                <h2>
                                    New {capitalCategory} Name: <input type="text" value={editMenuName} onChange={(event) => setEditMenuName(event?.target?.value)} />
                                </h2>
                            </div>
                        }
                    </div>

                    <div
                        className='edit-menu-price'
                        onClick={() => handleToggleOpenAddNewMenu("coffeePrice")}
                    >
                        <h1>{capitalCategory} Price: {editMenuPrice}฿ </h1>
                        {isOpenEditMenuPrice &&
                            <div className='edit-menu-price-input' onClick={(event) => event.stopPropagation()}>
                                <h2>
                                    New {capitalCategory} Price: <input type="number" value={editMenuPrice} onChange={(event) => setEditMenuPrice(event.target.value)} />
                                </h2>
                            </div>
                        }
                    </div>

                    <div
                        className='edit-menu-description'
                        onClick={() => handleToggleOpenAddNewMenu("coffeeDescription")}
                    >
                        <h1>{capitalCategory} Description: <br /> </h1>
                        <p>{editMenuDescription}</p>
                        {isOpenEditMenuDescription &&
                            <div className='edit-menu-description-input' onClick={(event) => event.stopPropagation()}>
                                <h2>
                                    New {capitalCategory} Description: <br />
                                </h2>
                                <textarea cols="40" rows="10" value={editMenuDescription} onChange={(event) => setEditMenuDescription(event.target.value)}></textarea>
                            </div>
                        }
                    </div>

                    <div
                        className='edit-menu-image-url'
                        onClick={() => handleToggleOpenAddNewMenu("coffeeImageUrl")}
                    >
                        <h1>{capitalCategory} ImageURL: <br /> </h1>
                        <img src={editMenuImageUrl} alt={editMenuName + " Picture"} className={editMenuImageUrl === "" ? "" : "load-img"} />
                        {isOpenEditMenuImageUrl &&
                            <div className='edit-menu-image-url-input' onClick={(event) => event.stopPropagation()}>
                                <h2>
                                    New {capitalCategory} ImageURL: <br />
                                </h2>
                                <textarea cols="40" rows="10" value={editMenuImageUrl} onChange={(event) => setEditMenuImageUrl(event.target.value)}></textarea>
                            </div>
                        }
                    </div>

                </div>

                <div className='submit-edit-menu'>
                    <button type='submit'>
                        <h1>
                            Edit {capitalCategory}
                        </h1>
                    </button>
                </div>

            </form>

        </>
    )
}

export default EditMenu