import React from "react";
import './Card.css';
import { useNavigate } from "react-router-dom";

export default function Card({ id_blog, heading_url, title, content }) {
    const navigate = useNavigate();

    const redirectBlog = () => {
        const titleSlug = slugify(title);        
        navigate(`/blog/${titleSlug}`, {state: {id_blog}});
    }

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

    return (
        <div class="card">
            <div class="bg-image hover-overlay">
                <img src={heading_url} class="head-img" alt="" width={300} height={300} />
                <a href="#!">
                    <div class="mask" style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}></div>
                </a>
            </div>
            <div class="card-body">
                <h5 class="card-title">{title}</h5>
                <p class="content-text line-clamp-3">
                    {content}
                </p>
                <button class="btn btn-primary mt-2" onClick={redirectBlog}>Read</button>
            </div>
        </div>
    )
}