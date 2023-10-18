import React from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <>
       <div>Login</div>
       <form action="">
          <input type="text" placeholder='email' name='email'/>
          <input type="password" placeholder='password' name='password'/>
          <input type="submit" />
          <Link to='/register'>Create Account</Link>
       </form>
    </>
    )
}
