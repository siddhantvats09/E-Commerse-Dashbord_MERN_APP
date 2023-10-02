import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Nav = () => {
  const navigate = useNavigate()
  const auth = localStorage.getItem('user')
  const logout = () => {
    localStorage.clear()
    navigate('/signup')
  }
  return (
    <div>
      <>
      <img className='logo' src="https://i.pinimg.com/564x/65/e9/8d/65e98d883204fd459f2774dd82106684.jpg" alt="LOGO" />
        {auth ?
          <ul className='nav-ul'>
            <li><Link to="/">Products</Link></li>
            <li><Link to="/add">Add Products</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link onClick={logout} to="/signup">LogOut ({JSON.parse(auth).name})</Link></li>
            <li><Link to="/readme">ReadMe...</Link></li>
          </ul>
          :
          <>
          <ul className='nav-ul nav-right'>
            <li><Link to="/signup">SignUp</Link></li>
            <li><Link to="/login">LogIn</Link></li>
          </ul>
          </>
        }
      </>
    </div>
  )
}

export default Nav