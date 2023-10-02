import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Updateprodutcs = () => {
  const [name, setname] = useState('')
  const [price, setprice] = useState('')
  const [category, setcategory] = useState('')
  const [compnay, setcompnay] = useState('')
  const [updated, setUpdated] = useState(false);
  const [invalid, setinvalid] = useState(false)
  const navigate = useNavigate()
  const params = useParams()

  const updateproduct = async () => {
    if(!name || !compnay || !category || !price){
      setinvalid(true)
      return false
    }
    const pid = params.id
    const data = { name, compnay, category, price }
    setUpdated(true)
    await axios.put(`http://localhost:3000/updateproduct/${pid}`, data)
      .then((response) => {

      })
  }

  const fetchdata = async () => {
    if (!updated) {
      await axios.get(`http://localhost:3000/singleproduct/${params.id}`)
        .then((response) => {
          setname(response.data.name)
          setcompnay(response.data.compnay)
          setcategory(response.data.category)
          setprice(response.data.price)
        })
    } else {
      setcategory('')
      setcompnay('')
      setname('')
      setprice('')
      navigate('/')
    }
  }

  useEffect(() => {
    fetchdata()

  }, [updated])


  return (
    <div className='register'>
      <h1 className='h1class'>Update Product Data</h1>
      <input className='inputbox' type="text" placeholder='Name of Product' value={name} onChange={e => setname(e.target.value)} />
      {invalid && !name && <span className='invalid-input'>Enter valid name</span>}
      <input className='inputbox' type="text" placeholder='Price of Product' value={price} onChange={e => setprice(e.target.value)} />
      {invalid && !price && <span className='invalid-input'>Enter valid price</span>}
      <input className='inputbox' type="text" placeholder='Compnay of Product' value={compnay} onChange={e => setcompnay(e.target.value)} />
      {invalid && !compnay && <span className='invalid-input'>Enter valid compnay</span>}
      <input className='inputbox' type="text" placeholder='Category of Product' value={category} onChange={e => setcategory(e.target.value)} />
      {invalid && !category && <span className='invalid-input'>Enter valid category</span>}
      <button className='button' onClick={updateproduct} >UPDATE PRODUCT</button>
    </div>
  )
}

export default Updateprodutcs