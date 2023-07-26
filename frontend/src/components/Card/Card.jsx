import React from "react";
import './Card.css';

export default function Card(){
    return (
        <div class="card mb-3" style={{width: "20rem"}}>
            <img src="https://wiki.warthunder.com/images/thumb/8/8c/GarageImage_T-55AMD-1.jpg/800px-GarageImage_T-55AMD-1.jpg" class="card-img-top" alt="Thumbnail"/>
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text line-clamp-3">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <p class="card-text">Last updated 3 mins ago</p>
            </div>
        </div>
    )
}