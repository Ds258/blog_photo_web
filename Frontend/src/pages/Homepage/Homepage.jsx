import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";
import Loading from "../../components/common/Loading/Loading";
import Card from "../../components/common/Card/Card";

export default function Homepage() {
    const [sliders, setSliders] = useState([]);
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);

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

        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/blog/index/');
                const data = await response.json();
                // setPosts(data.data);
                const parsedPosts = data.data.map(post => ({
                    ...post,
                    content: parseHTML(post.content) // Parse the HTML content
                }));
                setPosts(parsedPosts);
            } catch (err) {
                console.error(err.message);
            }
        };

        blogSlider();
        fetchData();
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
                <main>
                    <div className="container">
                        <section className="text-center">
                            <div className="row">
                                {posts.map((post, index) => (
                                    <div className="col-lg-4 col-md-12 mb-4">
                                        <Card
                                            id_blog={post.id}
                                            heading_url={post.heading_url}
                                            title={post.heading}
                                            content={post.content}
                                        />
                                    </div>
                                ))}
                            </div>
                        </section>

                        <nav className="my-4" aria-label="...">
                            <ul className="pagination pagination-circle justify-content-center">
                                <li className="page-item">
                                    <a className="page-link" href="#!" tabindex="-1" aria-disabled="true">Previous</a>
                                </li>
                                <li className="page-item"><a class="page-link" href="#!">1</a></li>
                                <li className="page-item active" aria-current="page">
                                    <a className="page-link" href="#!">2 <span class="sr-only"></span></a>
                                </li>
                                <li className="page-item"><a class="page-link" href="#!">3</a></li>
                                <li className="page-item">
                                    <a className="page-link" href="#!">Next</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </main>
            </div>
        </div>
    )
}