import React from 'react'
import NavigationbarProfile from '../Components/NavigationbarProfile'
import './ProfilePage.css'
const ProfilePage = () => {
    return (
        <>
            <NavigationbarProfile />
            <section className='profile-container'>
                <div className='edit-profile'>
                    <button>Edit Profile</button>
                </div>
                <div className='profile'>
                    <h1>
                        Whose Name , Profile
                    </h1>
                    <div className='profile-data-container'>
                        <div className='profile-data name-data'>

                        </div>
                        <div className='profile-data username-data'>

                        </div>
                        <div className='profile-data password-data'>

                        </div>
                        <div className='profile-data name-data'>

                        </div>
                    </div>


                </div>
            </section>
        </>
    )
}

export default ProfilePage