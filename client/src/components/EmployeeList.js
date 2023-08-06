import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function EmployeeList() {
    const navigate = useNavigate()
    const [employees, setEmployees] = useState([])
    const token = localStorage.getItem('jwt')

    const auth = token;
      useEffect(() => {
       if(auth == null){
         navigate('/')
       }
      }, [auth])

    const headers ={
      "x-access-token": token
    }
    // axios.defaults.withCredentials = true;
    useEffect(() => {
      axios.get('http://localhost:5000/employees',{
        headers:headers
      })
      .then(({data}) => { 
        setEmployees(data)
      })
      .catch((error) => {
        if(error.response && (error.response.status === 401 || error.response.status === 302)){
          navigate('/')
        }
      })
    }, [])
    
    const deleteEmployee = (id) =>{
        axios.delete('http://localhost:5000/employees/delete-employee/'+id,{
          headers
        })
        .then(res => {
          if(res.status === 200){
            alert('Employee Deleted Successfully.')
            window.location.reload();
          }
        })
        .catch((err) => console.log(err))      
    }
  return (
    <div className='container'>
        <h3 className='text-center mt-4'>Employee List</h3>
        <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Address</th>
      <th colSpan={2}>Action</th>
    </tr>
  </thead>
  <tbody>
    {employees.data && employees.data.map((item, index) => {
        return(
            <tr key = {index}>
                <th scope="row">{index+1}</th>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.address}</td>
                <td><Link to= {`/edit-employee/${item._id}`}>Edit</Link></td>
                <td><Link onClick={() => deleteEmployee(item._id)}>Delete</Link></td>
            </tr>
        )
    })}
  </tbody>
</table>
    </div>
  )
}

export default EmployeeList