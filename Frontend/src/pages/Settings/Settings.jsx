import React, { useContext, useState } from "react";
import './Settings.css';
import { Context } from "../../context/Context";
import axios from 'axios';
// import { useSelector } from 'react-redux';

export default function Settings() {
    const { user, dispatch } = useContext(Context);
    const [username, setUsername] = useState(user.data.username);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState(user.data.email);
    const [DOB, setDOB] = useState(user.data.profile.dob);
    const [gender, setGender] = useState(user.data.profile.gender);
    const [profilePicture, setProfilePicture] = useState(user.data.profile.profile_picture);
    const [new_password, setNewPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(user.data.profile.phone_number);

    const [changeImage, setChangeImage] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch({ type: "UPDATE_START" })

        console.log(profilePicture);
        let image = null;

        if (changeImage && profilePicture !== null) {
            const formData = new FormData();
            formData.append("file", profilePicture);
            formData.append("upload_preset", "fokolbfy");
            formData.append("folder", "Blog_Photo_Website/Avatar");
            formData.append("api_key", "135497366991663");
            // await axios.post('https://api.cloudinary.com/v1_1/dvi9ihpbc/upload/', formData, {
            //     headers: {
            //         'Content-Type': 'multipart/form-data',
            //         // Include other headers as needed, such as Authorization
            //     },
            // }).then((response) => {
            //     image = response.data.secure_url;
            //     console.log(image);
            // }).catch((error) => {
            //     console.log(error);
            // })
            let CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dvi9ihpbc/upload/';
            const xhr = new XMLHttpRequest();
            try {
                await xhr.open('POST', CLOUDINARY_URL, false);
                xhr.send(formData);
                const imageResponse = JSON.parse(xhr.responseText);
                if (xhr.status === 400) {
                    alert(imageResponse.error.message);
                    return;
                } 

                // 
                console.log(imageResponse);
                image = imageResponse.secure_url;
                // console.log(image)
            } catch (error) {
                console.log(error);
            }
        }

        // console.log(image);

        const data = {
            username: username,
            old_password: password,
            new_password: new_password,
            email: email,
            gender: gender,
            dob: DOB,
            phone_number: phoneNumber,
            
        }

        data.profile_picture = null;

        if (image !== null) {
            data.profile_picture = image;
        }

        // console.log(data);

        try {
            const response = await axios.post('http://localhost:8000/user/settings/' + user.data.id, data);
            console.log(response.data);
            if (response.data.status === 'success') {
                // alert("Update successfully");
                dispatch({ type: "UPDATE_SUCCESS", payload: response.data })
                // window.location.reload();
            } else if (response.data.status === 'unsuccess') {
                alert(response.data.message);
                dispatch({ type: "UPDATE_FAILURE" });
            }
        } catch (error) {
            console.error('An error occurred while logging in:', error);
            alert("Error");
            dispatch({ type: "UPDATE_FAILURE" });
        }
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file.size > 10485760) {
            alert('File size is too large! Maximum allowed size is 10 MB.');
            return; // Prevent form submission
        }

        // Check if a file is selected
        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setProfilePicture(reader.result);
            };

            console.log(profilePicture)
            setChangeImage(true);
            reader.readAsDataURL(file);
        }
    };

    const handleResetImage = () => {
        // Clear profilePicture when going back to step 1
        setProfilePicture(null);
    };

    return (
        <div className="container light-style flex-grow-1 container-p-y">
            <h4 className="font-weight-bold py-3">
                Account settings
            </h4>
            <div className="card overflow-hidden">
                <div className="row no-gutters row-bordered row-border-light">
                    <div className="col-md-3 pt-0">
                        <div className="list-group list-group-flush account-settings-links">
                            <a className="list-group-item list-group-item-action active" data-toggle="list" href="#account-general">General</a>
                            <a className="list-group-item list-group-item-action" data-toggle="list" href="#account-change-password">Change password</a>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="tab-content">
                            <div className="tab-pane fade active show" id="account-general">
                                <div className="card-body media align-items-center">
                                    {profilePicture ? (
                                        <img src={profilePicture} alt="" className="d-block ui-w-80"/>
                                    ) : (
                                        <img src="https://res.cloudinary.com/dvi9ihpbc/image/upload/v1714885288/Blog_Photo_Website/Avatar/g2hr4syxruyki3k6glwy.png" alt="" className="d-block ui-w-80"/>
                                    )}
                                    <div className="media-body" style={{marginLeft: "2rem"}}>
                                        <label className="btn btn-outline-primary">
                                            Upload new photo
                                            <input type="file" className="account-settings-fileinput" onChange={handleImageChange}/>
                                        </label> &nbsp;
                                        <button type="button" className="btn btn-outline-dark md-btn-flat" onClick={handleResetImage}>Reset</button>
                                        <div className="small mt-1" style={{color: "gray"}}>Allowed JPG, GIF or PNG. Max size of 1000K</div>
                                    </div>
                                </div>
                                <hr className="border-light m-0" />
                                <div className="card-body">
                                    <div className="form-group">
                                        <label className="form-label">Username</label>
                                        <input type="text" className="form-control mb-1" defaultValue={username} onChange={(e) => {setUsername(e.target.value)}}/>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Gender</label>
                                        <select className="form-select" defaultValue={gender} onChange={(e) => setGender(e.target.value)} aria-label="Select gender">
                                            <option value="" selected disabled>Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </div>
                                    {/* <div className="form-group">
                                        <label className="form-label">Name</label>
                                        <input type="text" className="form-control" value="Nelle Maxwell" />
                                    </div> */}
                                    <div className="form-group">
                                        <label className="form-label">E-mail</label>
                                        <input type="text" className="form-control mb-1" defaultValue={email} onChange={(e) => setEmail(e.target.value)}/>
                                        {/* <div className="alert alert-warning mt-3">
                                            Your email is not confirmed. Please check your inbox.<br />
                                            <a href="/#">Resend confirmation</a>
                                        </div> */}
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Phone Number</label>
                                        <input type="text" className="form-control" defaultValue={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Birthday</label>
                                        <input type="date" className="form-control" defaultValue={DOB} onChange={(e) => setDOB(e.target.value)} />
                                    </div>
                                </div>

                            </div>
                            <div className="tab-pane fade" id="account-change-password">
                                <div className="card-body pb-2">

                                    <div className="form-group">
                                        <label className="form-label">Current password</label>
                                        <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)}/>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">New password</label>
                                        <input type="password" className="form-control" onChange={(e) => setNewPassword(e.target.value)}/>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Repeat new password</label>
                                        <input type="password" className="form-control" />
                                    </div>
                                </div>
                            </div>          
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-right mt-3 mb-3">
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save changes</button>&nbsp;
                <button type="button" className="btn btn-outline-dark">Cancel</button>
            </div>
        </div>
    )
}