import React, { useState, useEffect } from "react";
import "./Blog.css";
import Card from "../../components/common/Card/Card";
import Loading from "../../components/common/Loading/Loading";

export default function Blog() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchData(); // Call the function inside useEffect
    }, []);

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

    const parseHTML = (html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        return doc.body.textContent.trim();
    };

    if (posts.length < 1) {
        return (
            <Loading/>
        )
    }

    return (
        <main class="my-5">
            <div class="container">
                <section class="text-center">
                    <h4 class="mb-5"><strong>Latest posts</strong></h4>
                    <div class="row">
                        {posts.map((post, index) => (
                            <div class="col-lg-4 col-md-12 mb-4">
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

                <nav class="my-4" aria-label="...">
                    <ul class="pagination pagination-circle justify-content-center">
                        <li class="page-item">
                            <a class="page-link" href="#!" tabindex="-1" aria-disabled="true">Previous</a>
                        </li>
                        <li class="page-item"><a class="page-link" href="#!">1</a></li>
                        <li class="page-item active" aria-current="page">
                            <a class="page-link" href="#!">2 <span class="sr-only"></span></a>
                        </li>
                        <li class="page-item"><a class="page-link" href="#!">3</a></li>
                        <li class="page-item">
                            <a class="page-link" href="#!">Next</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </main>
    )
}