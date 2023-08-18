import React from "react";
import './WN.css';
import Card from '../Card/Card';

export default function WN() {
    return (
        <div>
            <div class="heading">
                <h1>WHAT'S NEWS</h1>
            </div>
            <div class="d-flex card-container justify-content-center">
                <Card/>
                <Card/>
                <Card/>
            </div>            
        </div>
    )
}