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

    const [editMenuName, setEditMenuName] = useState("")
    const [editMenuPrice, setEditMenuPrice] = useState(0)
    const [editMenuDescription, setEditMenuDescription] = useState("")
    const [editMenuImageUrl, setEditMenuImageUrl] = useState("")

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

    const GetCoffeeId = async (coffeeId) => {
        try {
            setIsError(false)
            setIsLoading(true)
            const result = await axios.get(`http://localhost:4000/menus/coffee/${coffeeId}`)
            setEditMenuName(result.data.data?.Name)
            setEditMenuPrice(result.data.data?.Price)
            setEditMenuDescription(result.data.data?.Description)
            setEditMenuImageUrl(result.data.data?.Image_url)
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
        GetCoffeeId,
        getAllTea,
        allCoffee,
        setAllCoffee,
        allTea,
        setAllTea,
        InsertCoffee,
        InsertTea,
        editMenuName,
        editMenuPrice,
        editMenuDescription,
        editMenuImageUrl,

    }
}

export default useMenus