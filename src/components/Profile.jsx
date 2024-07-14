import './Profile.css'
import { useContext, useEffect, useRef, useState } from "react"
import { DataContext } from "../context/DataProvider"
import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"

const Profile = () => {
  const { setIsValidToken, userData, setUserData, getUserAPI,
    updateUserAPI } = useContext(DataContext)
  const [editMode, setEditMode] = useState(false)
  const form = useRef(null)
  const navigate = useNavigate()

  const getUserMut = useMutation({
    mutationFn: getUserAPI,
    onSuccess: (data) => {
      if (data?.success) {
        localStorage.setItem('token', data.token)
        setIsValidToken(true)
        setUserData(data.data)
      } else {
        localStorage.removeItem('token')
        setIsValidToken(false)
        setUserData({})
        navigate('/login')
      }
    },
    onError: (error) => console.log(error)
  })

  const updateUserMut = useMutation({
    mutationFn: updateUserAPI,
    onSuccess: (data) => {
      console.log(data)
      if (data?.success) {
        setUserData(data.data)
        setEditMode(false)
        localStorage.setItem('token', data.token)
      }
    },
    onError: (error) => console.log(error)
  })

  useEffect(() => {
    if (Object.keys(userData).length === 0) {
      getUserMut.mutate()
    }
  }, [])

  useEffect(() => {
    if (Object.keys(userData).length > 0) {
      form.current.nombres.value = userData.nombres || ''
      form.current.bio.value = userData.bio || ''
      form.current.telefono.value = userData.telefono || ''
      form.current.email.value = userData.email || ''
    }
  }, [userData])

  const handleLogout = () => {
    setIsValidToken(false)
    setUserData({})
    localStorage.removeItem('token')
    navigate('/login')
  }

  const handleUpdate = (e) => {
    e.preventDefault()
    const formData = new FormData(form.current)
    const data = Object.fromEntries(formData)
    if (data.password.trim() === '') {
      delete data.password
      delete data.currentPassword
    }
    console.log(data)
    updateUserMut.mutate(data)
  }

  return (
    <div className="profile-cmp">
      <h1>Profile</h1>
      <button onClick={handleLogout}>Logout</button>
      {userData &&
        <form ref={form} onSubmit={handleUpdate}>
          <button type='button' onClick={() => setEditMode(!editMode)}>
            {editMode ? 'Cancelar' : 'Editar'}
          </button> <br />
          {/* nombres */}
          <label htmlFor="nombres">Nombres</label>
          <input type="text" name="nombres"
            disabled={!editMode} />
          {/* bio */}
          <label htmlFor="bio">Bio</label>
          <input type="text" name="bio"
            defaultValue={userData.bio} disabled={!editMode} />
          {/* telefono */}
          <label htmlFor="telefono">Teléfono</label>
          <input type="text" name="telefono"
            defaultValue={userData.telefono} disabled={!editMode} />
          {/* email */}
          <label htmlFor="email">Email</label>
          <input type="email" name="email" disabled />
          {/* password */}
          <label htmlFor="password">Password</label>
          <input type="password" name="currentPassword"
            disabled={!editMode} />
          {/* new password */}
          <label htmlFor="newPassword">New Password</label>
          <input type="password" name="password"
            disabled={!editMode} />
          {/* actualizar */}
          <input type="submit" value="Actualizar" />
        </form>}
    </div>
  )
}
export default Profile