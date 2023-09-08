import React, { useEffect, useState } from 'react'
import "./EditMenu.css"
import useMenus from '../../../Hook/useMenus'
import Carousel from 'react-elastic-carousel';
import axios from 'axios';

const EditMenu = (props) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    const { getAllCoffee, allCoffee, setAllCoffee, getAllTea, allTea, setAllTea } = useMenus()

    const [isOpenEditMenuName, setIsOpenEditMenuName] = useState(false)
    const [isOpenEditMenuPrice, setIsOpenEditMenuPrice] = useState(false)
    const [isOpenEditMenuDescription, setIsOpenEditMenuDescription] = useState(false)
    const [isOpenEditMenuImageUrl, setIsOpenEditMenuImageUrl] = useState(false)

    const menuName = props?.name
    const toggleNavbarLeft = props?.toggleNavbarLeft

    const [editMenuName, setEditMenuName] = useState("")
    const [editMenuPrice, setEditMenuPrice] = useState(0)
    const [editMenuDescription, setEditMenuDescription] = useState("")
    const [editMenuImageUrl, setEditMenuImageUrl] = useState("")

    const breakPoints = [
        {
            width: 1200, itemsToShow: 3,
        }
    ]
    console.log(allCoffee);

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

    if (menuName === "Coffee") {
        useEffect(() => {
            getAllCoffee()
            setAllTea([])
        }, [menuName])
    } else if (menuName === "Tea") {
        useEffect(() => {
            getAllTea()
            setAllCoffee([])
        }, [menuName])
    }

    const handleSelectEditCoffee = async (coffeeId) => {
        try {
            setIsError(false)
            setIsLoading(true)
            const result = await axios.get(`http://localhost:4000/menus/coffee/${coffeeId}`)
            setEditMenuName(result.data.data?.Name)
            setEditMenuPrice(result.data.data?.Price)
            setEditMenuDescription(result.data.data?.Description)
            setEditMenuImageUrl(result.data.data?.Image_url)
            setIsLoading(false)
        } catch (error) {
            setIsError(true);
            setIsLoading(false);
            console.log(error);
        }
    }

    const handleSelectEditTea = async (teaId) => {
        try {
            setIsError(false)
            setIsLoading(true)
            const result = await axios.get(`http://localhost:4000/menus/tea/${teaId}`)
            setEditMenuName(result.data.data?.Name)
            setEditMenuPrice(result.data.data?.Price)
            setEditMenuDescription(result.data.data?.Description)
            setEditMenuImageUrl(result.data.data?.Image_url)
            setIsLoading(false)
        } catch (error) {
            setIsError(true);
            setIsLoading(false);
            console.log(error);
        }
    }

    return (
        <>

            <form className='edit-menu-container' onSubmit={(event) => (event, "coffee")}>

                <div className='edit-menu-heading'>
                    <h1>
                        Edit {menuName}
                    </h1>
                    <h2>Select {menuName} to Edit</h2>
                </div>

                <div className='menus-container'>
                    <div className='menus'>
                        <Carousel
                            breakPoints={breakPoints}
                            className={toggleNavbarLeft ? "rec-carousel-wrapper-load" : "rec-carousel-wrapper-unload"}
                        >
                            {menuName === "Coffee"
                                ? allCoffee.map((item, index) => {
                                    return (
                                        <>
                                            <div className="menus-list-container" key={index}>
                                                <div className='menus-list' onClick={() => handleSelectEditCoffee(item?.Id)}>
                                                    <h3>
                                                        {item?.Name}
                                                    </h3>
                                                    <img src={item?.Image_url} alt={item?.Name + " Picture"} loading='lazy' />
                                                </div>
                                            </div>
                                        </>
                                    )
                                })
                                : menuName === "Tea"
                                    ? allTea.map((item, index) => {
                                        return (
                                            <>
                                                <div className="menus-list-container" key={index}>
                                                    <div className='menus-list' onClick={() => handleSelectEditTea(item?.Id)}>
                                                        <h3>
                                                            {item?.Name}
                                                        </h3>
                                                        <img src={item?.Image_url} alt={item?.Name + " Picture"} loading='lazy' />
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

                    <div
                        className='edit-menu-name'
                        onClick={() => handleToggleOpenAddNewMenu("coffeeName")}
                    >
                        <h1>{menuName} Name: {editMenuName} </h1>
                        {isOpenEditMenuName &&
                            <div className='edit-menu-name-input' onClick={(event) => event.stopPropagation()}>
                                <h2>
                                    New {menuName} Name: <input type="text" value={editMenuName} onChange={(event) => setEditMenuName(event?.target?.value)} />
                                </h2>
                            </div>
                        }
                    </div>

                    <div
                        className='edit-menu-price'
                        onClick={() => handleToggleOpenAddNewMenu("coffeePrice")}
                    >
                        <h1>{menuName} Price: {editMenuPrice}฿ </h1>
                        {isOpenEditMenuPrice &&
                            <div className='edit-menu-price-input' onClick={(event) => event.stopPropagation()}>
                                <h2>
                                    New {menuName} Price: <input type="number" value={editMenuPrice} onChange={(event) => setEditMenuPrice(event.target.value)} />
                                </h2>
                            </div>
                        }
                    </div>

                    <div
                        className='edit-menu-description'
                        onClick={() => handleToggleOpenAddNewMenu("coffeeDescription")}
                    >
                        <h1>{menuName} Description: <br /> </h1>
                        <p>{editMenuDescription}</p>
                        {isOpenEditMenuDescription &&
                            <div className='edit-menu-description-input' onClick={(event) => event.stopPropagation()}>
                                <h2>
                                    New {menuName} Description: <br />
                                </h2>
                                <textarea cols="40" rows="10" value={editMenuDescription} onChange={(event) => setEditMenuDescription(event.target.value)}></textarea>
                            </div>
                        }
                    </div>

                    <div
                        className='edit-menu-image-url'
                        onClick={() => handleToggleOpenAddNewMenu("coffeeImageUrl")}
                    >
                        <h1>{menuName} ImageURL: <br /> </h1>
                        <img src={editMenuImageUrl} alt={editMenuName + " Picture"} className={editMenuImageUrl === "" ? "" : "load-img"} />
                        {isOpenEditMenuImageUrl &&
                            <div className='edit-menu-image-url-input' onClick={(event) => event.stopPropagation()}>
                                <h2>
                                    New {menuName} ImageURL: <br />
                                </h2>
                                <textarea cols="40" rows="10" value={editMenuImageUrl} onChange={(event) => setEditMenuImageUrl(event.target.value)}></textarea>
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