import axios from 'axios'
import { useEffect, useState } from 'react'


const useCoffee = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [suggestionsCoffee, setSuggestionsCoffee] = useState([])
    const getAllSuggestionsCoffee = async () => {
        try {
            setIsError(false);
            setIsLoading(true);
            const result = await axios.get(`http://localhost:4000/suggestions-coffee/`)
            setSuggestionsCoffee(result.data.data)
            setIsLoading(false)
        } catch (error) {
            setIsError(true);
            setIsLoading(false);
            console.log(error);
        }
    }
    return {
        isLoading,
        isError,
        getAllSuggestionsCoffee,
        suggestionsCoffee
    }
}

export default useCoffee