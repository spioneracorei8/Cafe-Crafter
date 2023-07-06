import axios from 'axios'
import { useEffect, useState } from 'react'


const useCoffee = () => {
    const [coffee, setCoffee] = useState([])


    useEffect(() => {
        getAllCoffee()
    })


    const getAllCoffee = async () => {
        try {
            const result = await axios.get(`http://localhost:4000/coffee-api/coffee`)
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    }
    return {
        getAllCoffee,
    }
}

export default useCoffee