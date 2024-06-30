import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import parse from 'html-react-parser';
import moment from 'moment';
import './ReadBlog.css';
import Loading from "../../components/common/Loading/Loading";

export default function ReadBlog() {
    const location = useLocation();
    const { id_blog } = location.state || {}; // Access id_blog from state
    const [blogContent, setBlogContent] = useState(null);

    useEffect(() => {
        if (id_blog) {
            const fetchData = async () => {
                try {
                    const response = await fetch(`http://localhost:8000/blog/view/${id_blog}`)
                    const data = await response.json();
                    setBlogContent(data.data);
                } catch (err) {
                    console.error(err.message);
                }
            }

            fetchData();
        }
    }, [id_blog])

    if (!blogContent) {
        return (
            <Loading/>
        )
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-lg-8">
                    <article>
                        <header className="mb-4">
                            <h1 className="fw-bolder mb-1">{blogContent.heading}</h1>
                            <div className="text-muted fst-italic mb-2">Posted on {moment(blogContent.created_at).format('MMMM Do YYYY')}</div>
                            <a className="badge bg-secondary text-decoration-none link-light" href="#!">Web Design</a>
                            <a className="badge bg-secondary text-decoration-none link-light" href="#!">Freebies</a>
                        </header>
                        <figure className="mb-4"><img className="heading-img rounded" src={blogContent.heading_url} alt={blogContent.heading}/></figure>
                        <section className="mb-5">
                            {parse(blogContent.content)}
                        </section>
                        <footer className="d-flex justify-content-end">
                            <h5 className="mb-3 fst-italic">Written by {blogContent.author}</h5>
                        </footer>
                    </article>
                    <section className="mb-5">
                        <div className="card bg-light">
                            <div className="card-body">
                                <form className="mb-4"><textarea className="form-control" rows="3" placeholder="Join the discussion and leave a comment!"></textarea></form>
                                <div className="d-flex mb-4">
                                    <div className="flex-shrink-0"><img className="rounded-circle" src="https://dummyimage.com/50x50/ced4da/6c757d.jpg" alt="..." /></div>
                                    <div className="ms-3">
                                        <div className="fw-bold">Commenter Name</div>
                                        If you're going to lead a space frontier, it has to be government; it'll never be private enterprise. Because the space frontier is dangerous, and it's expensive, and it has unquantified risks.
                                        <div className="d-flex mt-4">
                                            <div className="flex-shrink-0"><img className="rounded-circle" src="https://dummyimage.com/50x50/ced4da/6c757d.jpg" alt="..." /></div>
                                            <div className="ms-3">
                                                <div className="fw-bold">Commenter Name</div>
                                                And under those conditions, you cannot establish a capital-market evaluation of that enterprise. You can't get investors.
                                            </div>
                                        </div>
                                        <div className="d-flex mt-4">
                                            <div className="flex-shrink-0"><img className="rounded-circle" src="https://dummyimage.com/50x50/ced4da/6c757d.jpg" alt="..." /></div>
                                            <div className="ms-3">
                                                <div className="fw-bold">Commenter Name</div>
                                                When you put money directly to a problem, it makes a good headline.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div className="flex-shrink-0"><img className="rounded-circle" src="https://dummyimage.com/50x50/ced4da/6c757d.jpg" alt="..." /></div>
                                    <div className="ms-3">
                                        <div className="fw-bold">Commenter Name</div>
                                        When I look at the universe and all the ways the universe wants to kill us, I find it hard to reconcile that with statements of beneficence.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <div className="col-lg-4">
                    <div className="card mb-4">
                        <div className="card-header">Search</div>
                        <div className="card-body">
                            <div className="input-group">
                                <input className="form-control" type="text" placeholder="Enter search term..." aria-label="Enter search term..." aria-describedby="button-search" />
                                <button className="btn btn-primary" id="button-search" type="button">Go!</button>
                            </div>
                        </div>
                    </div>
                    <div className="card mb-4">
                        <div className="card-header">Categories</div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-6">
                                    <ul className="list-unstyled mb-0">
                                        <li><a href="#!">Web Design</a></li>
                                        <li><a href="#!">HTML</a></li>
                                        <li><a href="#!">Freebies</a></li>
                                    </ul>
                                </div>
                                <div className="col-sm-6">
                                    <ul className="list-unstyled mb-0">
                                        <li><a href="#!">JavaScript</a></li>
                                        <li><a href="#!">CSS</a></li>
                                        <li><a href="#!">Tutorials</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card mb-4">
                        <div className="card-header">Side Widget</div>
                        <div className="card-body">You can put anything you want inside of these side widgets. They are easy to use, and feature the Bootstrap 5 card component!</div>
                    </div>
                </div>
            </div>
        </div>
    )
}