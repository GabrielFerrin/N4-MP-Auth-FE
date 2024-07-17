import { useContext } from 'react'
import { DataContext } from '../context/DataProvider'
import Chat from './icons/Chat'
import DeployMenu from './icons/DeployMenu'
import Logout from './icons/Logout'
import Profile from './icons/Profile'
import './Menu.css'
import { useNavigate } from 'react-router-dom'
import ThemeSwitch from './ThemeSwitch'

const Menu = ({ username, src }) => {
  const { setIsValidToken, setUserData, showMenu, setShowMenu } =
    useContext(DataContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    setIsValidToken(false)
    setUserData({})
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className="menu-cmp">
      <div className="theme-switch">
        <ThemeSwitch />
      </div>
      <div className="menu-header" onClick={() => setShowMenu(!showMenu)}>
        <img src={src} alt="Profile picture"
          height={32} width={32} />
        <span>{username}</span>
        <DeployMenu />
      </div>
      {showMenu && <div className="menu-items-wrapper">
        <button><Profile />Mi Perfil</button>
        <button><Chat />Chat</button>
        <div className="line"></div>
        <button onClick={handleLogout}><Logout />Cerrar sesión</button>
      </div>}
    </div>
  )
}

export default Menu