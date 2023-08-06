import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import ReactPaginate from 'react-paginate';

function EmployeeList() {
  const navigate = useNavigate()
  // const [offset, setOffset] = useState(0);
  const [employees, setEmployees] = useState([])
  // const [perPage] = useState(10);
  // const [pageCount, setPageCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 10;
  const token = localStorage.getItem('jwt')

  const auth = token;
  useEffect(() => {
    if (auth == null) {
      navigate('/')
    }
  }, [auth])

  const headers = {
    "x-access-token": token
  }

  const getData = async () => {
    try {
      const res = await axios.get('http://localhost:5000/employees', {
        headers: headers
      })
      const data = res.data.data;
      const subset = data.slice(startIndex, endIndex);
      const postData = subset.map((item, index) =>
        <tr key={(currentPage*itemsPerPage) + index+1}>
          <th scope="row">{(currentPage*itemsPerPage) + index+1}</th>
          <td>{item.name}</td>
          <td>{item.email}</td>
          <td>{item.address}</td>
          <td><Link to={`/edit-employee/${item._id}`}>Edit</Link></td>
          <td><Link onClick={() => deleteEmployee(item._id)}>Delete</Link></td>
        </tr>)
      setEmployees(postData)
      // setPageCount(Math.ceil(data.length / perPage))
      setTotalPages(Math.ceil(data.length / itemsPerPage));
      // console.log(pageCount + "count")
    } catch (error) {
      console.log(error)
    }
  }

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
 

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  useEffect(() => {
    getData()
  }, [currentPage])

  // Delete Component

  const deleteEmployee = (id) => {
    axios.delete('http://localhost:5000/employees/delete-employee/' + id, {
      headers
    })
      .then(res => {
        if (res.status === 200) {
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
          {employees}
          
        </tbody>
        
      </table>
      <ReactPaginate
            previousLabel={"← Previous"}
            nextLabel={"Next →"}
            pageCount={totalPages}
            onPageChange={handlePageChange}
            containerClassName={"pagination"}
            previousLinkClassName={"pagination__link"}
            nextLinkClassName={"pagination__link"}
            disabledClassName={"pagination__link--disabled"}
            activeClassName={"pagination__link--active"}
      />
    </div>
  )
}



export default EmployeeList