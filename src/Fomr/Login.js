import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
   const [values, setValues] = useState({
      email: '',
      password: ''
  });
  
  const navigate = useNavigate();
  const handleSubmit = (event) => {
      event.preventDefault();
      axios.post('http://localhost:8000/login', values)
          .then(res => {
              if(res.data.Status === "successs") {
                  // navigate('/');
                  console.log("Login done")
              } else {
                  // navigate('/login');
                  console.log("login failed")
                  // alert("Error");
              }
          })
          .then(err => console.log(err));           
  }
  return (
    <>
       <div>Login</div>
       <form onSubmit={handleSubmit}>
          <input type="text" placeholder='email' name='email' onChange={e => setValues({ ...values, email: e.target.value })}/>
          <input type="password" placeholder='password' name='password'onChange={e => setValues({ ...values, password: e.target.value })}/>
          <input type="submit" />
          <Link to='/register'>Create Account</Link>
       </form>
    </>
    )
}
