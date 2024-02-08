import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {RouterProvider, createBrowserRouter, createRoutesFromElements, Route} from 'react-router-dom'
import { Home, SignIn, SignUp, About, Product, Contact, Error, Team, ListProperty } from './components/index.js'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<App/>}>
      <Route path='' element={<Home/>} />
      <Route path='signin' element={<SignIn/>} />
      <Route path='signup' element={<SignUp/>} />
      <Route path='about' element={<About/>} />
      <Route path='product' element={<Product/>} />
      <Route path='contact' element={<Contact/>} />
      <Route path='team' element={<Team/>} />
      <Route path='list' element={<ListProperty/>} />
      <Route path='error' element={<Error/>} />
  </Route>
))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
