/* eslint-disable jsx-a11y/img-redundant-alt */
import "./Sign_up.css"
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from 'axios';

export default function Signup() {
    const [step, setStep] = useState(1);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    // const [DOB, setDOB] = useState('');
    // const [phone_number, setPhoneNumber] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [imageURL, setImageURL] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (step === 1) {
            //Add conditional to check if empty or regex
            setStep(2);
        } else if (step === 2) {
            const formData = new FormData();
            if (profilePicture !== null) {
                formData.append("file", profilePicture);
                formData.append("upload_preset", "fokolbfy");
                formData.append("folder", "Blog_Photo_Website/Avatar");
                formData.append("api_key", "135497366991663");
                // Axios.post('https://api.cloudinary.com/v1_1/diih7pze7/upload/', formData, {
                //     headers: {
                //         'Content-Type': 'multipart/form-data',
                //         // Include other headers as needed, such as Authorization
                //     },
                // }).then((response) => {
                //     const image = response.data.secure_url;
                //     setImageURL(image);
                //     // console.log(image);
                // }).catch((error) => {
                //     console.log(error);
                // })
                let CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/diih7pze7/upload/';
                const xhr = new XMLHttpRequest();
                try {
                    xhr.open('POST', CLOUDINARY_URL, false);
                    xhr.send(formData);
                    const imageResponse = JSON.parse(xhr.responseText);
                    console.log(imageResponse.secure_url);
                    setImageURL(imageResponse.secure_url);
                } catch (error) {
                    console.log(error);
                }
            }
            // console.log(imageResponse.secure_url);
            
            const data = {
                new_username: username,
                new_password: password,
                new_email: email,
                new_avatar: imageURL,
            };

            try {
                const response = await axios.post('http://localhost:8000/user/signup/', data);
                console.log(response.data);
                if (response.data.status === 'success') {
                    navigate("/signin");
                    
                } else if (response.data.status === 'exist') {
                    alert("Username is already exists")
                }
            } catch (error) {
                console.error('An error occurred while logging in:', error);
            }
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        // Check if a file is selected
        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setProfilePicture(reader.result);
            };

            // console.log(profilePicture)

            reader.readAsDataURL(file);
        }
    };

    const handleReset = () => {
        setStep(1);
        // Clear profilePicture when going back to step 1
        setProfilePicture(null);
    };

    return (
        <div className="signup justify-content-center align-items-center">
            {step === 1 && (
                <div className="text-center">
                    <main className="form-signup">
                        <form onSubmit={handleSubmit}>
                            <h1 className="h3 mb-3 fw-normal">Sign up</h1>
                            <div className="form-floating username-signup">
                                <input type="text" className="form-control" id="floatingUser" placeholder="username" required value={username} onChange={(e) => setUsername(e.target.value)} />
                                <label htmlFor="floatingUser">Username</label>
                            </div>
                            <div className="form-floating email-signup">
                                <input type="email" className="form-control" id="floatingEmail" placeholder="name@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
                                <label htmlFor="floatingEmail">Email Address</label>
                            </div>
                            <div className="form-floating password-signup">
                                <input type="password" className="form-control" id="floatingPassword" placeholder="123456" required value={password} onChange={(e) => setPassword(e.target.value)} />
                                <label htmlFor="floatingPassword">Password</label>
                            </div>
                            <button className="w-100 btn btn-lg btn-primary" type="submit" style={{"marginBottom": "1rem"}}>Sign up</button>
                            <button className="w-100 btn btn-lg btn-primary" type="">Sign up with Google</button>
                            <h3 className="h6 mt-3 mb-2 fw-bold">Already have an account? Sign in now</h3>
                            <Link to="/signin"><button className="w-100 btn btn-lg btn-danger" type="submit">Sign in</button></Link>
                            <p className="mt-4 copyright">© 2024</p>
                        </form>
                    </main>
                </div>
            )}

            {step === 2 && (
                <main className="complete_signup">
                    <form onSubmit={handleSubmit}>
                        {/* Step 2: Profile picture */}
                        <div className="container" style={{ "width": "calc(50vh)" }}>
                            <div className="form-group">
                                <div className="text-center">
                                    <label htmlFor="profilePicture" className="image-upload-placeholder">
                                        {profilePicture ? (
                                            <img
                                                src={profilePicture}
                                                alt="Selected"
                                                className="rounded-circle"
                                                style={{ width: '12rem', height: '12rem' }}
                                            />
                                        ) : (
                                            <div className="default-placeholder rounded-circle" style={{ width: '12rem', height: '12rem' }}>
                                                <img
                                                    src="https://res.cloudinary.com/dvi9ihpbc/image/upload/v1714885288/Blog_Photo_Website/Avatar/g2hr4syxruyki3k6glwy.png"
                                                    alt="None picture"
                                                    className="rounded-circle"
                                                    style={{ width: '12rem', height: '12rem' }}
                                                />
                                            </div>
                                        )}
                                    </label>
                                </div>
                                <br />
                                <div className="row">
                                    <label htmlFor="profilePicture" className="col-lg-4">Profile Picture</label>
                                    <div className="col-lg-8">
                                        <input
                                            type="file"
                                            className="form-control"
                                            id="profilePicture"
                                            onChange={handleImageChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row justify-content-center">
                                <label className="col-lg-4">Username</label>
                                <div className="col-lg-8">
                                    <h6>{username}</h6>
                                </div>
                            </div>
                            <div className="form-group row justify-content-center">
                                <label className="col-lg-4">Email</label>
                                <div className="col-lg-8">
                                    <h6>{email}</h6>
                                </div>
                            </div>
                        </div>
                        <div className="text-center">
                            <button className="w-40 btn btn-lg btn-secondary" type="reset" onClick={handleReset} style={{ "marginRight": "0.5rem" }}>
                                Back
                            </button>
                            <button className="w-40 btn btn-lg btn-primary" type="submit">
                                Complete
                            </button>
                        </div>
                    </form>
                </main>
            )}
        </div>
    )
}