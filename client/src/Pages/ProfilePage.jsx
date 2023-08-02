import React, { useEffect, useState } from 'react'
import NavigationbarProfile from '../Components/NavigationbarProfile'
import './ProfilePage.css'
import Footer from '../Components/Footer'
import axios from 'axios'
import Loading from '../Components/Loading'

const ProfilePage = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [userData, setUserData] = useState({})
    const { Name, Username, Email, Phone_number, Gender, Address } = userData
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [phone_Number, setPhone_Number] = useState("")
    const [gender, setGender] = useState("")
    const [address, setAddress] = useState("")

    console.log(name);


    const getUserData = async () => {
        try {
            setIsError(false)
            setIsLoading(true)
            const result = await axios.get(`http://localhost:4000/auth-user/${localStorage.getItem("id")}`)
            setUserData(result.data.data)
            setName(result.data.data.Name)
            setUsername(result.data.data.Username)
            setEmail(result.data.data.Email)
            setPhone_Number(result.data.data.Phone_number)
            setGender(result.data.data.Gender)
            setAddress(result.data.data.Address)
            setIsLoading(false)
        } catch (error) {
            setIsError(true)
            setIsLoading(false)
            console.log(error);
        }
    }

    const handleEditProfile = (event) => {
        event.preventDefault()
        setIsEdit(true)
    }


    useEffect(() => {
        getUserData()
    }, [])



    return (
        <>

            {isLoading &&
                <Loading />
            }
            {isError &&
                <h1>Fetching Data Error...</h1>
            }
            <NavigationbarProfile />
            <section className='profile-container'>
                <div className='edit-profile'>
                    <button
                        onClick={(event) => handleEditProfile(event)}
                    >
                        Edit Profile
                    </button>
                </div>
                <div className='profile'>
                    <h1>
                        {Name}, Profile
                    </h1>
                </div>
                <form className='profile-form'>
                    <div className='profile-data-container'>
                        <div className='profile-data name-data'>
                            <label htmlFor="Name">Name</label>
                            {isEdit
                                ? <input
                                    type="text"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}

                                />
                                : <input
                                    type="text"
                                    value={Name}
                                    disabled
                                />
                            }
                        </div>
                        <div className='profile-data username-data'>
                            <label htmlFor="Username">Username</label>
                            {isEdit
                                ? <input
                                    type="text"
                                    value={username}
                                    onChange={(event) => setUsername(event.target.value)}
                                />
                                : <input
                                    type="text"
                                    value={Username}
                                    disabled
                                />
                            }
                        </div>
                        <div className='profile-data password-data'>

                            <label htmlFor="New Password">New Password</label>
                            {isEdit
                                ? <input
                                    type="password"
                                    placeholder='************'

                                />
                                : <input
                                    type="password"
                                    placeholder='************'
                                    disabled
                                />
                            }
                        </div>
                        <div className='profile-data confirm-password-data'>
                            <label htmlFor="Confirm New Password">Confirm New Password</label>
                            {isEdit
                                ? <input
                                    type="password"
                                    placeholder='************'
                                />
                                : <input
                                    type="password"
                                    placeholder='************'
                                    disabled
                                />
                            }
                        </div>
                        <div className='profile-data email-data'>
                            <label htmlFor="Email">Email</label>
                            {isEdit
                                ? <input
                                    type="text"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                                : <input
                                    type="text"
                                    value={Email}
                                    disabled
                                />
                            }

                        </div>
                        <div className='profile-data phone-number-data'>
                            <label htmlFor="Phone Number">Phone Number</label>
                            {isEdit
                                ? <input
                                    type="text"
                                    value={phone_Number}
                                    onChange={(event) => setPhone_Number(event.target.value)}
                                />
                                : <input
                                    type="text"
                                    value={Phone_number}
                                    disabled
                                />
                            }
                        </div>
                        <div className='profile-data gender-data'>
                            <label htmlFor="Gender">Gender</label>
                            {isEdit
                                ? <select
                                    value={gender}
                                    onChange={(event) => setGender(event.target.value)}
                                    style={{
                                        width: "300px",
                                        height: "40px"
                                    }}
                                >
                                    <option value="male">male</option>
                                    <option value="female">female</option>
                                </select>
                                : <select
                                    value={Gender}
                                    disabled
                                    style={{
                                        width: "300px",
                                        height: "40px"
                                    }}
                                >
                                    <option value="male">male</option>
                                    <option value="female">female</option>
                                </select>
                            }
                        </div>

                        <div className='profile-data address-data'>
                            <label htmlFor="Address">Address</label>
                            {isEdit
                                ? <textarea
                                    rows="12"
                                    style={{
                                        width: "300px"
                                    }}
                                    value={address}
                                    onChange={(event) => setAddress(event.target.value)}
                                >

                                </textarea>
                                : <textarea
                                    rows="12"
                                    style={{
                                        width: "300px"
                                    }}
                                    value={Address}
                                    disabled
                                >

                                </textarea>
                            }
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