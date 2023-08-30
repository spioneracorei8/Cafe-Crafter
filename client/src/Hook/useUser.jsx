import React, { useEffect, useState } from 'react'
import axios from 'axios'

const useUser = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
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

    useEffect(() => {
        getUserData()
    }, [])

    const getUserData = async () => {
        try {
            setIsError(false)
            setIsLoading(true)
            const result = await axios.get(`http://localhost:4000/auth-user/${localStorage.getItem("id")}`)
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

    const editUserData = async (data, userId) => {
        console.log(data);
        console.log(userId);
        try {
            setIsError(false)
            setIsLoading(true)
            await axios.put(`http://localhost:4000/auth-user/${userId}`, data)
            setIsLoading(false)
            window.location.replace("/Profile")
        } catch (error) {
            setIsLoading(false)
            setIsError(true)
            console.log(error);
        }
    }

    return {
        isLoading,
        isError,
        getUserData,
        id,
        setId,
        name,
        setName,
        username,
        setUsername,
        password,
        setPassword,
        gender,
        setGender,
        email,
        setEmail,
        address,
        setAddress,
        country,
        setCountry,
        city,
        setCity,
        phone_Number,
        editUserData

    }

}

export default useUser