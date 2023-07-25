import React,{useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const navigate = useNavigate()
    const [inputValue, setInputValue] = useState({
        name:'',
        email:'',
        password:''
    })

    const handleInput = (e) => {
        setInputValue({...inputValue,[e.target.name]:e.target.value})
    }

    const regsiterSubmit = (e) => {
        e.preventDefault()
        const data = {
            name: inputValue.name,
            email: inputValue.email,
            phone:inputValue.phone,
            password: inputValue.password,
            confirmpassword: inputValue.confirmpassword
        }
        axios.post('http://localhost:5000/auth/register',data)
        .then((res) => { 
          localStorage.setItem('jwt',JSON.stringify(res.data.token))
          alert(`${data.name} registered successfully`)  
          navigate('/')
        })
        .catch((err) => {console.log(err)})
    }
  return (
    <div>
    <div className='container'>
      <h3 className='my-4 text-center'>Register User</h3>
      <form method='post' onSubmit={regsiterSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputName" className="form-label">Name*</label>
          <input type="text" className="form-control" name="name" value={inputValue.name} onChange={handleInput} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail" className="form-label">Email address*</label>
          <input type="email" className="form-control" name="email" value={inputValue.email} onChange={handleInput}/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail" className="form-label">Phone*</label>
          <input type="text" className="form-control" name="phone" value={inputValue.phone} onChange={handleInput}/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail" className="form-label">Password*</label>
          <input type="password" className="form-control" name="password" value={inputValue.password} onChange={handleInput}/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail" className="form-label">Confirm Password*</label>
          <input type="password" className="form-control" name="confirmpassword" value={inputValue.confirmpassword} onChange={handleInput}/>
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
    </div>
  )
}

export default Register