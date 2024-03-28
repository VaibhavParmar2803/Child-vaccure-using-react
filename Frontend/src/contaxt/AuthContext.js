import { useState, useEffect, useContext, createContext, useRef } from "react";
import { baseURL } from "../lib";
import axios from 'axios'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({
        user: null,
        token: ""
    })

    const toast = useRef(null);

    const logout = () => {
        try {
            const data = localStorage.getItem('auth')
            if (data) {
                localStorage.removeItem("auth")
                setAuth({
                    user: null,
                    token: ""
                })
                setIsLoggedIn(false)
            }
        } catch (error) {
            console.log(error);
        }
    };

    axios.defaults.headers.common["Authorization"] = auth?.token

    const login = async (email, password) => {
        try {
            const { data } = await axios.post(`${baseURL}/user/login`, { email, password });

            if (data.error === false) {
                setIsLoggedIn(true)
                setTimeout(function () {
                    toast.current.show({ severity: 'success', summary: data.user.fullName, detail: data.message, life: 3000 })
                }, 500);
                setAuth({
                    ...auth,
                    user: data.user,
                    token: data.token
                })
                localStorage.setItem('auth', JSON.stringify(data))
            }
        } catch (error) {
            if (error.response) {
                const errors = error.response.data.errors;
                if (errors && Array.isArray(errors) && errors.length > 0) {
                    if (errors.length > 1) {
                        toast.current?.show({ severity: 'error', summary: 'Login', detail: "Please fill all mandatory fields.", life: 3000 })
                    } else {
                        toast.current?.show({ severity: 'error', summary: 'Login', detail: errors[0].msg, life: 3000 })
                    }
                }
            } else {
                toast.current?.show({ severity: 'error', summary: 'Login', detail: 'An error occurred. Please try again later.', life: 3000 })
            }
        }
    };

    const signUp = async (credential) => {
        try {
            const { data } = await axios.post(`${baseURL}/user/register`, credential);

            if (data.error === false) {
                setIsLoggedIn(true)
                setTimeout(function () {
                    toast.current?.show({ severity: 'success', summary: data.data.user.user_name, detail: data.message, life: 3000 })
                }, 500);
                setAuth({
                    ...auth,
                    user: data.data.user,
                    token: data.data.token
                })
                localStorage.setItem('auth', JSON.stringify(data.data))
            } else {
                toast.current?.show({ severity: 'error', summary: 'Sign Up', detail: data.message, life: 3000 })
            }
        } catch (error) {
            if (error.response) {
                const errors = error.response.data.errors;
                if (errors && Array.isArray(errors) && errors.length > 0) {
                    if (errors.length > 1) {
                        toast.current?.show({ severity: 'error', summary: 'Sign Up', detail: "Please fill all mandatory fields.", life: 3000 })
                    } else {
                        toast.current?.show({ severity: 'error', summary: 'Sign Up', detail: errors[0].msg, life: 3000 })
                    }
                }
            } else {
                toast.current?.show({ severity: 'error', summary: 'Sign Up', detail: 'An error occurred. Please try again later.', life: 3000 })
            }
        }
    };

    const forgotPassword = async (credential) => {
        try {
            const { data } = await axios.post(`${baseURL}/user/resetPassword`, credential);

            if (data.error === false) {
                setTimeout(function () {
                    toast.current?.show({ severity: 'success', summary: data.data.user.user_name, detail: data.message, life: 3000 })
                }, 500);
            } else {
                toast.current?.show({ severity: 'error', summary: 'Forgot Password', detail: data.message, life: 3000 })
            }
        } catch (error) {
            if (error.response) {
                const errors = error.response.data.errors;
                if (errors && Array.isArray(errors) && errors.length > 0) {
                    if (errors.length > 1) {
                        toast.current?.show({ severity: 'error', summary: 'Forgot Password', detail: "Please fill all mandatory fields.", life: 3000 })
                    } else {
                        toast.current?.show({ severity: 'error', summary: 'Forgot Password', detail: errors[0].msg, life: 3000 })
                    }
                }
            } else {
                toast.current?.show({ severity: 'error', summary: 'Forgot Password', detail: 'An error occurred. Please try again later.', life: 3000 })
            }
        }
    };

    useEffect(() => {
        const data = localStorage.getItem('auth')
        if (data) {
            const parseData = JSON.parse(data)
            setAuth({
                ...auth,
                user: parseData.user,
                token: parseData.token
            })
        }
    }, [])

    return (
        <AuthContext.Provider value={{ auth, login, logout, signUp, forgotPassword, toast }}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext)

export { useAuth, AuthProvider }