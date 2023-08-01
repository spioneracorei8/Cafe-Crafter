import React, { useEffect, useState } from 'react'
import NavigationbarProfile from '../Components/NavigationbarProfile'
import './ProfilePage.css'
import Footer from '../Components/Footer'
import axios from 'axios'
import { useAuth } from '../Context/Authentication'

const ProfilePage = () => {
    const { state } = useAuth()
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [userData, setUserData] = useState({})

    const { Name, Username, Email, Address, Gender, Phone_number } = userData

    const getUserData = async () => {
        try {
            setIsError(false)
            setIsLoading(true)
            const result = await axios.get(`http://localhost:4000/auth-user/${localStorage.getItem("id")}`)
            setUserData(result.data.data)
            setIsLoading(false)
        } catch (error) {
            setIsError(true)
            setIsLoading(false)
            console.log(error);
        }

    }

    console.log(userData);
    console.log(Address);

    useEffect(() => {
        getUserData()
    }, [])

    return (
        <>
            <NavigationbarProfile />
            <section className='profile-container'>
                <div className='edit-profile'>
                    <button

                    >
                        Edit Profile
                    </button>
                </div>
                <div className='profile'>
                    <h1>
                        Whose Name Profile
                    </h1>
                </div>
                <form className='profile-form'>
                    <div className='profile-data-container'>
                        <div className='profile-data name-data'>
                            <label htmlFor="Name">Name</label>
                            <input
                                type="text"
                                value={Name}

                            />
                        </div>
                        <div className='profile-data username-data'>
                            <label htmlFor="Username">Username</label>
                            <input
                                type="text"
                                value={Username}
                            />
                        </div>
                        <div className='profile-data password-data'>

                            <label htmlFor="New Password">New Password</label>
                            <input
                                type="password"
                                placeholder='************'
                            />
                        </div>
                        <div className='profile-data confirm-password-data'>
                            <label htmlFor="Confirm New Password">Confirm New Password</label>
                            <input
                                type="password"
                                placeholder='************'
                            />
                        </div>
                        <div className='profile-data email-data'>
                            <label htmlFor="Email">Email</label>
                            <input
                                type="text"
                                value={Email}
                            />

                        </div>
                        <div className='profile-data phone-number-data'>
                            <label htmlFor="Phone Number">Phone Number</label>
                            <input
                                type="text"
                                value={Phone_number}
                            />
                        </div>
                        <div className='profile-data gender-data'>
                            <label htmlFor="Gender">Gender</label>
                            <select
                                className=''
                                value={Gender}
                                style={{
                                    width: "300px",
                                    height: "40px"
                                }}
                            >
                                <option value="male">male</option>
                                <option value="female">female</option>
                            </select>
                        </div>

                        <div className='profile-data address-data'>
                            <label htmlFor="Address">Address</label>
                            <textarea
                                rows="12"
                                style={{
                                    width: "300px"
                                }}
                                value={Address}
                            >

                            </textarea>
                        </div>
                    </div>
                    <div className='save-edit-changes'>
                        <button>
                            Save Changes
                        </button>
                    </div>
                </form>
            </section>
            <Footer />
        </>
    )
}

export default ProfilePage