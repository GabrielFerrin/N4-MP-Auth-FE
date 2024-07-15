import './DeployMenu.css'
import { useContext } from "react"
import { DataContext } from "../../context/DataProvider"

const DeployMenu = () => {
  const { showMenu } = useContext(DataContext)

  return (
    <div className="deploy-menu-cmp">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 41.46 26.63"
        height={5} className={showMenu ? 'normal' : 'rotated'}>
        <path fill="#333" d="M20.37,26.61c-4.62,0-9.23-.04-13.85,.02-2.78,.04-4.92-.98-6.01-3.56-1.16-2.74-.26-4.97,1.86-7.01C7.04,11.56,11.54,6.88,16.17,2.34c3.12-3.06,6.04-3.13,9.13-.12,4.73,4.61,9.37,9.33,14.04,14.01,1.92,1.92,2.75,4.16,1.62,6.77-1.12,2.57-3.22,3.64-5.98,3.63-4.86-.03-9.73,0-14.6,0Z" />
      </svg>
    </div>
  )
}
export default DeployMenu