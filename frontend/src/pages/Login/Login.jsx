import "./Login.css"
import { Link } from "react-router-dom";
import axios from 'axios';
import React, { useEffect, useState } from "react";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            email: email,
            password: password
        };

        try {
            const response = await axios.post('http://localhost:8000/rest_api/login/', data);
            console.log(response.data);
        } catch (error) {
            console.error('An error occurred while logging in:', error);
        }
    };
    

    return (
        <div className="text-center align-items-center login">
            <main className="form-signin">
                <form onSubmit={handleSubmit}>
                    <h1 className="h3 mb-3 fw-normal">Sign in</h1>
                    <div className="form-floating email">
                        <input type="email" className="form-control" id="floatingEmail" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor="floatingEmail">Email Address</label>
                    </div>
                    <div className="form-floating password">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="name@example.com" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    <div className="checkbox mb-3">
                        <label>
                            <input type="checkbox" value="remember-me" /> Remember me
                        </label>
                    </div>
                </form>
                <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                <h3 className="h6 mt-3 mb-2 fw-bold">Not a member yet? Sign up now</h3>
                <Link to="/signup"><button className="w-100 btn btn-lg btn-danger" type="submit">Sign up</button></Link>
                <p className="mt-5 mb-3 copyright">© 2023</p>
            </main>
        </div>
    )
}