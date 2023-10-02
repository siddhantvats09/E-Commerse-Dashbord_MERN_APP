import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Produtcs = () => {

  const [product, setproduct] = useState([])
  //const [searching, setsearching] = useState('')
  const auth = localStorage.getItem('user')
  console.log(JSON.parse(auth)._id)
  const realid = JSON.parse(auth)._id

  const fetchproduct = async () => {
    let result = await fetch('http://localhost:3000/products')
    result = await result.json()
    setproduct(result)
  };
  useEffect(() => {
    fetchproduct()
  }, [])

  const deletep = async (id) => {
    await axios.delete(`http://localhost:3000/delete/${id}`)
    fetchproduct()
  }
  const search = async (event) => {
    let key = event.target.value
    if (key) {
      let result = await fetch(`http://localhost:3000/search/${key}`)
      result = await result.json()
      if (result) {
        setproduct(result)
      }
    } else {
      fetchproduct()

    }

  }

  return (
    <div>
      <h1 className='h1class h1'>Products List</h1>
      <input onChange={search} className="search-box input-box" type="text" placeholder='Search Product' />
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

export default Produtcs