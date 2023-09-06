import React, { useEffect, useState } from 'react'
import './LoggedInHomePage.css'
import useMenus from '../../../Hook/useMenus'
import Footer from "../../../Components/Footer/Footer"
import Loading from '../../../Components/Loading/Loading'
import Coffee from '../../../Components/Coffee/Coffee'

const LoggedInHomePage = () => {

    const { getAllCoffee, isLoading, isError } = useMenus()

    useEffect(() => {
        getAllCoffee()
    }, [])

    return (
        <>
            {isLoading &&
                <Loading />
            }

            {isError &&
                <h1>Fetching Data Error...</h1>
            }

            <main className='menu-container'>

                <Coffee />

                <div className='see-more'>
                    <button>
                        <h1>See more</h1>
                    </button>
                </div>
            </main>

            <Footer />
        </>
    )
}

export default LoggedInHomePage