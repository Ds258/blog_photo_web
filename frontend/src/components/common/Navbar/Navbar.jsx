import React from "react";
import './Navbar.css'
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
                <div style={{ width: "20%" }}>
                    <a class="navbar-brand" href="#">Live Blog</a>
                </div>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <a class="nav-link" href="#">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Blog</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Photo</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Posts</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">About</a>
                        </li>
                    </ul>
                </div>
                <div class="collapse navbar-collapse justify-content-end user" id="navbarSupportedContent">
                    <img class="userpic" src="https://www.kindpng.com/picc/m/563-5634840_cheems-doge-transparent-hd-png-download.png" alt="Cheems Doge Transparent, HD Png Download@kindpng.com" />
                    <Link to="/login"><span class="username">Bim Cà chua</span></Link>
                </div>
            </div>
        </nav>
    )
}