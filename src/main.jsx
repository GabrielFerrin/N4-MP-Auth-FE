import './index.css'
import ReactDOM from 'react-dom/client'
import { DataProvider } from './context/DataProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import { BrowserRouter } from 'react-router-dom'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <div className="theme">
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <DataProvider>
          <App />
        </DataProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </div>
)
