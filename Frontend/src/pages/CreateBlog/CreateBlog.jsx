import React, { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from 'react-dropzone';
import './CreateBlog.css';
import JoditEditor, { Jodit } from 'jodit-react';
import axios from 'axios';
import { Context } from "../../context/Context";
import Loading from "../../components/common/Loading/Loading";
import { CheckPicker } from 'rsuite';


export default function CreateBlog() {
    const { user } = useContext(Context);
    const [acceptedFiles, setAcceptedFiles] = useState([]);
    const [preview, setPreview] = useState(null);
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const [contentImage, setContentImage] = useState([]);
    const [posts, setPosts] = useState([]);
    const [category, setCategory] = useState([]);
    const [chooseCate, setChooseCate] = useState();
    const editor = useRef(null);

    const navigate = useNavigate();

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: 'image/*', // Allow only image uploads
        onDrop: acceptedFiles => {
            const file = acceptedFiles[0];
            const previewUrl = URL.createObjectURL(file);
            setAcceptedFiles(acceptedFiles);
            setPreview(previewUrl);
        },
    });

    const editorConfig = {
        readonly: false,
        toolbar: true,
        spellcheck: true,
        language: "en",
        toolbarButtonSize: "medium",
        toolbarAdaptive: false,
        showCharsCounter: true,
        showWordsCounter: true,
        showXPathInStatusbar: false,
        askBeforePasteHTML: true,
        askBeforePasteFromWord: true,
        //defaultActionOnPaste: "insert_clear_html",
        uploader: {
            insertImageAsBase64URI: true
        },
        extraButtons: ["uploadImage"],
        events: {
            beforePaste: (event) => handlePaste(event, editor.current)
        }
    };


    Jodit.defaultOptions.controls.uploadImage = {
        name: 'Upload image to Cloudinary',
        exec: (async (editor) => {
            await imageUpload(editor);
        })
    };

    const handlePaste = async (event, editor) => {
        const clipboardData = event.clipboardData;
        const items = clipboardData.items;

        for (let i = 0; i < items.length; i++) {
            const item = items[i];

            if (item.kind === 'file' && item.type.startsWith('image/')) {
                const file = item.getAsFile();

                if (file) {
                    event.preventDefault(); // Prevent the default paste behavior

                    const imageUrl = await imageUpload(file);

                    if (imageUrl) {
                        editor.selection.insertHTML(`<img src="${imageUrl}" alt="Uploaded Image"/>`);
                    }
                }
            }
        }
    };

    const imageUpload = (editor) => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async function () {

            const imageFile = input.files[0];
            console.log(imageFile);
            if (!imageFile) {
                return;
            }

            if (!imageFile.name.match(/\.(jpg|jpeg|png)$/)) {
                return;
            }

            const imageInfo = await FileUpload(imageFile);;

            insertImage(editor, imageInfo.url);
            setContentImage([...contentImage, imageInfo.url]);
        };
    }

    //this method insert the image inside the editor after the upload is done.
    const insertImage = (editor, url) => {
        const image = editor.selection.j.createInside.element('img');
        image.setAttribute('src', url);
        editor.selection.insertNode(image);
    }

    // this method send the image to cloudinary
    const FileUpload = async (file) => {
        let result = null;

        let formData = new FormData();
        formData.append('file', file);
        formData.append("upload_preset", "fokolbfy");
        formData.append("folder", "Blog_Photo_Website/Blog");
        formData.append("api_key", "135497366991663");

        await fetch(`https://api.cloudinary.com/v1_1/dvi9ihpbc/upload/`, {
            method: 'POST',
            body: formData
        }).then((response) => response.json())
            .then((data) => {
                result = data;
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        return result;
    }


    const handlePost = async (event) => {
        if (preview == null || acceptedFiles == null) {
            alert("Heading image must not be empty");
            return
        }

        console.log(acceptedFiles)
        const headImage = await FileUpload(acceptedFiles[0]);

        if (title == null) {
            alert("Please fill the Title");
            return
        }

        if (category.length < 1) {
            alert("Please choose at least one cateogry");
            return
        }


        const data = {
            id_user: user.data.id,
            username: user.data.username,
            title: title,
            headImage: headImage.url,
            category: chooseCate,
            content: content,
            contentImage: contentImage,
        }

        try {
            const response = await axios.post('http://localhost:8000/blog/post/', data);
            console.log(response.data);
            if (response.data.status === 'success') {
                alert("Upload successfully");
                navigate("/blog/");
            } else if (response.data.status === 'unsuccess') {
                alert(response.data.message);
            }
        } catch (error) {
            console.error('An error occurred while changing settings:', error);
            alert("Error");
        }
    }

    const parseHTML = (html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        return doc.body.textContent.trim();
    };

    const redirectRead = (id_blog, title) => {
        const titleSlug = slugify(title);
        navigate(`/blog/${titleSlug}`, { state: { id_blog } });
    }

    const redirectEdit = (id_blog, title) => {
        const titleSlug = slugify(title);
        navigate(`/edit_blog/${titleSlug}`, { state: { id_blog } });
    }

    const deleteBlog = async (id_blog) => {
        try {
            const response = await axios.post('http://localhost:8000/blog/delete/' + id_blog);
            if (response.data.status === "success") {
                alert("Delete successfully");
                window.location.reload();
            }
        } catch (err) {
            console.error(err.message);
        }
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


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/blog/user_blog/' + user.data.id);
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
                console.log(transformedData);
            } catch (err) {
                console.error(err.message);
            }
        }

        fetchData(); // Call the function inside useEffect
        fetchCategory();
    }, [user.data.id]);

    return (
        <div className="container" style={{ marginTop: '2rem', minHeight: '50vh' }}>
            <ul className="nav nav-tabs">
                <li className="nav-item"><a className="nav-link active" data-bs-toggle="tab" href="#create">Create new Blog</a></li>
                <li className="nav-item"><a className="nav-link" data-bs-toggle="tab" href="#edit">Your Blogs</a></li>
            </ul>
            <div className="tab-content">
                <div id="create" className="tab-pane fade show active">
                    <h1 className="text-center py-3">Create your blog</h1>
                    <div>
                        <div {...getRootProps({ className: `dropzone ${isDragActive ? 'active' : ''}` })}>
                            <input {...getInputProps()} />
                            {isDragActive ?
                                <p>Drop the files here ...</p> :
                                (preview ?
                                    <img src={preview} alt="Preview" className="preview-image" /> :
                                    <p>Drag 'n' drop some files here, or click to select files</p>
                                )
                            }
                        </div>
                        <br />
                        <div>
                            <div className="">
                                <textarea id="title" className="form-control form-control-lg" rows={3} placeholder="Title" maxLength={200} onChange={(e) => setTitle(e.target.value)} />
                            </div>
                            <div className="py-3">
                                <h4>Category</h4>
                                <br/>
                                <CheckPicker data={category} block onChange={value => setChooseCate(value)}/>
                            </div>
                            {chooseCate}
                            <div>
                                <JoditEditor
                                    config={editorConfig}
                                    onBlur={newContent => setContent(newContent)}
                                />
                            </div>
                        </div>
                        <br />
                        <div>
                            <button type="button" class="btn btn-primary" onClick={handlePost}>Post your blog</button>
                        </div>
                        <br />
                    </div>
                </div>
                <div id="edit" class="tab-pane fade">
                    <h1 className="text-center py-3">Your Blogs</h1>
                    <div className="row">
                        {posts ? (posts.map((post, index) => (
                            <div className="col-lg-6 col-md-12">
                                <div class="card mb-3">
                                    <div class="row g-0">
                                        <div class="col-md-4">
                                            <div class="img-container">
                                                <img src={post.heading_url} class="rounded-start head-img" alt={post.heading} height={254} />
                                            </div>
                                        </div>
                                        <div class="col-md-8">
                                            <div class="card-body">
                                                <h5 class="card-title">{post.heading}</h5>
                                                <p class="card-text line-clamp-3">{post.content}</p>
                                                <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
                                                <div className="d-flex">
                                                    <button className="btn btn-primary me-2" onClick={() => redirectRead(post.id, post.heading)}>Read</button> {/* Add "()" to prevent auto trigger */}
                                                    <button className="btn btn-warning me-2" onClick={() => redirectEdit(post.id, post.heading)}>Edit</button>
                                                    <button className="btn btn-danger" onClick={() => deleteBlog(post.id)}>Delete</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))) : (
                            <Loading />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}