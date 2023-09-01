import React, { useState } from 'react'
import "./NavbarManageMenu.css"

const NavbarManageMenu = () => {
    const [isManageCoffee, setIsManageCoffee] = useState(false)
    const [isManageTea, setIsManageTea] = useState(false)
    const [isManageCake, setIsManageCake] = useState(false)

    const handleToggleManageMenu = (category) => {
        if (category === "coffee") {
            setIsManageCoffee(!isManageCoffee)
            setIsManageTea(false)
            setIsManageCake(false)
        } else if (category === "tea") {
            setIsManageTea(!isManageTea)
            setIsManageCoffee(false)
            setIsManageCake(false)
        } else if (category === "cake") {
            setIsManageCake(!isManageCake)
            setIsManageCoffee(false)
            setIsManageTea(false)
        }
    }
    return (

        <>
            <nav className='navbar-left-admin'>
                <div className='manage-menu-container'>
                    <div className='manage-menu'>
                        <button
                            onClick={() => handleToggleManageMenu("coffee")}
                        >
                            <h1>
                                Manage Coffeee
                            </h1>
                        </button>
                        {isManageCoffee &&
                            <>
                                <li>Add new coffee</li>
                                <li>Edit coffee</li>
                            </>
                        }

                        <button
                            onClick={() => handleToggleManageMenu("tea")}
                        >
                            <h1>
                                Manage Tea
                            </h1>
                        </button>
                        {isManageTea &&
                            <>
                                <li>Add new Tea</li>
                                <li>Edit Tea</li>
                            </>
                        }

                        <button
                            onClick={() => handleToggleManageMenu("cake")}
                        >
                            <h1>
                                Manage Cake
                            </h1>
                        </button>
                        {isManageCake &&
                            <>
                                <li>Add new Cake</li>
                                <li>Edit new Cake</li>
                            </>
                        }
                    </div>
                </div>


            </nav>

        </>
    )
}

export default NavbarManageMenu