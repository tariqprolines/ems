import axios from 'axios'
import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'

function CreateEmployee() {
  const navigate = useNavigate();
  const [inputValue, setinputValue] = useState({
    name:'',
    email:'',
    address:'',
  })

  const handleInput = (e) =>{
    setinputValue({...inputValue,[e.target.name]:e.target.value})
  }

  const createSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: inputValue.name,
      email:inputValue.email,
      address: inputValue.address
    }
    axios.post('http://localhost:5000/employees/create-employee',data)
    .then((res) => { console.log('Employee created successfully.')  })
    .catch((err) => {console.log(err)})

    navigate('/')
  }
  return (
    <div className='container'>
      <h3 className='my-4 text-center'>Add New Employee</h3>
      <form method='post' onSubmit={createSubmit}>
        <div className="mb-3">
          <label className="form-label">Name*</label>
          <input type="text" className="form-control" name="name" onChange={handleInput} />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address*</label>
          <input type="email" className="form-control" name="email" onChange={handleInput}/>
        </div>
        <div className="mb-3">
          <label className="form-label">Address</label>
          <textarea className='form-control' name='address' onChange={handleInput}></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default CreateEmployee