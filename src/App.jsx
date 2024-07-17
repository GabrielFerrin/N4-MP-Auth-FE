import { Route, Routes, Navigate } from 'react-router-dom'
import './index.css'
import Register from './components/Register'
import Login from './components/Login'
import Profile from './components/Profile'
import { DataContext } from './context/DataProvider'
import { useContext, useEffect } from 'react'
import getSystemTheme from './helpers/theme'

const App = () => {
  const { theme, setTheme } = useContext(DataContext)

  useEffect(() => {
    const systemTheme = getSystemTheme()
    systemTheme === 'dark' ? setTheme('dark') : setTheme('light')
  }, [])

  return (
    <div className={`app ${theme}`}>
      <div className='app-body'>
        <Routes>
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  )
}
export default App