import React from "react";
import './Slider.css';

export default function Slider() {
  return (
    <div id="carousel" className="carousel slide" data-bs-ride="carousel">
      {/* <!-- Indicators/dots --> */}
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#carousel" data-bs-slide-to="0" className="active"></button>
        <button type="button" data-bs-target="#carousel" data-bs-slide-to="1"></button>
        <button type="button" data-bs-target="#carousel" data-bs-slide-to="2"></button>
      </div>
      {/* The slideshow/carousel */}
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="https://www.kindpng.com/picc/m/563-5634840_cheems-doge-transparent-hd-png-download.png" alt="Slide 1" className="d-block w-100 imgSlider" />
          <div className="carousel-caption">
            <h3>Cheems</h3>
            <p>What do you expect</p>
          </div>
        </div>
        <div className="carousel-item">
          <img src="https://wiki.warthunder.com/images/thumb/b/bc/ArtImage_M60A3_TTS.png/800px-ArtImage_M60A3_TTS.png" alt="Slide 2" className="d-block w-100 imgSlider" />
          <div className="carousel-caption">
            <h3>M60 Patton</h3>
            <p>What do you expect</p>
          </div>
        </div>
        <div className="carousel-item">
          <img src="https://wiki.warthunder.com/images/thumb/8/8c/GarageImage_T-55AMD-1.jpg/800px-GarageImage_T-55AMD-1.jpg" alt="Slide 2" className="d-block w-100 imgSlider" />
          <div className="carousel-caption">
            <h3>T55 AMD</h3>
            <p>What do you expect</p>
          </div>
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon"></span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
        <span className="carousel-control-next-icon"></span>
      </button>
    </div>
  )
}