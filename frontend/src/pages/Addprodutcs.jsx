import axios from 'axios'
import React, { useState } from 'react'

const Addprodutcs = () => {
  const [name, setname] = useState('')
  const [price, setprice] = useState('')
  const [category, setcategory] = useState('')
  const [compnay, setcompnay] = useState('')
  const [invalid, setinvalid] = useState(false)
 
  const addproduct=async()=>{

    if(!name || !compnay || !category || !price){
      setinvalid(true)
      return false
    }

    const userid=JSON.parse(localStorage.getItem('user'))._id
    const data={name,price,compnay,category,userid}
    let result =await axios.post('http://localhost:3000/addproduct',data)
    .then((response)=>{
      setcategory('')
      setcompnay('')
      setname('')
      setprice('')
      setinvalid(false)
    })
  }


  return (
    <div className='register'>
      <h1 className='h1class'>Add Products Here</h1>
      <input className='inputbox' type="text" placeholder='Name of Product' value={name} onChange={e => setname(e.target.value)} />
      {invalid && !name && <span className='invalid-input'>Enter valid name</span>}
      <input className='inputbox' type="text" placeholder='Price of Product' value={price} onChange={e => setprice(e.target.value)} />
      {invalid && !price && <span className='invalid-input'>Enter valid price</span>}
      <input className='inputbox' type="text" placeholder='Compnay of Product' value={compnay} onChange={e => setcompnay(e.target.value)} />
      {invalid && !compnay && <span className='invalid-input'>Enter valid compnay</span>}
      <input className='inputbox' type="text" placeholder='Category of Product' value={category} onChange={e => setcategory(e.target.value)} />
      {invalid && !category && <span className='invalid-input'>Enter valid category</span>}
      <button className='button' onClick={addproduct} >ADD PRODUCT</button>
    </div>
  )
}

export default Addprodutcs