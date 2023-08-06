import axios from 'axios';
import React,{useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function EditEmployee() {
  const param = useParams();
  const navigate = useNavigate()

  const [inputValue, setinputValue] = useState({
    name: '',
    email: '',
    address: ''
  })

  const auth = localStorage.getItem('jwt');

   useEffect(() => {
    if(auth == null){
      navigate('/')
    }
   }, [auth])

  const handleInput = (e) => {
    setinputValue({...inputValue,[e.target.name]:e.target.value})
  }

  const token = localStorage.getItem('jwt')
    const headers ={
      "x-access-token": token
    }
  // Load employee record

  useEffect(() => {
    axios.get('http://localhost:5000/employees/update-employee/'+param.id,{
      headers:headers
    })
    .then((res) => {
      setinputValue(res.data)
    })
  }, [])

  const updateSubmit = (e) => {
    e.preventDefault();
    const data = {
      name:inputValue.name,
      email:inputValue.email,
      address:inputValue.address
    }
    axios.put(`http://localhost:5000/employees/update-employee/${param.id}`,data,{
      headers
    })
    .then(res => {
      if(res.status === 200){
        console.log('Updated Employee Record Successfully.')
      }
      navigate('/')
    })
    .catch((err) => console.log(err))
  }
  
  
  return (
    <div className='container'>
      <h3 className='my-4 text-center'>Edit Employee</h3>
      <form method='post' onSubmit={updateSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputName" className="form-label">Name*</label>
          <input type="text" className="form-control" name="name" value={inputValue.name} onChange={handleInput} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail" className="form-label">Email address*</label>
          <input type="email" className="form-control" name="email" value={inputValue.email} onChange={handleInput}/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail" className="form-label">Address</label>
          <textarea className='form-control' name='address' onChange={handleInput} value={inputValue.address}></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
  )
}

export default EditEmployee