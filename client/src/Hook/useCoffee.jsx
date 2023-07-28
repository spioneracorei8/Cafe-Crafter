import axios from 'axios'
import { useEffect, useState } from 'react'


const useCoffee = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [suggestCoffee, setSuggestCoffee] = useState([])
    const [allCoffee, setAllCoffee] = useState([])


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
            const result = await axios.get(`http://localhost:4000/coffee/`)
            setAllCoffee(result.data.data)
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
        allCoffee,
    }
}

export default useCoffee