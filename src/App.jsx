import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import Register from './components/Register'
import Login from './components/Login'
import Profile from './components/Profile'
import { DataContext } from './context/DataProvider'
import { useContext } from 'react'

const App = () => {
  const { theme } = useContext(DataContext)

  return (
    <div className={theme}>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='*' element={<Login />} />
            </Routes>
          </BrowserRouter>
    </div>
  )
}
export default App