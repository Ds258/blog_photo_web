import React, { useContext, useEffect } from "react";
import './Navbar.css'
import { Link } from "react-router-dom";
import { Context } from "../../../context/Context";

export default function Navbar() {
    const { user, dispatch } = useContext(Context);

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
    }

    useEffect(() => {
        console.log(user);
    }, [user]);


    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <div style={{ width: "20%" }}>
                    <a className="navbar-brand" href="#">Live Blog</a>
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Blog</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Photo</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Posts</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">About</a>
                        </li>
                    </ul>
                </div>
                <div className="collapse navbar-collapse justify-content-end user" id="navbarSupportedContent">
                    {user ? (
                        <div class="dropdown dropdownUser">
                            <button class="btn buttonUser" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                <img className="userpic" src="https://www.kindpng.com/picc/m/563-5634840_cheems-doge-transparent-hd-png-download.png" alt="Cheems Doge Transparent, HD Png Download@kindpng.com" />
                                <span className="username">{user.username}</span>
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <Link to="/settings" style={{"textDecoration": "none"}}><li><a class="dropdown-item" href="">Settings</a></li></Link>
                                <li><a class="dropdown-item" href="" onClick={handleLogout}>{user && "Log out"}</a></li>
                            </ul>
                        </div>
                    ) : (
                        <ul className="linkPage">
                            <li>
                                <Link to="/signin" className="link"><span>Sign in</span></Link>
                            </li>
                            <li>
                                <Link to="/signup" className="link"><span>Sign up</span></Link>
                            </li>
                            {/* <li>
                                <Link to="/settings" className="link"><span>Settings</span></Link>
                            </li> */}
                        </ul>
                    )}
                </div>
            </div>
        </nav>
    )
}