import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Home() {
    const [auth, setAuth] = useState(false);
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();
   
    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http://localhost:8000')
            .then(res => {
                if (res.data.Status === "Success") {
                    setAuth(true);
                    setName(res.data.name);
                } else {
                    setAuth(false);
                    alert("Error");
                    setMessage(res.data.Error);
                }
            })
            .catch(err => console.log(err));
    }, []);

    const handleLogout = () => {
        // Your logout logic here
    };

    return (
        <>
            {auth ? (
                <div>
                    <h3>Your are authorized --- {name}</h3>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div>
                    <h3>{message}</h3>
                    <h3>Login Now</h3>
                    <Link to="/login">Login</Link>
                </div>
            )}
        </>
    );
}
