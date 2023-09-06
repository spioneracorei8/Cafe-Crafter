import React, { useEffect } from 'react'
import "./Menus.css"
import Carousel from 'react-elastic-carousel';
import useMenus from '../../../Hook/useMenus';

const Menus = (props) => {
    const menuName = props?.menuName
    const { getAllCoffee, allCoffee, setAllCoffee, getAllTea, allTea, setAllTea } = useMenus()

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
    console.log(allTea);
    console.log(allCoffee);
    return (

        <>
            <div className='menus-container'>
                <div className='menus'>
                    <Carousel>
                        {menuName === "Coffee"
                            ? allCoffee.map((item, index) => {
                                return (
                                    <>
                                        <div className='menus-list' key={index}>
                                            <h3>
                                                {item?.Name}
                                            </h3>
                                            <img src={item?.Image_url} alt="2" />
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
                                                <img src={item?.Image_url} alt="" />
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