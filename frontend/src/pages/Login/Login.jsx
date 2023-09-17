import React from "react";
import "./Login.css"

export default function Login() {
    // axios.post('/login', {
        
    // });

    return (
        <div className="text-center align-items-center login">
            <main className="form-signin">
                <form>
                    <h1 className="h3 mb-3 fw-normal">Sign in</h1>
                    <div className="form-floating email">
                        <input type="email" className="form-control" id="floatingEmail" placeholder="name@example.com" />
                        <label htmlFor="floatingEmail">Email Address</label>
                    </div>
                    <div className="form-floating password">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="name@example.com" />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    <div class="checkbox mb-3">
                        <label>
                            <input type="checkbox" value="remember-me" /> Remember me
                        </label>
                    </div>
                </form>
                <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                <h3 className="h6 mt-3 mb-2 fw-bold">Not a member yet? Sign up now</h3>
                <button className="w-100 btn btn-lg btn-danger" type="submit">Sign up</button>
                <p className="mt-5 mb-3 copyright">© 2023</p>
            </main>
        </div>
    )
}