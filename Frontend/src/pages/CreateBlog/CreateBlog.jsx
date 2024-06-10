import React, { useState } from "react";
import { useDropzone } from 'react-dropzone';
import './CreateBlog.css';
import JoditEditor, { Jodit } from 'jodit-react';

export default function CreateBlog() {
    const [acceptedFiles, setAcceptedFiles] = useState([]);
    const [preview, setPreview] = useState(null);

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

            if (!imageFile) {
                return;
            }

            if (!imageFile.name.match(/\.(jpg|jpeg|png)$/)) {
                return;
            }

            const imageInfo = await FileUpload(imageFile);;

            insertImage(editor, imageInfo.url);

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
        formData.append("folder", "Blog_Photo_Website/Avatar");
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
                            <textarea id="title" class="form-control form-control-lg" rows={3} placeholder="Title" maxLength={200}/> 
                        </div>
                        <div>
                            <JoditEditor
                                config={editorConfig}
                            />
                        </div>   
                    </div>
                </div>

                <div className="col-md-4">

                </div>
            </div>
        </div>
    )
}