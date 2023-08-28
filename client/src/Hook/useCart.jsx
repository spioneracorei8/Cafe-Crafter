import axios from "axios";
import { useEffect, useState } from "react";


const useCart = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [cartQuantity, setCartQuantity] = useState()

    const getCartQuantity = async () => {
        try {
            setIsLoading(true)
            setIsError(false)
            const result = await axios.get(`http://localhost:4000/cart/cart-quantity/${localStorage.getItem("id")}`)
            setCartQuantity(result?.data?.data[0]?.Cart_quantity)
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            setIsError(true)
            console.log(error);
        }
    }

    return {
        cartQuantity,
        getCartQuantity
    }
}

export default useCart