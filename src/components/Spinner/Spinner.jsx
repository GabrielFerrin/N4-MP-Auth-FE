import './Spinner.css'

const Spinner = ({ width = '20px' }) => {
  return (
    <div className="loader" style={{width}}></div>
  )
}
export default Spinner