import { createContext } from "react";
import axios from "axios";

export const DataContext = createContext()

export const DataProvider = ({ children }) => {
  const dataApi = axios.create({ baseURL: 'http://localhost:3000/api/users' })
  return (
    <DataContext.Provider value={{ dataApi }}>
      {children}
    </DataContext.Provider>
  )
}