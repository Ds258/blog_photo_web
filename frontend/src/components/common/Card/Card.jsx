import React from "react";
import './Card.css';

export default function Card(){
    return (
        <div className="card mb-3">
            <img src="https://wiki.warthunder.com/images/thumb/8/8c/GarageImage_T-55AMD-1.jpg/800px-GarageImage_T-55AMD-1.jpg" className="card-img-top image" alt="Thumbnail"/>
            <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text line-clamp-3">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <p className="card-text">Last updated 3 mins ago</p>
            </div>
        </div>
    )
}