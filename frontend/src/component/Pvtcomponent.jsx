import React from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'

const Pvtcomponent = () => {
const nevigate=useNavigate()
const auth=localStorage.getItem('user')
    
  return (
   auth ? <Outlet/>:<Navigate to="/signup"/>
  )
}

export default Pvtcomponent