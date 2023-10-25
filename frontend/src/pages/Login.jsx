import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    
const [status, setstatus] = useState(true)
const [email, setemail] = useState('')
const [password, setpassword] = useState('')
const navigate=useNavigate()


useEffect(()=>{
    const auth = localStorage.getItem('user')
    if(auth){
        navigate('/')
    }
})


const collectdata =async()=>{
    const data={email,password}
    let result =await axios.post('http://localhost:3000/login',data)
    .then((response)=>{
        // console.log("response",response.data.name)
        if(response.data.name){
            localStorage.setItem('user',JSON.stringify(response.data))
            console.log('kikikiki')
            setemail('')
            setpassword('')
            navigate('/')
        }else{
          setstatus(false)
        }
    })
}
  return (
    <div className='register'>
    <h1>LogIn Here </h1>
    <h4 className='warning'>{status?<></>:<>Email or Password is wrong !</>}</h4>
    <input className='inputbox' type="email" value={email} onChange={(e)=>setemail(e.target.value)}  placeholder='Enter Email Id'/>
    <input className='inputbox' type="password" value={password} onChange={(e)=>setpassword(e.target.value)}  placeholder='Password'/>
    <button className='button'onClick={collectdata} >LogIn</button>
    </div>
  )
}

export default Login