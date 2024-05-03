import "./Login.css"
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import React, { useContext, useState } from "react";
import { Context } from "../../context/Context";

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { dispatch, isFetching } = useContext(Context);
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            username: username,
            password: password,
        };
        
        dispatch({type: "LOGIN_START"});

        try {
            const response = await axios.post('http://localhost:8000/user/signin/', data); //send request to django
            console.log(response.data);
            if (response.data.status === 'ok') { //if login is successfull
                navigate("/"); //navigate back to home page
                dispatch({type: "LOGIN_SUCCESS", payload: response.data});
            } else if (response.data.status === 'error') { // if login is failed
                alert("Invaild username or password"); // Show alert to user
                dispatch({type: "LOGIN_FAILURE"});
            }
        } catch (error) {
            console.error('An error occurred while logging in:', error);
            dispatch({type: "LOGIN_FAILURE"});
        }
    };
    

    return (
        <div className="text-center align-items-center login">
            <main className="form-signin">
                <form onSubmit={handleSubmit}>
                    <h1 className="h3 mb-3 fw-normal">Sign in</h1>
                    <div className="form-floating username">
                        <input type="text" className="form-control" id="floatingUsername" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <label htmlFor="floatingUsername">Username</label>
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
                    <button className="w-100 btn btn-lg btn-primary" type="submit" disabled={isFetching} style={{"marginBottom": "1rem"}}>Sign in</button>
                    <button className="w-100 btn btn-lg btn-primary" type="" disabled={isFetching}>Sign in with Google</button>
                    <h3 className="h6 mt-3 mb-2 fw-bold">Not a member yet? Sign up now</h3>
                    <Link to="/signup"><button className="w-100 btn btn-lg btn-danger" type="submit">Sign up</button></Link>
                    <p className="mt-5 mb-3 copyright">© 2024</p>
                </form>        
            </main>
        </div>
    )
}