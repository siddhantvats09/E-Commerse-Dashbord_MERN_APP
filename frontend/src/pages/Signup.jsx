import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Signup = () => {

const [name, setname] = useState('')
const [email, setemail] = useState('')
const [password, setpassword] = useState('')
const nevigate=useNavigate()
useEffect(()=>{
    const auth=localStorage.getItem('user')
    if(auth){
        nevigate("/")
    }

},[])

const collectdata =async()=>{
    
    const data={name, email,password}
    const result= await axios.post('http://localhost:3000/register', data)
    .then((response)=>{
        console.log(response.data)
        localStorage.setItem("user",JSON.stringify(response.data))
    })
    setemail('')
    setname('')
    setpassword('')
    nevigate("/")
}


  return (
    <> 
    <div className='register'>
    <h1>Register Page</h1>
    <input className='inputbox' type="text" value={name} onChange={(e)=>setname(e.target.value.toUpperCase())} placeholder='Your Name'/>
    <input className='inputbox' type="email" value={email} onChange={(e)=>setemail(e.target.value)}  placeholder='Your Email Id'/>
    <input className='inputbox' type="password" value={password} onChange={(e)=>setpassword(e.target.value)}  placeholder='Password'/>
    <button className='button'onClick={collectdata} >SignUp</button>
    </div>
    <div className="ap">
      <h2>I'm Full-Stack/ MERN-STACK developer and web designer specializing in creating visually appealing and user-friendly websites, combining technical expertise with a strong sense of aesthetics.</h2>
      <h5>Profiles</h5>
      <div className="links">
        <a href="https://github.com/siddhantvats09" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://siddhants.netlify.app/" target="_blank" rel="noopener noreferrer">Portfolio</a>
      </div>
      <h4>Developed by Siddhant...</h4>
    </div>
    <br />
<div className='readme'>
            <h1 className='readmeh1'>* Its an E-Commerse Dashboard Website </h1>
            <h1 className='readmeh1'>* Here you can add your Items and check other users Items</h1>
            <h1 className='readmeh1'>* First you need to Register / Signup </h1>
            <h1 className='readmeh1'>* Then Login With the same account You Registered</h1>
            <h1 className='readmeh1'>* After you can access the website</h1>
            <h1 className='readmeh1'>* You can Update & Delete Your Items </h1>
            <h1 className='readmeh1'>* You cannot Update or Delete others peoples Item </h1>
            <h1 className='readmeh1'>* There is a Add Product Section Where you can add your Products </h1>
            <h1 className='readmeh1'>* In profile Section You can Check Your Profile As Well</h1>
            <h1 className='readmeh1'>* Any time you want you Can Logout</h1>
            <h1 className='readmeh1'>* You don't need to creat your account Everytime ,You just need to Login </h1>
            <h1 className='readmeh1'>* Your Data always Be there in the Server</h1>
    </div>
    </>
  )
}

export default Signup