import React from "react";
import "./Discovery.css";

export default function Discovery() {
    return (
        <div class="d-flex discovery">
            <div class="d-flex flex-column justify-content-center learn bg-dark">
                <div class="DisHead">
                    <h1>DISCOVERY THE LATEST PHOTO</h1>
                </div>
                <div class="button">
                    <button>Learn more</button>
                </div>
            </div>
            <div class="picture">
                <img src="https://www.kindpng.com/picc/m/563-5634840_cheems-doge-transparent-hd-png-download.png" class="DisImg" alt="Thumbnail"/>
            </div>
        </div>
    )
}