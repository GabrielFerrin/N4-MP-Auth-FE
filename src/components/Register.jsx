import { useEffect } from "react"

const Register = () => {
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('submitting!')
  }

  useEffect(() => {
    const getData = async () => {
      // const res = await axios.get('http://localhost:3000/api/users/get-all')
      // console.log(res)
    }

    getData()
  }, [])

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Correo" name="email" /><br /><br />
        <input type="password" placeholder="Contraseña" name="password" /><br /><br />
        <input type="submit" />
      </form>
    </div>
  )
}
export default Register