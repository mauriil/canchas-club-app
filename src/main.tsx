import { ThemeProvider } from '@mui/material/styles'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import App from './App'
import './index.css'
import { theme } from "./Themes/theme";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>  
  </BrowserRouter>,
)
