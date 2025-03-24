import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import StoreContextProvider from './context/StoreContext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
 
  <BrowserRouter>
  <StoreContextProvider>
  <App />
  </StoreContextProvider>
  
  </BrowserRouter>
  // <BrowserRouter>: Enables routing in the app.
  // <StoreContextProvider>: Provides a context to the application, making the state and functions available to any component within the app that consumes the context.
  // <App />: The main application component that will use routing and context.
 
)
