import { useMutation } from "@tanstack/react-query"
import { useContext, useRef, useState } from "react"
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

const Register = () => {
  const { registerAPI, isMailValid, isPassValid, setUserData } =
    useContext(DataContext)
  const [formIsValid, setFormIsValid] = useState(false)
  const form = useRef(null)
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

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formIsValid) {
      const formData = new FormData(e.target)
      const data = Object.fromEntries(formData)
      registerMut.mutate(data)
    }
  }

  const validateData = () => {
    (isMailValid(form.current.email.value) &&
      isPassValid(form.current.password.value)) ?
      setFormIsValid(true) : setFormIsValid(false)
    setError('')
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
                name="email" onInput={validateData} /><br /><br />
            </div>
            <div className="input-wrapper-login">
              <Lock />
              <input type="password" placeholder="Contraseña" autoComplete="random"
                name="password" onInput={validateData} /><br /><br />
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