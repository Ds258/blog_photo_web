import React, { useContext, useState } from "react";
import { useDropzone } from 'react-dropzone';
import './CreateBlog.css';
import JoditEditor, { Jodit } from 'jodit-react';
import axios from 'axios';
import { Context } from "../../context/Context";

export default function CreateBlog() {
    const { user } = useContext(Context);
    const [acceptedFiles, setAcceptedFiles] = useState([]);
    const [preview, setPreview] = useState(null);
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const [contentImage, setContentImage] = useState([]);

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
        height: 500,
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

        const data = {
            id_user: user.data.id,
            username: user.data.username,
            title: title,
            headImage: headImage.url,
            content: content,
            contentImage: contentImage,
        }

        try {
            const response = await axios.post('http://localhost:8000/blog/post/', data);
            console.log(response.data);
            if (response.data.status === 'success') {
                alert("Upload successfully");
                // window.location.reload();
            } else if (response.data.status === 'unsuccess') {
                alert(response.data.message);
            }
        } catch (error) {
            console.error('An error occurred while changing settings:', error);
            alert("Error");
        }
    }

    return (
        <div className="container" style={{marginTop: '2rem'}}>
            <h1 className="text-center mb-5">Create your blog</h1>
            <div className="row">
                <div className="col-md-8">
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
                    <br/>
                    <div>
                        <div className="mb-3">                        
                            <textarea id="title" class="form-control form-control-lg" rows={3} placeholder="Title" maxLength={200} onChange={(e) => setTitle(e.target.value)}/> 
                        </div>
                        <div>
                            <JoditEditor
                                config={editorConfig}
                                onBlur={newContent => setContent(newContent)}
                            />
                        </div>   
                    </div>
                    <br/>
                    <div>
                        <button type="button" class="btn btn-primary" onClick={handlePost}>Post your blog</button>
                    </div>
                    <br/>
                </div>

                <div className="col-md-4">

                </div>
            </div>
        </div>
    )
}