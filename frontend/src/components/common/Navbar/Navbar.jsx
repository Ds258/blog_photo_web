import React from "react";
import './Navbar.css'
import { Link } from "react-router-dom";

export default function Navbar() {
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
                            <a className="nav-link" href="#">Home</a>
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
                    <img className="userpic" src="https://www.kindpng.com/picc/m/563-5634840_cheems-doge-transparent-hd-png-download.png" alt="Cheems Doge Transparent, HD Png Download@kindpng.com" />
                    <Link to="/login"><span className="username">Bim Cà chua</span></Link>
                </div>
            </div>
        </nav>
    )
}