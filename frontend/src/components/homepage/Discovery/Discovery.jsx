import React from "react";
import "./Discovery.css";

export default function Discovery() {
    return (
        <div className="container-fluid DisHeight">
            <div className="row bg-dark align-items-center">
                <div className="col-4">
                    <div className="DisHead">
                        <h1>DISCOVERY THE LATEST PHOTO</h1>
                    </div>
                    <div className="button">
                        <button className="click">Learn more</button>
                    </div>
                </div>
                <div className="col-8 DisImg nopadding">
                    <img src="https://www.kindpng.com/picc/m/563-5634840_cheems-doge-transparent-hd-png-download.png" className="DisImg" alt="Thumbnail" />
                </div>
            </div>
        </div>
    )
}