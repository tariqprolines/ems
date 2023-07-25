import React,{useState} from 'react'
import axios from 'axios'

function Contact() {
  const [inputValue, setInputValue] = useState({
    name:'',
    email:'',
    mobile:'',
    comment:''
  })
  const handleInput = (e) => {
    setInputValue({...inputValue,[e.target.name]:e.target.value})
  }
  const contactSubmit = (e) => {
    e.preventDefault()
    const data = {
      name:inputValue.name,
      email:inputValue.email,
      mobile:inputValue.mobile,
      comment:inputValue.comment
    }
    axios.post('http://localhost:5000/contact',data)
    .then(res => {
      if(res.status === 200){
        alert('Thank You, your query has been submitted, our representative connect you shortly.')
      }
      setInputValue({name:'',email:'',mobile:'',comment:''})
    })
    .catch((err) => console.log(err))
  }
  return (
    <div>
    <div className='container'>
      <h3 className='my-4 text-center'>Contact Us</h3>
      <form method='post' onSubmit={contactSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputName" className="form-label">Name*</label>
          <input type="text" className="form-control" name="name" value={inputValue.name} onChange={handleInput} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail" className="form-label">Email address*</label>
          <input type="email" className="form-control" name="email" value={inputValue.email} onChange={handleInput}/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail" className="form-label">Mobile*</label>
          <input type="text" className="form-control" name="mobile" value={inputValue.mobile} onChange={handleInput}/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail" className="form-label">Comment</label>
          <textarea className='form-control' name='comment' onChange={handleInput} value={inputValue.comment}></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Send</button>
      </form>
    </div>
    </div>
  )
}

export default Contact