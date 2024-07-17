import './ThemeSwitch.css'
import { useContext, useEffect, useRef, useState } from "react"
import { DataContext } from "../context/DataProvider"

const ThemeSwitch = () => {
  const [clase, setClase] = useState('')
  const { theme, setTheme } = useContext(DataContext)
  const lightIcon = useRef(null)
  const darkIcon = useRef(null)

  useEffect(() => {
    setClase(theme)
  }, [theme])

  useEffect(() => {
    if (lightIcon.current) {
      lightIcon.current?.classList.remove('animate')
      console.log(lightIcon.current.classList)
      setTimeout(() => {
        lightIcon?.current?.classList.add('animate')
        console.log(lightIcon.current.classList)
      }, 50);
    }
    if (darkIcon.current) {
      console.log(darkIcon.current.classList)
      darkIcon?.current?.classList.remove('animate')
      setTimeout(() => {
        console.log(darkIcon.current.classList)
        darkIcon?.current?.classList.add('animate')
      }, 50);
    }
  }, [clase])

  const handleClick = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <div className="theme-switch-cmp"
      onClick={handleClick}>
      {clase === 'light' ?
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20.25 20.25"
          className="theme-icon-theme" fill='#555555'
          ref={darkIcon}>
          <path d="M10.5,20.25C4.71,20.25,0,15.54,0,9.75,0,5.5,2.53,1.69,6.46,.06c.28-.12,.6-.05,.82,.16,.21,.21,.28,.54,.16,.82-.46,1.1-.69,2.26-.69,3.46,0,4.96,4.04,9,9,9h.01c1.19,0,2.35-.23,3.45-.69,.28-.12,.6-.05,.82,.16,.22,.21,.28,.54,.16,.82-1.64,3.92-5.44,6.46-9.69,6.46ZM5.49,2.27C3.02,3.92,1.5,6.7,1.5,9.75c0,4.96,4.04,9,9,9,3.05,0,5.83-1.52,7.48-3.99-.72,.16-1.46,.24-2.21,.24h-.02c-5.79,0-10.5-4.71-10.5-10.5,0-.76,.08-1.5,.24-2.23Z" />
        </svg> :
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20.25 20.25"
          className="theme-icon-theme" fill='#E0E0E0'
          ref={lightIcon}>
          <path d="M10.13,20.25c-.43,0-.78-.35-.78-.78v-2.34c0-.43,.35-.78,.78-.78s.78,.35,.78,.78v2.34c0,.43-.35,.78-.78,.78Zm-6.61-2.74c-.2,0-.4-.08-.55-.23-.3-.3-.3-.8,0-1.1l1.65-1.65c.3-.3,.8-.3,1.1,0s.3,.8,0,1.1l-1.65,1.65c-.15,.15-.35,.23-.55,.23Zm13.22,0c-.2,0-.4-.08-.55-.23l-1.65-1.65c-.3-.3-.3-.8,0-1.1s.8-.3,1.1,0l1.65,1.65c.3,.3,.3,.8,0,1.1-.15,.15-.35,.23-.55,.23Zm-6.61-2.71c-2.58,0-4.67-2.1-4.67-4.67s2.1-4.67,4.67-4.67,4.67,2.1,4.67,4.67-2.1,4.67-4.67,4.67Zm0-7.79c-1.72,0-3.12,1.4-3.12,3.12s1.4,3.12,3.12,3.12,3.12-1.4,3.12-3.12-1.4-3.12-3.12-3.12Zm9.35,3.89h-2.34c-.43,0-.78-.35-.78-.78s.35-.78,.78-.78h2.34c.43,0,.78,.35,.78,.78s-.35,.78-.78,.78Zm-16.36,0H.78c-.43,0-.78-.35-.78-.78s.35-.78,.78-.78H3.12c.43,0,.78,.35,.78,.78s-.35,.78-.78,.78ZM15.08,5.95c-.2,0-.4-.08-.55-.23-.3-.3-.3-.8,0-1.1l1.65-1.65c.3-.3,.8-.3,1.1,0s.3,.8,0,1.1l-1.65,1.65c-.15,.15-.35,.23-.55,.23Zm-9.91,0c-.2,0-.4-.08-.55-.23l-1.65-1.65c-.3-.3-.3-.8,0-1.1s.8-.3,1.1,0l1.65,1.65c.3,.3,.3,.8,0,1.1-.15,.15-.35,.23-.55,.23Zm4.96-2.05c-.43,0-.78-.35-.78-.78V.78c0-.43,.35-.78,.78-.78s.78,.35,.78,.78V3.12c0,.43-.35,.78-.78,.78Z" />
        </svg>}
    </div>
  )
}

export default ThemeSwitch
