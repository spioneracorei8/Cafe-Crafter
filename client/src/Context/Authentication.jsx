import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const AuthContext = React.createContext()

const AuthProvider = (props) => {
    const [state, setState] = useState({
        loading: null,
        error: null,
        user: null,
    })

    const navigate = useNavigate()


    const register = async (data) => {
        await axios.post(`http://localhost:4000/auth-user/register`, data)
        navigate("/Login")
    }

    const isAuthenticated = Boolean(localStorage.getItem("token"))

    return (
        <AuthContext.Provider
            value={{ state, register, isAuthenticated }}
        >
            {props.children}
        </AuthContext.Provider>
    )

}

const useAuth = () => React.useContext(AuthContext)

export { AuthProvider, useAuth }