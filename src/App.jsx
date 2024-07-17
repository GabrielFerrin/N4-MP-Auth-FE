import { BrowserRouter, Route, Routes } from 'react-router-dom'
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
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/*' element={<Login />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}
export default App