import React, { useState } from "react";
import { useDropzone } from 'react-dropzone';
import './Blog.css';

export default function Blog() {
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

    return (
        <div className="container" style={{marginTop: '2rem'}}>
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
                </div>

                <div className="col-md-4">

                </div>
            </div>
        </div>
    )
}