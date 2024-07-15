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

const Register = () => {
  const { registerAPI, isMailValid, isPassValid, setUserData } =
    useContext(DataContext)
  const [formIsValid, setFormIsValid] = useState(false)
  const form = useRef(null)
  const navigate = useNavigate()

  const registerMut = useMutation({
    mutationFn: registerAPI,
    onSuccess: (data) => {
      if (data.success) {
        setUserData(data)
        localStorage.setItem('token', data.token)
        navigate('/profile')
      } else {
        console.log(data)
        alert(data.message)
      }
    },
    onError: (error) => console.log('the error:', error)
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
  }

  return (
    <div className="login-cmp">
      <div className="main-wrapper-login">
        <div className="wrapper-login">
          <Logo />
          <p className="title-login">
            Súmate a miles de estudiantes de todo el mundo
          </p>
          <p className="subtitle-login">
            Domina el desarrollo web creando proyectos reales. Hay
            múltiples caminos para elejir.
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
            <input type="submit" disabled={!formIsValid} value="Registrarme" />
            {registerMut.isLoading && <p>Loading...</p>}
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