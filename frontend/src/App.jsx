import { useState } from 'react'
import './App.css'
import Nav from './component/Nav'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './component/Footer'
import Produtcs from './pages/Produtcs'
import Addprodutcs from './pages/Addprodutcs'
import Updateprodutcs from './pages/Updateprodutcs'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import Pvtcomponent from './component/Pvtcomponent'
import Login from './pages/Login'
import Readme from './component/Readme'
import Admin from './pages/Admin'

function App() {
  
  return (
    <BrowserRouter>
    
    <Nav/>
    <Routes>
    <Route element={<Pvtcomponent/>}>
      <Route path="/" element={<Produtcs />}/>
      <Route path="/add" element={<Addprodutcs />}/>
      <Route path="/update/:id" element={<Updateprodutcs />}/>
      <Route path="/profile" element={<Profile />}/>
      <Route path="/admin" element={<Admin />}/>
      <Route path="/readme" element={<Readme />}/>

      </Route>
      <Route path="/signup" element={<Signup />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/readme" element={<Readme />}/>
    </Routes>

     <Footer/>
    </BrowserRouter>
  )
}

export default App
