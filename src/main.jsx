import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import ReactDOM from 'react-dom/client'
import Register from './components/Register'
import Login from './components/Login'
import Profile from './components/Profile'
import { DataProvider } from './context/DataProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <DataProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='*' element={<Login />} />
      </Routes>
    </BrowserRouter>
  </DataProvider>
)
