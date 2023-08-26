import React, { useEffect, useState } from 'react'
import NavigationbarProfile from '../Components/NavigationbarProfile'
import './ProfilePage.css'
import Footer from '../Components/Footer'
import axios from 'axios'
import Loading from '../Components/Loading'
import CountryStateData from "../data/CountryStateData.json"

const ProfilePage = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [userData, setUserData] = useState({})
    const { Name, Username, Email, Phone_number, Gender, Address, Country, City } = userData
    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [gender, setGender] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [country, setCountry] = useState("")
    const [city, setCity] = useState("")
    const [phone_Number, setPhone_Number] = useState("")
    console.log(userData);
    const countries = CountryStateData
    const cities = CountryStateData.flatMap(country => country.states)

    const getUserData = async () => {
        try {
            setIsError(false)
            setIsLoading(true)
            const result = await axios.get(`http://localhost:4000/auth-user/${localStorage.getItem("id")}`)
            setUserData(result.data.data)
            setId(result.data.data.Id)
            setName(result.data.data.Name)
            setUsername(result.data.data.Username)
            setGender(result.data.data.Gender)
            setEmail(result.data.data.Email)
            setAddress(result.data.data.Address)
            setPhone_Number(result.data.data.Phone_number)
            setCountry(result.data.data.Country)
            setCity(result.data.data.City)
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

    const handleEditUserData = async (event, id) => {
        event.preventDefault()
        try {
            setIsError(false)
            setIsLoading(true)
            const data = {
                name,
                username,
                password,
                gender,
                email,
                address,
                phone_Number
            }
            await axios.put(`http://localhost:4000/auth-user/${id}`, data)
            setIsLoading(false)
            window.location.replace("/Profile")

        } catch (error) {
            setIsLoading(false)
            setIsError(true)
            console.log(error);
        }
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
                                    onChange={(event) => setPassword(event.target.value)}

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

                        <div className='profile-data country-data'>
                            <label htmlFor="country">country</label>
                            {isEdit
                                ? <select className='form-select'
                                    value={country}
                                    onChange={(event) => setCountry(event.target.value)}
                                    style={{
                                        width: "300px",
                                        height: "40px"
                                    }}
                                >
                                    <option value="">Select your country</option>
                                    {countries
                                        .sort((a, b) => {
                                            return a > b ? 1 : -1;
                                        })
                                        .map((country, index) => (
                                            <option value={country.country_name} key={index}>
                                                {country.country_name}
                                            </option>
                                        ))}
                                </select>
                                : <select className='form-select'
                                    disabled
                                    value={country}
                                    onChange={(event) => setCountry(event.target.value)}
                                    style={{
                                        width: "300px",
                                        height: "40px"
                                    }}
                                >
                                    <option value="">Select your country</option>
                                    {countries
                                        .sort((a, b) => {
                                            return a > b ? 1 : -1;
                                        })
                                        .map((country, index) => (
                                            <option value={country.country_name} key={index}>
                                                {country.country_name}
                                            </option>
                                        ))}
                                </select>
                            }
                        </div>

                        <div className='profile-data gender-data'>
                            <label htmlFor="city">city</label>
                            {isEdit
                                ? <select className='form-select'
                                    value={city}
                                    onChange={(event) => setCity(event.target.value)}
                                    style={{
                                        width: "300px",
                                        height: "40px"
                                    }}
                                >

                                    <option value="">Select your city</option>
                                    {cities
                                        .filter((city) => {
                                            const filterCountries = CountryStateData.filter((country) => {
                                                return country.country_id === city.country_id;
                                            });
                                            return filterCountries.some(
                                                (filterCountry) => filterCountry.country_name === country
                                            );
                                        })
                                        .sort((a, b) => {
                                            return a > b ? -1 : 1;
                                        })
                                        .map((city, index) => {
                                            return (
                                                <option value={city.state_name} key={index}>
                                                    {city.state_name}
                                                </option>
                                            );
                                        })}
                                </select>
                                : <select className='form-select'
                                    disabled
                                    value={city}
                                    onChange={(event) => setCity(event.target.value)}
                                    style={{
                                        width: "300px",
                                        height: "40px"
                                    }}
                                >

                                    <option value="">Select your city</option>
                                    {cities
                                        .filter((city) => {
                                            const filterCountries = CountryStateData.filter((country) => {
                                                return country.country_id === city.country_id;
                                            });
                                            return filterCountries.some(
                                                (filterCountry) => filterCountry.country_name === country
                                            );
                                        })
                                        .sort((a, b) => {
                                            return a > b ? -1 : 1;
                                        })
                                        .map((city, index) => {
                                            return (
                                                <option value={city.state_name} key={index}>
                                                    {city.state_name}
                                                </option>
                                            );
                                        })}
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
                        {isEdit
                            ? <button
                                className='save-changes'
                                onClick={(event) => handleEditUserData(event, id)}
                            >
                                Save Changes
                            </button>
                            : <button
                                className='unsave-changes'
                                disabled
                            >
                                Save Changes
                            </button>
                        }
                    </div>
                </form>
            </section>
            <Footer />
        </>
    )
}

export default ProfilePage