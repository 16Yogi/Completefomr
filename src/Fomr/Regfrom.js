import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Regfrom() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    });
    
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8000/register', values)
            .then(res => {
                if(res.data.Status === "successs") {
                    navigate('/login');
                    console.log("Login done")
                } else {
                    navigate('/login');
                    console.log("login failed")
                    // alert("Error");
                }
            })
            .then(err => console.log(err));           
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Name' name='name' onChange={e => setValues({ ...values, name: e.target.value })} />
                <input type="text" placeholder='email' name='email' onChange={e => setValues({ ...values, email: e.target.value })} />
                <input type="password" placeholder='password' name='password' onChange={e => setValues({ ...values, password: e.target.value })} />
                <input type="submit" name='submit' value='submit' />
                <Link to='/login'>Login here</Link>
            </form>
        </>
    );
}
