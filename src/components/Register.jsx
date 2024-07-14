import { useMutation } from "@tanstack/react-query"
import { useContext, useRef, useState } from "react"
import { DataContext } from "../context/DataProvider"
import { useNavigate } from "react-router-dom"

const Register = () => {
  const { registerAPI, isMailValid, isPassValid, setUserData } =
    useContext(DataContext)
  const [formIsValid, setFormIsValid] = useState(false)
  const form = useRef(null)
  const navigate = useNavigate()

  const registerMut = useMutation({
    mutationFn: registerAPI,
    onSuccess: (data) => {
      setUserData([data])
      localStorage.setItem('token', data.token)
      navigate('/profile')
    },
    onError: (error) => console.log(error)
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
    <div>
      <h1>Register</h1><br />
      <form onSubmit={handleSubmit} ref={form}>
        <input type="email" placeholder="Correo"
          name="email" onInput={validateData} /><br /><br />
        <input type="password" placeholder="Contraseña"
          name="password" onInput={validateData} /><br /><br />
        <input type="submit" disabled={!formIsValid} />
        {registerMut.isLoading && <p>Loading...</p>}
      </form>
    </div>
  )
}
export default Register