import React,{useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()
    const [inputValue, setInputValue] = useState({
        email:'',
        password:''
    })
    const handleInput = (e) => {
        setInputValue({...inputValue,[e.target.name]:e.target.value})
    }
    const loginSubmit = (e) => {
        e.preventDefault();
        const data = {
          email: inputValue.email,
          password:inputValue.password
        }
        if(data.email !== '' || data.password !== ''){
         axios.post('http://localhost:5000/auth/login',data)
        .then((res) => { 
          localStorage.setItem('jwt',res.data.token)
          navigate('/welcome')
        })
        .catch((err) => {
           let statusCode = err.response.data.status
           console.log(statusCode)
           if(statusCode === 400){
            alert('Password is wrong.')
           }
           if(statusCode === 401){
            alert('Invide Credentials.')
           }
          })
        }
        else
        {
          alert('All Fields are mandatory.');
        }
        
    }
  return (
    <div>
    <div className='container'>
      <h3 className='my-4 text-center'>Login User</h3>
      <form method='post' onSubmit={loginSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail" className="form-label">Email address*</label>
          <input type="email" className="form-control" name="email" value={inputValue.email} onChange={handleInput}/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail" className="form-label">Password*</label>
          <input type="password" className="form-control" name="password" value={inputValue.password} onChange={handleInput}/>
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
    </div>
  )
}

export default Login