import './Login.css'
import { useMutation } from "@tanstack/react-query"
import { DataContext } from "../context/DataProvider"
import { useContext, useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Logo from './icons/Logo'
import Mail from './icons/Mail'
import Lock from './icons/Lock'
import Google from './icons/Google'
import Facebook from './icons/Facebook'
import X from './icons/X'
import GitHub from './icons/GitHub'
import Footer from './Footer'
import Spinner from './Animations/Spinner'
import ThemeSwitch from './ThemeSwitch'

const Login = () => {
  const { isValidToken, loginAPI, setUserData } = useContext(DataContext)
  const [formIsValid, setFormIsValid] = useState(false)
  const [error, setError] = useState('')
  const [emailMessage, setEmailMessage] = useState({})
  const [passMessage, setPassMessage] = useState({})
  const form = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    isValidToken && navigate('/profile')
  }, [isValidToken, navigate])

  const loginMut = useMutation({
    mutationFn: loginAPI,
    onSuccess: (data) => {
      if (data.success) {
        setUserData(data.data)
        localStorage.setItem('token', data.token)
        navigate('/profile')
      } else {
        setError(data.message)
      }
    },
    onError: (error) => {
      setError(error.message)
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)
    loginMut.mutate(data)
  }

  const validateData = () => {
    setError('')
    if (!form.current.email.value || !form.current.password.value)
      setFormIsValid(false)
    else setFormIsValid(true)
  }

  return (
    <div className="login-cmp">
      <div className="main-wrapper-login">
        <div className="wrapper-login">
          <div className="logo-wrapper-login">
            <Logo />
            <div className="theme-switch">
              <ThemeSwitch />
            </div>
          </div>
          <p className="title-login">
            Iniciar sesión
          </p>
          <form onSubmit={handleSubmit} ref={form} >
            {/* mail */}
            <div className="input-wrapper-login">
              <Mail />
              <input type="text" placeholder="Correo"
                name="email" onInput={validateData} /><br /><br />
            </div>
            {/* password */}
            <div className="input-wrapper-login">
              <Lock />
              <input type="password" placeholder="Contraseña"
                name="password" onInput={validateData} /><br /><br />
            </div>
            {/* submit */}
            <button type="submit" disabled={!formIsValid} >
              {loginMut.isPending && <Spinner />}
              {!loginMut.isPending && 'Iniciar sesión'}
            </button>
            {error !== '' && <span className='error-msg'>{error}</span>}
          </form>
          <span>o continúa con estos perfiles sociales</span>
          <div className="socials-login">
            <a href="http://www.google.com" target="_blank"><Google /></a>
            <a href="http://www.facebook.com" target="_blank"><Facebook /></a>
            <a href="http://www.x.com" target="_blank"><X /></a>
            <a href="http://www.github.com" target="_blank"><GitHub /></a>
          </div>
          <span>¿Aún no tienes una cuenta? <Link to="/register">Regístrate
          </Link></span>
        </div>
        <Footer />
      </div>
    </div >
  )
}
export default Login