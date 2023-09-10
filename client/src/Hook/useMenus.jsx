import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import EditMenu from '../Pages/Admin/EditMenu/EditMenu'

const useMenus = () => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [suggestCoffee, setSuggestCoffee] = useState([])
    const [allCoffee, setAllCoffee] = useState([])
    const [allTea, setAllTea] = useState([])

    const getSuggestCoffee = async () => {
        try {
            setIsError(false);
            setIsLoading(true);
            const result = await axios.get(`http://localhost:4000/suggest-coffee/`)
            setSuggestCoffee(result.data.data)
            setIsLoading(false)
        } catch (error) {
            setIsError(true);
            setIsLoading(false);
            console.log(error);
        }
    }

    const getAllCoffee = async () => {
        try {
            setIsError(false)
            setIsLoading(true)
            const result = await axios.get(`http://localhost:4000/menus/coffee`)
            setAllCoffee(result.data.data)
            setIsLoading(false)
        } catch (error) {
            setIsError(true);
            setIsLoading(false);
            console.log(error);
        }
    }

    const getAllTea = async () => {
        try {
            setIsError(false)
            setIsLoading(true)
            const result = await axios.get(`http://localhost:4000/menus/tea`)
            setAllTea(result.data.data)
            setIsLoading(false)
        } catch (error) {
            setIsError(true);
            setIsLoading(false);
            console.log(error);
        }
    }

    const UpdateCoffee = async (data, coffeeId) => {
        try {
            setIsError(false)
            setIsLoading(true)
            await axios.put(`http://localhost:4000/menus/coffee/${coffeeId}`, data)
            setIsLoading(false)
        } catch (error) {
            setIsError(true);
            setIsLoading(false);
            console.log(error);
        }
    }

    const UpdateTea = async (data, teaId) => {
        try {
            setIsError(false)
            setIsLoading(true)
            await axios.put(`http://localhost:4000/menus/tea/${teaId}`, data)
            setIsLoading(false)
        } catch (error) {
            setIsError(true);
            setIsLoading(false);
            console.log(error);
        }
    }

    const InsertCoffee = async (data) => {
        try {
            setIsError(false)
            setIsLoading(true)
            await axios.post(`http://localhost:4000/menus/coffee`, data)
            setIsLoading(false)
            window.location.replace("/")
        } catch (error) {
            setIsError(true);
            setIsLoading(false);
            console.log(error);
        }
    }


    const InsertTea = async (data) => {
        try {
            setIsError(false)
            setIsLoading(true)
            await axios.post(`http://localhost:4000/menus/tea`, data)
            setIsLoading(false)
            window.location.replace("/")
        } catch (error) {
            setIsError(true);
            setIsLoading(false);
            console.log(error);
        }
    }

    const DeleteMenu = async (category, menuId) => {
        try {
            setIsError(false)
            setIsLoading(true)
            await axios.delete(`http://localhost:4000/menus/${category}/${menuId}`)
            setIsLoading(false)
        } catch (error) {
            setIsError(true);
            setIsLoading(false);
            console.log(error);
        }
    }

    useEffect(() => {
        getSuggestCoffee()
    }, [])

    return {
        isLoading,
        setIsLoading,
        isError,
        setIsError,
        suggestCoffee,
        getAllCoffee,
        getAllTea,
        allCoffee,
        setAllCoffee,
        allTea,
        setAllTea,
        InsertCoffee,
        InsertTea,
        UpdateCoffee,
        UpdateTea,
        DeleteMenu,

    }
}

export default useMenus