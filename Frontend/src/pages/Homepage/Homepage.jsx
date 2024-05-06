import React from "react";
import Slider from "../../components/homepage/Slider/Slider";
import WN from "../../components/homepage/WN/WN";
import AboutUs from "../../components/homepage/AboutUs/AboutUs";
import Discovery from "../../components/homepage/Discovery/Discovery";
import Footer from "../../components/common/Footer/Footer";

export default function homepage() {
    return (
        <div>
            <Slider/>
            <WN/>
            <Discovery/>
            <AboutUs/>
            <Footer/>
        </div>
    )
}