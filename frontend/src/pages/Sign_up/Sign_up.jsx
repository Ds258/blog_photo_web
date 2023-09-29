import "./Sign_up.css"
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from 'axios';

export default function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [DOB, setDOB] = useState('')
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            username: username,
            password: password,
            email: email,
            DOB: DOB
        };

        try {
            const response = await axios.post('http://localhost:8000/api/signup/', data);
            console.log(response.data);
            if(response.data.status === 'success') {
                navigate("/signin");
            }
        } catch (error) {
            console.error('An error occurred while logging in:', error);
        }
    };

    return (
        <div className="text-center align-items-center signup">
            <main className="form-signup">
                <form onSubmit={handleSubmit}>
                    <h1 className="h3 mb-3 fw-normal">Sign up</h1>
                    <div className="form-floating username">
                        <input type="text" className="form-control" id="floatingUser" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <label htmlFor="floatingUser">Username</label>
                    </div>
                    <div className="form-floating DOB">
                        <input type="date" className="form-control" id="floatingDOB" placeholder="Date of Birth" value={DOB} onChange={(e) => setDOB(e.target.value)} />
                        <label htmlFor="floatingDOB">Date of Birth</label>
                    </div>
                    <div className="form-floating email">
                        <input type="email" className="form-control" id="floatingEmail" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor="floatingEmail">Email Address</label>
                    </div>
                    <div className="form-floating password">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="123456" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Sign up</button>
                    <h3 className="h6 mt-3 mb-2 fw-bold">Already have an account? Sign in now</h3>
                    <Link to="/signin"><button className="w-100 btn btn-lg btn-danger" type="submit">Sign in</button></Link>
                    <p className="mt-4 copyright">© 2023</p>
                </form>

            </main>
        </div>
    )
}