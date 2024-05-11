import React, { useContext, useState } from "react";
import './Settings.css';
import { Context } from "../../context/Context";
import axios from 'axios';
// import { useSelector } from 'react-redux';

export default function Settings() {
    const { user } = useContext(Context);
    const [username, setUsername] = useState(user.data.username);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState(user.data.email);
    const [DOB, setDOB] = useState(user.data.profile.dob);
    const [gender, setGender] = useState();
    const [profilePicture, setProfilePicture] = useState(user.data.profile.profile_picture);
    const [imageURL, setImageURL] = useState('');
    const [new_password, setNewPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(user.data.profile.phone_number);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (profilePicture !== user.data.profile.profile_picture) {
            const formData = new FormData();
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

        const data = {
            username: username,
            old_password: password,
            new_password: new_password,
            email: email,
            gender: gender,
            dob: DOB,
            imageURL: imageURL,
            phone_number: phoneNumber
        }


        try {
            const response = await axios.post('http://localhost:8000/user/settings/' + user.data.id, data);
            console.log(response.data);
            if (response.data.status === 'success') {
                         
            } else if (response.data.status === 'exist') {
                alert("Username is already exists")
            }
        } catch (error) {
            console.error('An error occurred while logging in:', error);
        }
    }

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
                            {/* <a className="list-group-item list-group-item-action" data-toggle="list" href="#account-info">Info</a>
                            <a className="list-group-item list-group-item-action" data-toggle="list" href="#account-social-links">Social links</a>
                            <a className="list-group-item list-group-item-action" data-toggle="list" href="#account-connections">Connections</a> */}
                            <a className="list-group-item list-group-item-action" data-toggle="list" href="#account-notifications">Notifications</a>
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
                                        <button type="button" className="btn btn-outline-dark md-btn-flat">Reset</button>
                                        <div className="small mt-1" style={{color: "gray"}}>Allowed JPG, GIF or PNG. Max size of 800K</div>
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
                                        <input type="password" className="form-control" />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">New password</label>
                                        <input type="password" className="form-control" />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Repeat new password</label>
                                        <input type="password" className="form-control" />
                                    </div>
                                </div>
                            </div>          
                            <div className="tab-pane fade" id="account-notifications">
                                <div className="card-body pb-2">
                                    <h6 className="mb-4">Activity</h6>
                                    <div className="form-group">
                                        <label className="switcher">
                                            <input type="checkbox" className="switcher-input" checked="" />
                                            <span className="switcher-indicator">
                                                <span className="switcher-yes"></span>
                                                <span className="switcher-no"></span>
                                            </span>
                                            <span className="switcher-label">Email me when someone comments on my article</span>
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <label className="switcher">
                                            <input type="checkbox" className="switcher-input" checked="" />
                                            <span className="switcher-indicator">
                                                <span className="switcher-yes"></span>
                                                <span className="switcher-no"></span>
                                            </span>
                                            <span className="switcher-label">Email me when someone answers on my forum thread</span>
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <label className="switcher">
                                            <input type="checkbox" className="switcher-input" />
                                            <span className="switcher-indicator">
                                                <span className="switcher-yes"></span>
                                                <span className="switcher-no"></span>
                                            </span>
                                            <span className="switcher-label">Email me when someone follows me</span>
                                        </label>
                                    </div>
                                </div>
                                <hr className="border-light m-0" />
                                <div className="card-body pb-2">
                                    <h6 className="mb-4">Application</h6>
                                    <div className="form-group">
                                        <label className="switcher">
                                            <input type="checkbox" className="switcher-input" checked="" />
                                            <span className="switcher-indicator">
                                                <span className="switcher-yes"></span>
                                                <span className="switcher-no"></span>
                                            </span>
                                            <span className="switcher-label">News and announcements</span>
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <label className="switcher">
                                            <input type="checkbox" className="switcher-input" />
                                            <span className="switcher-indicator">
                                                <span className="switcher-yes"></span>
                                                <span className="switcher-no"></span>
                                            </span>
                                            <span className="switcher-label">Weekly product updates</span>
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <label className="switcher">
                                            <input type="checkbox" className="switcher-input" checked="" />
                                            <span className="switcher-indicator">
                                                <span className="switcher-yes"></span>
                                                <span className="switcher-no"></span>
                                            </span>
                                            <span className="switcher-label">Weekly blog digest</span>
                                        </label>
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