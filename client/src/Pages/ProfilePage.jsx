import React, { useState } from 'react'
import NavigationbarProfile from '../Components/NavigationbarProfile'
import './ProfilePage.css'
import Footer from '../Components/Footer'
const ProfilePage = () => {
    const [test, setTest] = useState(true)
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

                            />
                        </div>
                        <div className='profile-data username-data'>
                            <label htmlFor="Username">Username</label>
                            <input
                                type="text"

                            />
                        </div>
                        <div className='profile-data password-data'>

                            <label htmlFor="New Password">New Password</label>
                            <input
                                type="password"

                            />
                        </div>
                        <div className='profile-data confirm-password-data'>
                            <label htmlFor="Confirm New Password">Confirm New Password</label>
                            <input
                                type="password"

                            />
                        </div>
                        <div className='profile-data email-data'>
                            <label htmlFor="Email">Email</label>
                            <input
                                type="text" />
                        </div><div className='profile-data address-data'>
                            <label htmlFor="Address">Address</label>
                            <input
                                type="text"

                            />
                        </div>
                        <div className='profile-data gender-data'>
                            <label htmlFor="Gender">Gender</label>
                            <input
                                type="text"

                            />
                        </div>
                        <div className='profile-data phone-number-data'>
                            <label htmlFor="Phone Number">Phone Number</label>
                            <input
                                type="text"

                            />
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