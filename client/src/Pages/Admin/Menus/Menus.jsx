import React, { useEffect } from 'react'
import "./Menus.css"
import Carousel from 'react-elastic-carousel';
import useMenus from '../../../Hook/useMenus';

const Menus = (props) => {
    const menuName = props?.menuName
    const toggleNavbarLeft = props?.toggleNavbarLeft
    const { getAllCoffee, allCoffee, setAllCoffee, getAllTea, allTea, setAllTea } = useMenus()

    const breakPoints = [
        {
            width: 550, itemsToShow: 1,
            width: 768, itemsToShow: 2,
            width: 1200, itemsToShow: 3,
        }
    ]

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

    return (

        <>
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
                                            <div className='menus-list'>
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
                                            <div className='menus-list' key={index}>
                                                <h3>
                                                    {item?.Name}
                                                </h3>
                                                <img src={item?.Image_url} alt={item?.Name + " Picture"} loading='lazy' />
                                            </div>
                                        </>
                                    )
                                })
                                : ""
                        }
                    </Carousel>
                </div>
            </div>
        </>

    )
}

export default Menus