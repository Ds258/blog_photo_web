import React, { useContext, useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from "react-router-dom";
import './EditBlog.css';
import JoditEditor, { Jodit } from 'jodit-react';
import axios from 'axios';
import { Context } from "../../context/Context";
import { CheckPicker } from 'rsuite';

export default function CreateBlog() {
    const { user } = useContext(Context);
    const [acceptedFiles, setAcceptedFiles] = useState([]);
    const [preview, setPreview] = useState(null);
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const [contentImage, setContentImage] = useState([]);
    const location = useLocation();
    const { id_blog } = location.state || {};
    const [post, setPost] = useState([]);
    const [category, setCategory] = useState([]);
    const [chooseCate, setChooseCate] = useState();

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
        extraButtons: ["uploadImage"]
    };


    Jodit.defaultOptions.controls.uploadImage = {
        name: 'Upload image to Cloudinary',
        exec: (async (editor) => {
            await imageUpload(editor);
        })
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


    const handleEdit = async (event) => {
        const data = {}
  
        if (acceptedFiles.length > 0) {
            const headImage = await FileUpload(acceptedFiles[0]);
            data["headImage"] = headImage.url;
        }
        

        if (title != null) {
            data["heading"] = title;
        }

        if (content != null) {
            data["content"] = content;
        }

        if (chooseCate != null) {
            data["category"] = chooseCate;
        }

        try {
            const response = await axios.post('http://localhost:8000/blog/edit/' + id_blog + "/", data);
            console.log(response.data);
            if (response.data.status === 'success') {
                alert("Edit successfully");
                navigate("/post_blog/")
            } else if (response.data.status === 'unsuccess') {
                alert(response.data.message);
            }
        } catch (error) {
            console.error('An error occurred while changing settings:', error);
            alert("Error");
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/blog/view/' + id_blog + "/");
                const data = await response.json();
                setPost(data.data);
                const selectedCategories = data.data.categories.map(category => category.id); // or category.value
                setChooseCate(selectedCategories);
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

        fetchData();
        fetchCategory(); // Call the function inside useEffect
    }, [id_blog]);

    return (
        <div className="container" style={{ marginTop: '2rem', minHeight: '50vh' }}>
            <h1 className="text-center py-3">Edit your blog</h1>
            <div>
                <div {...getRootProps({ className: `dropzone ${isDragActive ? 'active' : ''}` })}>
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <p>Drop the files here ...</p>
                    ) : (preview ? (
                            <img src={preview} alt="Preview" className="preview-image" />
                        ) : (
                            <img src={post.heading_url} alt="Preview" className="preview-image" />
                        )
                    )}
                </div>
                <br />
                <div>
                    <div className="">
                        <textarea id="title" className="form-control form-control-lg" rows={3} placeholder="Title" maxLength={200} defaultValue={post.heading} onChange={(e) => setTitle(e.target.value)}></textarea>
                    </div>
                    <div className="py-3">
                        <h4>Category</h4>
                        <br/>
                        <CheckPicker data={category} defaultValue={chooseCate} block value={chooseCate} onChange={setChooseCate}/>
                    </div>
                    <div>
                        <JoditEditor
                            config={editorConfig}
                            value={post.content}
                            onChange={newContent => setContent(newContent)}
                        />
                    </div>
                </div>
                <br />
                <div>
                    <button type="button" class="btn btn-primary" onClick={handleEdit}>Save</button>
                </div>
                <br />
            </div>
        </div>

    )
}