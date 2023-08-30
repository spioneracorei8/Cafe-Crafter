import React, { useEffect, useState } from 'react'
import NavigationbarProfile from '../../../Components/Navigationbar/NavigationbarProfile'
import './ProfilePage.css'
import Footer from '../../../Components/Footer/Footer'
import Loading from '../../../Components/Loading/Loading'
import CountryStateData from "../../../data/CountryStateData.json"
import useUser from '../../../Hook/useUser'

const ProfilePage = () => {
    const { isLoading, isError, id, name, setName, username, setUsername, password, setPassword, gender, setGender, email, setEmail, address, setAddress, country, setCountry, city, setCity, phone_Number, setPhone_Number, editUserData } = useUser()
    const [isEdit, setIsEdit] = useState(false)

    const countries = CountryStateData
    const cities = CountryStateData.flatMap(country => country.states)

    const handleEditProfile = (event) => {
        event.preventDefault()
        setIsEdit(true)
    }

    const handleEditUserData = async (event, userId) => {
        event.preventDefault()
        const data = {
            name,
            username,
            password,
            gender,
            email,
            address,
            phone_Number,
            country,
            city
        }
        editUserData(data, userId)
    }

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
                        {name}, Profile
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
                                    value={name}
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
                                    value={username}
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
                                    value={email}
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
                                    value={phone_Number}
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
                                    value={gender}
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
                                    value={address}
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