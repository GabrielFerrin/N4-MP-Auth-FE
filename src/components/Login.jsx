import './Login.css'
import { useMutation } from "@tanstack/react-query"
import { DataContext } from "../context/DataProvider"
import { useContext, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import Logo from './icons/Logo'

const Login = () => {
  const { isValidToken, loginAPI, setUserData } = useContext(DataContext)
  const [formIsValid, setFormIsValid] = useState(false)
  const [error, setError] = useState('')
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
        setTimeout(() => {
          setError('')
        }, 4000);
      }
    },
    onError: (error) => console.log('error', error)
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)
    loginMut.mutate(data)
  }

  const validateData = () => {
    if (!form.current.email.value || !form.current.password.value)
      setFormIsValid(false)
    else setFormIsValid(true)
  }

  return (
    <div className="login-cmp">
      <div className="main-wrapper-login">
        <div className="wrapper-login">
          <Logo />
          <p className="title-login">
            Join thousands of learners from around the world
          </p>
          <p className="subtitle-login">
            Master web development by making real-life projects. There
            are multiple paths for you to choose
          </p>
          <form onSubmit={handleSubmit} ref={form} >
            <input type="text" placeholder="Correo"
              name="email" onInput={validateData} /><br /><br />
            <input type="password" placeholder="Contraseña"
              name="password" onInput={validateData} /><br /><br />
            <input type="submit" disabled={!formIsValid} />
            {error !== '' && <p>{error}</p>}
          </form>
        </div>
        <footer className="footer-login">
          <span>created by <strong>Gabriel Ferrin</strong></span>
          <span>Funval</span>
        </footer>
      </div>
    </div>
  )
}
export default Login