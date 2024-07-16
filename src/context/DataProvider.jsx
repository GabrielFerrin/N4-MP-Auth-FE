import { createContext, useEffect, useState } from "react";
import axios from "axios";
import verifyToken from "../helpers/verifyToken";

export const DataContext = createContext()

export const DataProvider = ({ children }) => {
  const [isValidToken, setIsValidToken] = useState(false)
  const [userData, setUserData] = useState({})
  const [showMenu, setShowMenu] = useState(false)
  const [theme, setTheme] = useState('light')
  const [windowResized, setWindowResized] = useState(0)
  const dataApi = axios.create({ baseURL: import.meta.env.VITE_API_KEY })

  // API
  const registerAPI = async (data) => {
    try {
      const response = await dataApi.post('register', data)
      return response.data
    } catch (error) {
      const message = 'Hay problemas de red. Intenta más tarde.'
      if (error.code === 'ERR_NETWORK')
        return { success: false, message }
      return error.response.data
    }
  }

  const loginAPI = async (data) => {
    try {
      const response = await dataApi.post('login', data)
      return response.data
    } catch (error) {
      const message = 'Hay problemas de red. Intenta más tarde.'
      if (error.code === 'ERR_NETWORK')
        return { success: false, message }
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

  const getImageAPI = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await dataApi.get('get-image', {
        headers: { Authorization: token },
        responseType: 'blob'
      })
      const src = URL.createObjectURL(response.data)
      return { success: true, src }
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

  const uploadImageAPI = async (data) => {
    try {
      console.log('uploadImageAPI', data)
      const token = localStorage.getItem('token')
      const response = await dataApi.post('upload-image', data, {
        headers: { Authorization: token }
      })
      return response.data
    } catch (error) {
      return error.response.data
    }
  }

  // verify token / handle hide menu
  useEffect(() => {
    // token
    const verify = async () => {
      await verifyToken() ? setIsValidToken(true) :
        setIsValidToken(false)
    }
    verify()
    // hide menu
    const handleMenu = (event) => {
      if (!hasParent(event.target))
        setShowMenu(false)
    }
    const handleKeyDown = (event) => {
      if (event.key === 'Escape')
        setShowMenu(false)
    }

    let resizeTimer = null
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        setWindowResized(window.innerWidth)
      }, 200)
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('click', handleMenu)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('click', handleMenu)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const hasParent = (target) => {
    if (!target) return false
    while (target) {
      if (target.className === 'menu-cmp' || target.className === 'menu-items-wrapper') return true
      else target = target.parentNode
    }
    return false
  }

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
      updateUserAPI, theme, setTheme, showMenu, setShowMenu, getImageAPI,
      uploadImageAPI, windowResized
    }}>
      {children}
    </DataContext.Provider>
  )
}
