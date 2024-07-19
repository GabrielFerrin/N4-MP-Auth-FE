import { useMutation } from "@tanstack/react-query"
import { useContext, useEffect, useRef, useState } from "react"
import { DataContext } from "../context/DataProvider"
import { Link, useNavigate } from "react-router-dom"
import Logo from "./icons/Logo"
import Mail from "./icons/Mail"
import Lock from "./icons/Lock"
import Google from "./icons/Google"
import Facebook from "./icons/Facebook"
import X from "./icons/X"
import GitHub from "./icons/GitHub"
import Footer from "./Footer"
import Spinner from "./Animations/Spinner"
import ThemeSwitch from "./ThemeSwitch"
import MessageBox from "./MessageBox"

const Register = () => {
  const { registerAPI, isMailValid, isPassValid, setUserData } =
    useContext(DataContext)
  const [formIsValid, setFormIsValid] = useState(false)
  const form = useRef(null)
  const [emailMessage, setEmailMessage] = useState([])
  const [emailTouched, setEmailTouched] = useState(false)
  const [emailTimer, setEmailTimer] = useState(null)
  const [passMessage, setPassMessage] = useState([])
  const [passTouched, setPassTouched] = useState(false)
  const [passTimer, setPassTimer] = useState(null)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const registerMut = useMutation({
    mutationFn: registerAPI,
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

  useEffect(() => {
    const hideMessages = (e) => {
      if (e.key === 'Escape') {
        setEmailTouched(false)
        setPassTouched(false)
      }
    }

    window.addEventListener('keydown', hideMessages)
    return () => {
      window.removeEventListener('keydown', hideMessages)
    }
  }, [])


  const handleSubmit = (e) => {
    e.preventDefault()
    if (formIsValid) {
      const formData = new FormData(e.target)
      const data = Object.fromEntries(formData)
      registerMut.mutate(data)
    }
  }

  const validateData = (e) => {
    // trigger email message
    if (e.target.id === 'email-input') {
      const emailValue = form.current?.email?.value?.trim()
      emailErrors[0].valid = emailValue !== ''
      emailErrors[1].valid = isMailValid(emailValue)
      setEmailMessage([...emailErrors]);
      clearTimeout(emailTimer)
      setEmailTimer(setTimeout(() => {
        if (form.current?.email === document.activeElement)
          setEmailTouched(true)
      }, 1500))
    }
    // trigger password message
    if (e.target.id === 'password-input') {
      const passValue = form.current?.password?.value?.trim()
      if (passValue === '') passErrors[0].valid = false
      else passErrors[0].valid = true
      passErrors[1].valid = passValue.length >= 8
      passErrors[2].valid = /[A-Z]/.test(passValue)
      setPassMessage([...passErrors])
      clearTimeout(passTimer)
      setPassTimer(setTimeout(() => {
        if (form.current?.password === document.activeElement)
          setPassTouched(true)
      }, 1500))
    }
    // enable submit button
    const emailValue = form.current?.email?.value?.trim()
    setFormIsValid(
      isMailValid(emailValue) &&
      isPassValid(form.current?.password?.value)
    )
    setError('')
  }

  const handleEmailOnBlur = () => {
    setEmailTouched(false)
  }

  const handlePassOnBlur = () => {
    setPassTouched(false)
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
            Súmate a miles de estudiantes de todo el mundo
          </p>
          <p className="subtitle-login">
            Domina el desarrollo web creando proyectos reales. Hay
            múltiples caminos para elegir.
          </p>
          <form autoComplete="off" onSubmit={handleSubmit} ref={form} >
            <div className="input-wrapper-login">
              <Mail />
              <input autoComplete="false" type="text" placeholder="Correo"
                name="email" onInput={(e) => validateData(e)}
                id="email-input" onBlur={handleEmailOnBlur} />
              {emailTouched > 0 && <div className="message-box-login">
                <MessageBox
                  message={emailMessage} />
              </div>}
            </div>
            <div className="input-wrapper-login">
              <Lock />
              <input type="password" placeholder="Contraseña"
                autoComplete="random" name="password"
                onBlur={handlePassOnBlur} id="password-input"
                onInput={validateData} />
              {passTouched > 0 && <div className="message-box-login">
                <MessageBox
                  message={passMessage} />
              </div>}
            </div>
            {/* submit */}
            <button type="submit" disabled={!formIsValid} value="Registrarme">
              {registerMut.isPending && <Spinner />}
              {!registerMut.isPending && 'Registrarme'}
            </button>
            {error !== '' && <span className='error-msg'>{error}</span>}
          </form>
          <span>o continúa con estos perfiles sociales</span>
          <div className="socials-login">
            <Google /> <Facebook /> <X /> <GitHub />
          </div>
          <span>¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link></span>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Register

const emailErrors = [
  { desc: 'No debe estar vacío', valid: false },
  { desc: 'Debe tener un formato válido', valid: false }
]

const passErrors = [
  { desc: 'No debe estar vacía', valid: false },
  { desc: 'Debe tener al menos 8 caracteres', valid: false },
  { desc: 'Debe tener al menos una letra mayúscula', valid: false },
]