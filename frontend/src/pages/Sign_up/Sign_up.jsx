import React from "react";
import "./Sign_up.css"

export default function Signup() {
    return (
        <div className="text-center align-items-center signup">
            <main className="form-signup">
                <form>
                    <h1 className="h3 mb-3 fw-normal">Sign up</h1>
                    <div className="form-floating username">
                        <input type="text" className="form-control" id="floatingUser" placeholder="username" />
                        <label htmlFor="floatingUser">Username</label>
                    </div>
                    <div className="form-floating DOB">
                        <input type="date" className="form-control" id="floatingDOB" placeholder="Date of Birth" />
                        <label htmlFor="floatingDOB">Date of Birth</label>
                    </div>
                    <div className="form-floating email">
                        <input type="email" className="form-control" id="floatingEmail" placeholder="name@example.com" />
                        <label htmlFor="floatingEmail">Email Address</label>
                    </div>
                    <div className="form-floating password">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="name@example.com" />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                </form>
                <button className="w-100 btn btn-lg btn-primary" type="submit">Sign up</button>
                <h3 className="h6 mt-3 mb-2 fw-bold">Already have an account? Sign in now</h3>
                <button className="w-100 btn btn-lg btn-danger" type="submit">Sign in</button>
                <p className="mt-4 copyright">© 2023</p>
            </main>
        </div>
    )
}