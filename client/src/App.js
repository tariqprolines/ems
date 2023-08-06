import React from 'react'
import { Route, Routes} from 'react-router-dom'
import './App.css';
import EmployeeList from './components/EmployeeList';
import CreateEmployee from './components/CreateEmployee';
import EditEmployee from './components/EditEmployee'
import Menu from './components/Menu';
import About from './components/About';
import Contact from './components/Contact';
import Register from './components/Register';
import Login from './components/Login';
import Welcome from './components/Welcome';

function App() {
  return (
      <div>
        <Menu />
          <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/create-employee" element={<CreateEmployee />} />
              <Route path="/edit-employee/:id" element ={<EditEmployee />} />
              <Route path='/about' element={<About />} />
              <Route path='/contact-us' element={<Contact />} />
              <Route path='/register' element={<Register />} />
              <Route path='/employee-list' element={<EmployeeList />} />
              <Route path='/welcome' element={<Welcome/>} />
          </Routes>
    </div>
  );
}

export default App;
