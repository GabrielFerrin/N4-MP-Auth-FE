const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('submitting!')

  }
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
export default Login