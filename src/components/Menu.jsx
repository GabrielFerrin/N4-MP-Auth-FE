import { useContext } from 'react'
import { DataContext } from '../context/DataProvider'
import Chat from './icons/Chat'
import DeployMenu from './icons/DeployMenu'
import Logout from './icons/Logout'
import Profile from './icons/Profile'
import './Menu.css'
import { useNavigate } from 'react-router-dom'

const Menu = ({ username }) => {
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
      <div className="menu-header" onClick={() => setShowMenu(!showMenu)}>
        <img src="profile-pic.png" alt="Profile picture"
          height={32} />
        <span>{username}</span>
        <DeployMenu />
      </div>
      {showMenu && <div className="menu-items-wrapper">
        <button><Profile />My Profile</button>
        <button><Chat />Group Chat</button>
        <div className="line"></div>
        <button onClick={handleLogout}><Logout />Logout</button>
      </div>}
    </div>
  )
}

export default Menu