import React, { useEffect, useState } from 'react'
import "./DeleteMenu.css"
import Carousel from 'react-elastic-carousel';
import useMenus from '../../../Hook/useMenus'
import axios from 'axios';

const DeleteMenu = ({ category, toggleNavbarLeft }) => {

    const { getAllCoffee, allCoffee, setAllCoffee, getAllTea, allTea, setAllTea, getAllCake, allCake, setAllCake, DeleteMenu } = useMenus()

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
    } else if (category === "cake") {
        useEffect(() => {
            getAllCake()
            setAllCake([])
        }, [category])
    }

    const [deleteMenuId, setDeleteMenuId] = useState(0)
    const [deleteMenuName, setDeleteMenuName] = useState("")
    const [deleteMenuImageUrl, setDeleteMenuImageUrl] = useState("")
    const [isDeletePopUp, setIsDeletePopUp] = useState(false)

    const breakPoints = [
        {
            width: 1200, itemsToShow: 3,
        }
    ]

    const handleSelectDeleteMenu = async (menuId, category) => {
        try {
            const result = await axios.get(`http://localhost:4000/menus/${category}/${menuId}`)
            setDeleteMenuName(result.data.data?.Name)
            setDeleteMenuImageUrl(result.data.data?.Image_url)
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmitDeleteMenu = (event) => {
        event.preventDefault()
        setIsDeletePopUp(true)
    }

    const handleConfirmDeleteMenu = (event, catrgory, menuId) => {
        if (category === "coffee") {
            DeleteMenu(catrgory, menuId)
        } else if (category === "tea") {
            DeleteMenu(catrgory, menuId)
        } else if (category === "cake") {
            DeleteMenu(catrgory, menuId)
        }
    }

    const handleClearClosePopUp = (event) => {
        event.preventDefault()
        setIsDeletePopUp(false)
        setDeleteMenuId(0)
        setDeleteMenuName("")
        setDeleteMenuImageUrl("")
    }

    return (

        <>

            {isDeletePopUp &&
                <div className='menu-popup-container'
                    onClick={(event) => handleClearClosePopUp(event)}>
                    <div className='menu-popup' onClick={(event) => event.stopPropagation()}>
                        <div className="delete-popup-content">
                            <h1>{deleteMenuName}</h1>
                            <img src={deleteMenuImageUrl} alt={deleteMenuName} />
                        </div>
                        <div className='delete-popup-button'>
                            <button
                                onClick={(event) => handleConfirmDeleteMenu(event, category, deleteMenuId)}
                            >
                                Confirm Delete {deleteMenuName}
                            </button>
                            <button
                                onClick={(event) => handleClearClosePopUp(event)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div >}


            <form className='delete-menu-container'
                onSubmit={(event) => handleSubmitDeleteMenu(event)}
            >
                <div className='delete-menu-heading'>
                    <h1>
                        Delete {category}
                    </h1>
                    <h2>Select {category} to Delete</h2>
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
                                                            handleSelectDeleteMenu(item?.Id, "coffee"),
                                                            setDeleteMenuId(item?.Id)
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
                                                                handleSelectDeleteMenu(item?.Id, "tea"),
                                                                setDeleteMenuId(item?.Id)
                                                            )
                                                        }} />
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })
                                    : category === "cake"
                                        ? allCake.map((item, index) => {
                                            return (
                                                <>
                                                    <div className="menus-list-container" key={index}>
                                                        <div className='menus-list' >
                                                            <h3>
                                                                {item?.Name}
                                                            </h3>
                                                            <img src={item?.Image_url} alt={item?.Name + " Picture"} loading='lazy' onClick={() => {
                                                                return (
                                                                    handleSelectDeleteMenu(item?.Id, "cake"),
                                                                    setDeleteMenuId(item?.Id)
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

                <div className='delete-clear-menu'>
                    <button
                        className={deleteMenuName === "" ? "clear-menu-unload" : "clear-menu-load"}
                        onClick={(event) => handleClearClosePopUp(event)}
                    >
                        Clear {deleteMenuName}
                    </button>
                </div>

                <div className='delete-menu-show'>
                    <h1>Delete {deleteMenuName === "" ? "?" : deleteMenuName}</h1>
                    <img
                        src={deleteMenuImageUrl}
                        alt={deleteMenuImageUrl === "" ? "?" : deleteMenuName}
                        className={deleteMenuName === "" ? "delete-menu-show-unload" : "delete-menu-show-load"}
                    />
                </div>

                <div className='submit-delete-menu'>
                    <button
                        type='submit'
                        className={deleteMenuName === "" ? "submit-delete-menu-button-unload" : "submit-delete-menu-button-load"}
                        disabled={deleteMenuName === ""}
                    >
                        Delete {deleteMenuName}
                    </button>
                </div>

            </form>
        </>
    )
}

export default DeleteMenu