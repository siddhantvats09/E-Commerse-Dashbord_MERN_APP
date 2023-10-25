import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'

const Admin = () => {

    const [access, setaccess] = useState(true)
    const [status, setstatus] = useState(true)
    const [product, setproduct] = useState([])
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
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

    const collectdata=()=>{
        if( email==='admin@123' && password==='1234'){
            setstatus(true)
            setaccess(false)
        }else{
            setaccess(true)
            setstatus(false)
        }
    }

    return (
        <>
            {access ? (<>
                <div className='register'>
                    <h1>Enter Admin Credentials </h1>
                    <h4 className='warning'>{status ? <></> : <>Email or Password is wrong !</>}</h4>
                    <input className='inputbox' type="email" value={email} onChange={(e) => setemail(e.target.value)} placeholder='Enter Email Id' />
                    <input className='inputbox' type="password" value={password} onChange={(e) => setpassword(e.target.value)} placeholder='Password' />
                    <button className='button' onClick={collectdata} >Access</button>
                </div>
            </>) :(
                <div>
                    <h1 className='h1class h1'>Admin Access</h1>
                    <input onChange={search} className="search-box input-box" type="text" placeholder='Search Product' />
                    <div className="product-list">
                        <ul className='lists'>
                            <li>Sl No.</li>
                            <li>Name</li>
                            <li>Category</li>
                            <li>Compnay</li>
                            <li>Price</li>
                            <li>User ID</li>
                        </ul>
                        {product.length > 0 ? product.map((datas, index) =>
                            <>
                                <ul >
                                    <li key={index}>{index + 1}</li>
                                    <li>{datas.name}</li>
                                    <li>{datas.category}</li>
                                    <li>{datas.compnay}</li>
                                    <li>{datas.price}</li>
                                    <li>{datas.userid}</li>
                                    <span className='delete s2' onClick={() => deletep(datas._id)}>Delete</span>
                                    <span className='delete update s3'><Link className='link' to={'/update/' + datas._id}>Update</Link></span>
                                </ul>
                            </>
                        ) : <h1 className='h1class h1'>No Result Found</h1>}
                    </div>

                </div>)
            }
        </>
    )
}

export default Admin