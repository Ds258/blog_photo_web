import React from "react";
import './WN.css';
import Card from '../../common/Card/Card';

export default function WN() {
    return (
        <div className="WN">
            <div className="heading">
                <h1>WHAT'S NEWS</h1>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-6 col-md-4">
                        <Card/>
                    </div>
                    <div className="col-6 col-md-4">
                        <Card/>
                    </div>
                    <div className="col-6 col-md-4">
                        <Card/>
                    </div>
                </div>       
            </div>            
        </div>
    )
}