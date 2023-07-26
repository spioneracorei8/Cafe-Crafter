import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import jwtDecode from "jwt-decode";

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

    const login = async (data) => {
        const result = await axios.post(`http://localhost:4000/auth-user/login`, data)
        const token = result.data.token
        localStorage.setItem("token", token)

        const userDataFromToken = jwtDecode(token)
        setState({ ...state, user: userDataFromToken })

        navigate("/")
    }

    const logout = async () => {
        localStorage.removeItem("token")
        setState({ ...state, user: null })
        navigate("/")
    }

    const isAuthenticated = Boolean(localStorage.getItem("token"))

    return (
        <AuthContext.Provider
            value={{ state, register, login, logout, isAuthenticated }}
        >
            {props.children}
        </AuthContext.Provider>
    )

}

const useAuth = () => React.useContext(AuthContext)

export { AuthProvider, useAuth }