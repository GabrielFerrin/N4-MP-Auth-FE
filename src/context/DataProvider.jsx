import { createContext, useEffect, useState } from "react";
import axios from "axios";
import verifyToken from "../helpers/verifyToken";

export const DataContext = createContext()

export const DataProvider = ({ children }) => {
  const [isValidToken, setIsValidToken] = useState(false)
  const [userData, setUserData] = useState({})
  const [showMenu, setShowMenu] = useState(false)
  const [theme, setTheme] = useState('light')
  const dataApi = axios.create({ baseURL: import.meta.env.VITE_API_KEY })

  // API
  const registerAPI = async (data) => {
    try {
      const response = await dataApi.post('register', data)
      return response.data
    } catch (error) {
      return error.response.data
    }
  }

  const loginAPI = async (data) => {
    try {
      const response = await dataApi.post('login', data)
      return response.data
    } catch (error) {
      return error.response.data
    }
  }

  const getUserAPI = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await dataApi.get('get-user', {
        headers: { Authorization: token }
      })
      return response.data
    } catch (error) {
      return error.response.data
    }
  }

  const updateUserAPI = async (data) => {
    try {
      const token = localStorage.getItem('token')
      const response = await dataApi.put('update', data, {
        headers: { Authorization: token }
      })
      return response.data
    } catch (error) {
      return error.response.data
    }
  }

  // verify token
  useEffect(() => {
    const verify = async () => {
      await verifyToken() ? setIsValidToken(true) :
        setIsValidToken(false)
    }
    verify()
  }, [])

  // validators
  const isMailValid = (email) => {
    const pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    return pattern.test(email)
  }
  const isPassValid = (password) => {
    const pattern = /^(?=.*[A-Z]).{8,}$/
    return pattern.test(password)
  }

  return (
    <DataContext.Provider value={{
      registerAPI, isMailValid, isPassValid, isValidToken,
      setIsValidToken, userData, setUserData, loginAPI, getUserAPI,
      updateUserAPI, theme, setTheme, showMenu, setShowMenu
    }}>
      {children}
    </DataContext.Provider>
  )
}
