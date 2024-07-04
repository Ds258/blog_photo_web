import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";
import Loading from "../../components/common/Loading/Loading";

export default function Homepage() {
    const [sliders, setSliders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const blogSlider = async () => {
            try {
                const response = await fetch('http://localhost:8000/main/slider/');
                const data = await response.json();
                const parsedSliders = data.data.map(post => ({
                    ...post,
                    content: parseHTML(post.content) // Parse the HTML content
                }));
                setSliders(parsedSliders);
            } catch (err) {
                console.error(err.message);
            }
        }

        blogSlider();
    }, [])

    const parseHTML = (html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        return doc.body.textContent.trim();
    };

    const slugify = (title) => {
        return title
            .toLowerCase()
            .normalize('NFD') // Normalize to decomposed form
            .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
            .replace(/[đĐ]/g, 'd') // Replace đ with d
            .replace(/[^a-z0-9 -]/g, '') // Remove invalid characters
            .replace(/\s+/g, '-') // Collapse whitespace and replace by -
            .replace(/-+/g, '-'); // Collapse dashes
    }

    const redirectRead = (id_blog, title) => {
        const titleSlug = slugify(title);
        navigate(`/blog/${titleSlug}`, { state: { id_blog } });
    }



    return (
        <div>
            {sliders.length < 1 ? (
                <Loading />
            ) : (
                <div id="carousel" className="carousel slide" data-bs-ride="carousel">
                    {/* <!-- Indicators/dots --> */}
                    <div className="carousel-indicators">
                        {sliders.map((slider, index) => (
                            <button type="button" data-bs-target="#carousel" data-bs-slide-to={index} className={index === 0 ? "active" : ""}></button>
                        ))}
                    </div>
                    {/* The slideshow/carousel */}
                    <div className="carousel-inner">
                        {sliders.map((slider, index) => (
                            <div className={`carousel-item ${index === 0 ? "active" : ""}`} onClick={() => redirectRead(slider.id, slider.heading)}>
                                <img src={slider.heading_url} alt={`Slide ${index + 1}`} className="d-block w-100 imgSlider" />
                                <div className="carousel-caption">
                                    <h3>{slider.heading}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon"></span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
                        <span className="carousel-control-next-icon"></span>
                    </button>
                </div>
            )}

            <div>
                <div className="py-3 d-flex justify-content-center">
                    <h2>Discover your world</h2>
                </div>
                <div>
                    
                </div>
            </div>
        </div>
    )
}