import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { CartProvider } from './contexts/CartContext'
import { SnackProvider } from './contexts/SnackContext'
import { AppRoutes } from './routes'

import { Normalize } from 'styled-normalize'
import { GlobalStyle } from './styles/global'
import { Theme } from './styles/Theme'
import { UserProvider } from './contexts/UserContext'

export default function App() {
  return (
    <BrowserRouter>
      <Theme>
        <UserProvider>
          <SnackProvider>
            <CartProvider>
              <AppRoutes />
              <ToastContainer autoClose={2000} />
              <GlobalStyle />
              <Normalize />
            </CartProvider>
          </SnackProvider>
        </UserProvider>
      </Theme>
    </BrowserRouter>
  )
}
