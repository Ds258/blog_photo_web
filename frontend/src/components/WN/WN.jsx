import React from "react";
import './WN.css';
import Card from '../Card/Card';

export default function WN() {
    return (
        <div class="WN">
            <div class="heading">
                <h1>WHAT'S NEWS</h1>
            </div>
            <div class="d-flex container justify-content-center">
                <div class="row">
                    <div class="col-6 col-md-4">
                        <Card/>
                    </div>
                    <div class="col-6 col-md-4">
                        <Card/>
                    </div>
                    <div class="col-6 col-md-4">
                        <Card/>
                    </div>
                </div>       
            </div>            
        </div>
    )
}