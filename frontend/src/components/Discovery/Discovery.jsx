import React from "react";
import "./Discovery.css";

export default function Discovery() {
    return (
        <div class="container-fluid DisHeight">
            <div class="row bg-dark align-items-center">
                <div class="col-4">
                    <div class="DisHead">
                        <h1>DISCOVERY THE LATEST PHOTO</h1>
                    </div>
                    <div class="button">
                        <button>Learn more</button>
                    </div>
                </div>
                <div class="col-8 DisImg nopadding">
                    <img src="https://www.kindpng.com/picc/m/563-5634840_cheems-doge-transparent-hd-png-download.png" class="DisImg" alt="Thumbnail" />
                </div>
            </div>
        </div>
    )
}