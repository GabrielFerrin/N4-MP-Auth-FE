import './Profile.css'
import { useContext, useEffect, useRef, useState } from "react"
import { DataContext } from "../context/DataProvider"
import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import Logo from './icons/Logo'
import Menu from './Menu'
import Footer from './Footer'
import Spinner from './Animations/Spinner'
import Success from './Animations/Success'
import Photo from './icons/Photo'

const Profile = () => {
  const { setIsValidToken, userData, setUserData, getUserAPI,
    updateUserAPI, getImageAPI, uploadImageAPI,
    windowResized } = useContext(DataContext)
  const [editMode, setEditMode] = useState(false)
  const [showCheckMark, setShowCheckMark] = useState(false)
  const [src, setSrc] = useState(null)
  const [tmpSrc, setTmpSrc] = useState(null)
  const form = useRef(null)
  const textarea = useRef(null)
  const fileInput = useRef(null)
  const navigate = useNavigate()

  const getUserMut = useMutation({
    mutationFn: getUserAPI,
    onSuccess: (data) => {
      if (data?.success) {
        localStorage.setItem('token', data.token)
        setIsValidToken(true)
        setUserData(data.data)
        setEditMode(false)
        textareaResize()
        if (data.data.foto) {
          getImageMut.mutate()
        }
      } else {
        localStorage.removeItem('token')
        setIsValidToken(false)
        setUserData({})
        navigate('/login')
      }
    },
    onError: (error) => console.log(error)
  })

  const getImageMut = useMutation({
    mutationFn: getImageAPI,
    onSuccess: (data) => {
      if (data?.success) {
        setSrc(data.src)
        setTmpSrc(data.src)
      } else {
        alert(data.message)
      }
    }
  })

  const updateUserMut = useMutation({
    mutationFn: updateUserAPI,
    onSuccess: (data) => {
      if (data?.success) {
        localStorage.setItem('token', data.token)
        setIsValidToken(true)
        setUserData(data.data)
        setEditMode(false)
        textareaResize()
        setShowCheckMark(true)
        if (data.data.foto) {
          getImageMut.mutate()
        }
      } else {
        console.log(data)
        alert(data.message)
      }
    },
    onError: (error) => console.log(error)
  })

  const uploadImageMut = useMutation({
    mutationFn: uploadImageAPI,
    onSuccess: (data) => {
      if (data?.success) {
        console.log(data)
        getImageMut.mutate()
      } else {
        alert(data.message)
      }
    }
  })

  const textareaResize = () => {
    textarea.current.style.height = 0
    const newHeight = textarea.current.scrollHeight
    textarea.current.style.height = `${newHeight}px`
  }

  useEffect(() => {
    if (Object.keys(userData).length === 0) {
      getUserMut.mutate()
    }
    getImageMut.mutate()

    textareaResize()
    setTimeout(() => {
      textareaResize()
    }, 900);
    const target = textarea.current
    target.addEventListener('input', textareaResize)
    return () => target.removeEventListener('input', textareaResize)
    // style textarea
  }, [])

  useEffect(() => {
    if (Object.keys(userData).length > 0) {
      form.current.nombres.value = userData.nombres || ''
      form.current.bio.value = userData.bio || ''
      form.current.telefono.value = userData.telefono || ''
      form.current.email.value = userData.email || ''
    }
  }, [userData])

  useEffect(() => {
    if (editMode) {
      form.current.nombres.focus()
      form.current.nombres.select()
    } else {
      form.current.nombres.value = userData.nombres || ''
      form.current.bio.value = userData.bio || ''
      form.current.telefono.value = userData.telefono || ''
      form.current.email.value = userData.email || ''
      setSrc(tmpSrc)
    }
  }, [editMode])

  useEffect(() => {
    textareaResize()
  }, [windowResized])

  const handleUpdate = (e) => {
    e.preventDefault()
    const formData = new FormData(form.current)
    const data = Object.fromEntries(formData)
    if (data.password === '') {
      delete data.password
      delete data.currentPassword
    }
    console.log(data)
    if (form.current.image.files[0]) {
      const imageData = new FormData()
      imageData.append('image', form.current.image.files[0])
      console.log(imageData)
      uploadImageMut.mutate(imageData)
    }
    delete data.image
    updateUserMut.mutate(data)
  }

  const handleEdit = () => {
    setEditMode(!editMode)
    setShowCheckMark(!editMode && false)
  }

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setTmpSrc(src)
      setSrc(URL.createObjectURL(e.target.files[0]))
    }
  }

  return (
    <div className="profile-cmp">
      <nav className="nav-profile">
        <Logo /> <Menu username={userData.nombres} src={src} />
      </nav>
      <div className="main-wrapper-profile">
        <h2>Información Personal</h2>
        <h4>Tu información básica</h4>
        <div className="info-main-wrapper">
          <div className="info-wrapper-profile">
            <div className="info-header-profile">
              <div className="left-profile">
                <h5>{!editMode ? 'Perfil' : 'Actualiza tu información'}</h5>
                <p>
                  {!editMode ?
                    'Algunos campos podrían ser visibles para otras personas' :
                    'Los cambios se verán reflejados en todos los servicios'}
                </p>
              </div>
              <button type='button' onClick={handleEdit}>
                {editMode ? 'Cancelar' : 'Editar'}
              </button>
            </div>
            <div className="info-main-profile">
              {userData &&
                <form ref={form} onSubmit={handleUpdate}>
                  {/* foto */}
                  <div className="input-wrapper-profile">
                    <label htmlFor="foto">PHOTO</label>
                    <label htmlFor="foto" className="image-label-profile">
                      <div className={`image-frame${editMode ? ' edit-frm' : ''}`}>
                        {getImageMut.isPending ? <Spinner /> :
                          <img src={src} alt="Profile picture"
                            height={72} width={72}
                            className={editMode ? 'edit-img' : ''} />
                        }
                        {editMode && <Photo />}
                      </div>
                    </label>
                    <input type="file" id='foto' name="image" disabled={!editMode}
                      accept="image/*" ref={fileInput} onChange={handleImageChange} />
                  </div>
                  {/* nombres */}
                  <div className="input-wrapper-profile">
                    <label htmlFor="nombres">NAME</label>
                    <input type="text" id='nombres' name="nombres"
                      disabled={!editMode}
                      className={!editMode ? 'disabled' : ''} />
                  </div>
                  {/* bio */}
                  <div className="input-wrapper-profile">
                    <label htmlFor="bio">BIO</label>
                    <textarea rows="1" id='bio' type="text" name="bio"
                      disabled={!editMode} ref={textarea}
                      className={!editMode ? 'disabled' : ''}
                      defaultValue={userData.bio} />
                  </div>
                  {/* telefono */}
                  <div className="input-wrapper-profile">
                    <label htmlFor="telefono">PHONE</label>
                    <input type="text" name="telefono" disabled={!editMode}
                      className={!editMode ? 'disabled' : ''}
                      defaultValue={userData.telefono} id='telefono' />
                  </div>
                  {/* email */}
                  <div className="input-wrapper-profile"
                    title={!editMode ? '' : 'No se permite modificar el correo'}>
                    <label htmlFor="email">EMAIL</label>
                    <input type="email" name="email" disabled
                      className={!editMode ? 'disabled' : ''} id='email'
                      style={{ cursor: !editMode ? 'auto' : 'not-allowed' }} />
                  </div>
                  {/* password */}
                  <div className="input-wrapper-profile"
                    title={!editMode ? '' :
                      'Para modificar su calve, ingrese la clave actual.'}>
                    <label htmlFor="password">PASSWORD</label>
                    <input type="password" name="currentPassword"
                      className={!editMode ? 'disabled' : ''}
                      disabled={!editMode} id='password' />
                  </div>
                  {/* new password */}
                  {editMode &&
                    <div className="input-wrapper-profile has-bottom-border"
                      title='Escriba su nueva clave.'>
                      <label htmlFor="newPassword">NEW PASSWORD</label>
                      <input type="password" name="password" disabled={!editMode}
                        className={!editMode ? 'disabled' : ''} id='newPassword' />
                    </div>}
                  {/* actualizar */}
                  {editMode && <button type='submit'>
                    {updateUserMut.isPending && <Spinner />}
                    {!updateUserMut.isPending && 'Actualizar'}
                  </button>}
                </form>}
              {showCheckMark &&
                <div className='checkmark'>
                  <span>Acualizado</span> <Success />
                </div>}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div >
  )
}
export default Profile