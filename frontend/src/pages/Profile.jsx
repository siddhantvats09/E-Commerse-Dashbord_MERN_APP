import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Profile = () => {

  const [product, setproduct] = useState([])
  const auth = localStorage.getItem('user')
  console.log(JSON.parse(auth)._id)
  const realid = JSON.parse(auth)._id
  const realname = JSON.parse(auth).name

  const fetchproduct = async () => {
    let result = await fetch(`http://localhost:3000/profile/${realid}`)
    result = await result.json()
    setproduct(result)
    console.log("result", result)
  };
  useEffect(() => {
    fetchproduct()
  }, [])
  const deletep = async (id) => {
    await axios.delete(`http://localhost:3000/delete/${id}`)
    fetchproduct()
  }
  return (
    <div>
      <h1 className='h1class h1'>Your Profile And Products </h1>
      <h1 className='h1class h1 h11'>Welcome Back {realname} </h1>
      <div className="product-list">
        <ul className='lists'>
          <li>Sl No.</li>
          <li>Name</li>
          <li>Category</li>
          <li>Compnay</li>
          <li>Price</li>
        </ul>
        {product.length > 0 ? product.map((datas, index) =>
          <>
            <ul >
              <li key={index}>{index + 1}</li>
              <li>{datas.name}</li>
              <li>{datas.category}</li>
              <li>{datas.compnay}</li>
              <li>{datas.price}</li>
              {
                realid === datas.userid ? (<>
                  <span className='delete' onClick={() => deletep(datas._id)}>Delete</span>
                  <span className='delete update'><Link className='link' to={'/update/' + datas._id}>Update</Link></span>
                </>) : (<span className='delete'>You can't edit this data</span>)
              }
            </ul>
          </>
        ) : <h1 className='h1class h1'>No Result Found</h1>}
      </div>
    </div>
  )
}

export default Profile