import React, { useState, useEffect } from "react";
import { Input, InputGroup, CheckPicker } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import "./Blog.css";
import Card from "../../components/common/Card/Card";
import Loading from "../../components/common/Loading/Loading";

export default function Blog() {
    const [posts, setPosts] = useState([]);
    const [category, setCategory] = useState([]);
    const [chooseCate, setChooseCate] = useState();

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await fetch('http://localhost:8000/blog/category/');
                const data = await response.json();
                // setPosts(data.data);
                const transformedData = data.data.map(category => ({
                    value: category.id,  // or category.value, depending on your data structure
                    label: category.name  // or category.label, depending on your data structure
                }));
        
                setCategory(transformedData);
                // console.log(transformedData);
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

        fetchData();
        fetchCategory(); // Call the function inside useEffect
    }, []);

    const parseHTML = (html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        return doc.body.textContent.trim();
    };

    if (posts.length < 1) {
        return (
            <Loading />
        )
    }

    const searchPost = () => {
        console.log("search")
    }

    return (
        <main className="my-3">
            <div className="container">
                <section className="text-center">
                    <h2 className="py-5"><strong>Latest posts</strong></h2>
                    <div className="mb-4 d-flex">
                        <InputGroup style={{maxWidth: "50%"}}>
                            <Input />
                            <InputGroup.Button>
                                <SearchIcon onClick={searchPost()}/>
                            </InputGroup.Button>
                        </InputGroup>
                        <CheckPicker style={{width: "50%", marginLeft: "10px"}} data={category} block value={chooseCate} onChange={setChooseCate}/>
                    </div>
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
                            <a className="page-link" href="#!">2 <span className="sr-only"></span></a>
                        </li>
                        <li className="page-item"><a className="page-link" href="#!">3</a></li>
                        <li className="page-item">
                            <a className="page-link" href="#!">Next</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </main>
    )
}