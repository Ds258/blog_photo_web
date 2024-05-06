import React, { useContext, useEffect, useState } from "react";
import './Settings.css';
import Navbar from "../../components/common/Navbar/Navbar";
import { Context } from "../../context/Context";
import axios from 'axios';
// import { useSelector } from 'react-redux';

export default function Settings() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [DOB, setDOB] = useState('')
    const [avatar, setAvatar] = useState('');
    const [new_password, setNewPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const { user, dispatch } = useContext(Context);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            username: username,
            old_password: password,
            new_password: new_password,
            email: email,
            dob: DOB,
            avatar: avatar,
            phone_number: phoneNumber
        }

        try {
            const response = await axios.post('http://localhost:8000/user/settings/', data);
            console.log(response.data);
            if (response.data.status === 'success') {
                         
            } else if (response.data.status === 'exist') {
                alert("Username is already exists")
            }
        } catch (error) {
            console.error('An error occurred while logging in:', error);
        }
    }

    function AvaImg() {
        if (user.data.profile.profile_picture) {
            return <img src={user.data.profile.profile_picture} alt="" class="d-block ui-w-80"/>;
        } else {
            return <img src="https://res.cloudinary.com/dvi9ihpbc/image/upload/v1714885288/Blog_Photo_Website/Avatar/g2hr4syxruyki3k6glwy.png" alt="" class="d-block ui-w-80"/>
        }

        
    }

    return (
        <div class="container light-style flex-grow-1 container-p-y">
            <h4 class="font-weight-bold py-3">
                Account settings
            </h4>
            <div class="card overflow-hidden">
                <div class="row no-gutters row-bordered row-border-light">
                    <div class="col-md-3 pt-0">
                        <div class="list-group list-group-flush account-settings-links">
                            <a class="list-group-item list-group-item-action active" data-toggle="list" href="#account-general">General</a>
                            <a class="list-group-item list-group-item-action" data-toggle="list" href="#account-change-password">Change password</a>
                            {/* <a class="list-group-item list-group-item-action" data-toggle="list" href="#account-info">Info</a>
                            <a class="list-group-item list-group-item-action" data-toggle="list" href="#account-social-links">Social links</a>
                            <a class="list-group-item list-group-item-action" data-toggle="list" href="#account-connections">Connections</a> */}
                            <a class="list-group-item list-group-item-action" data-toggle="list" href="#account-notifications">Notifications</a>
                        </div>
                    </div>
                    <div class="col-md-9">
                        <div class="tab-content">
                            <div class="tab-pane fade active show" id="account-general">
                                <div class="card-body media align-items-center">
                                    <AvaImg/>
                                    <div class="media-body" style={{marginLeft: "2rem"}}>
                                        <label class="btn btn-outline-primary">
                                            Upload new photo
                                            <input type="file" class="account-settings-fileinput" />
                                        </label> &nbsp;
                                        <button type="button" class="btn btn-outline-dark md-btn-flat">Reset</button>
                                        <div class="small mt-1" style={{color: "gray"}}>Allowed JPG, GIF or PNG. Max size of 800K</div>
                                    </div>
                                </div>
                                <hr class="border-light m-0" />
                                <div class="card-body">
                                    <div class="form-group">
                                        <label class="form-label">Username</label>
                                        <input type="text" class="form-control mb-1" value={user.data.username} onChange={(e) => setUsername(e.target.value)}/>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">Gender</label>
                                        <select class="form-select" aria-label="Select gender">
                                            <option value="" selected disabled>Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </div>
                                    {/* <div class="form-group">
                                        <label class="form-label">Name</label>
                                        <input type="text" class="form-control" value="Nelle Maxwell" />
                                    </div> */}
                                    <div class="form-group">
                                        <label class="form-label">E-mail</label>
                                        <input type="text" class="form-control mb-1" value={user.data.email} onChange={(e) => setEmail(e.target.value)}/>
                                        {/* <div class="alert alert-warning mt-3">
                                            Your email is not confirmed. Please check your inbox.<br />
                                            <a href="/#">Resend confirmation</a>
                                        </div> */}
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">Phone Number</label>
                                        <input type="text" class="form-control" value={user.data.profile.phone_number} onChange={(e) => setPhoneNumber(e.target.value)} />
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">Birthday</label>
                                        <input type="date" class="form-control" value={user.data.profile.dob} onChange={(e) => setDOB(e.target.value)} />
                                    </div>
                                </div>

                            </div>
                            <div class="tab-pane fade" id="account-change-password">
                                <div class="card-body pb-2">

                                    <div class="form-group">
                                        <label class="form-label">Current password</label>
                                        <input type="password" class="form-control" />
                                    </div>

                                    <div class="form-group">
                                        <label class="form-label">New password</label>
                                        <input type="password" class="form-control" />
                                    </div>

                                    <div class="form-group">
                                        <label class="form-label">Repeat new password</label>
                                        <input type="password" class="form-control" />
                                    </div>

                                </div>
                            </div>
                            {/* <div class="tab-pane fade" id="account-info">
                                <div class="card-body pb-2">

                                    <div class="form-group">
                                        <label class="form-label">Bio</label>
                                        <textarea class="form-control" rows="5">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nunc arcu, dignissim sit amet sollicitudin iaculis, vehicula id urna. Sed luctus urna nunc. Donec fermentum, magna sit amet rutrum pretium, turpis dolor molestie diam, ut lacinia diam risus eleifend sapien. Curabitur ac nibh nulla. Maecenas nec augue placerat, viverra tellus non, pulvinar risus.</textarea>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label class="form-label">Country</label>
                                        <select class="custom-select">
                                            <option>USA</option>
                                            <option selected="">Canada</option>
                                            <option>UK</option>
                                            <option>Germany</option>
                                            <option>France</option>
                                        </select>
                                    </div>
                                </div>
                                <hr class="border-light m-0" />
                                <div class="card-body pb-2">

                                    <h6 class="mb-4">Contacts</h6>
                                    <div class="form-group">
                                        <label class="form-label">Phone</label>
                                        <input type="text" class="form-control" value="+0 (123) 456 7891" />
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">Website</label>
                                        <input type="text" class="form-control" value="" />
                                    </div>

                                </div>

                            </div> */}
                            {/* <div class="tab-pane fade" id="account-social-links">
                                <div class="card-body pb-2">

                                    <div class="form-group">
                                        <label class="form-label">Twitter</label>
                                        <input type="text" class="form-control" value="https://twitter.com/user" />
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">Facebook</label>
                                        <input type="text" class="form-control" value="https://www.facebook.com/user" />
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">Google+</label>
                                        <input type="text" class="form-control" value="" />
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">LinkedIn</label>
                                        <input type="text" class="form-control" value="" />
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">Instagram</label>
                                        <input type="text" class="form-control" value="https://www.instagram.com/user" />
                                    </div>

                                </div>
                            </div> */}
                            {/* <div class="tab-pane fade" id="account-connections">
                                <div class="card-body">
                                    <button type="button" class="btn btn-twitter">Connect to <strong>Twitter</strong></button>
                                </div>
                                <hr class="border-light m-0" />
                                <div class="card-body">
                                    <h5 class="mb-2">
                                        <a href="/#" class="float-right text-muted text-tiny"><i class="ion ion-md-close"></i> Remove</a>
                                        <i class="ion ion-logo-google text-google"></i>
                                        You are connected to Google:
                                    </h5>
                                    nmaxwell@mail.com
                                </div>
                                <hr class="border-light m-0" />
                                <div class="card-body">
                                    <button type="button" class="btn btn-facebook">Connect to <strong>Facebook</strong></button>
                                </div>
                                <hr class="border-light m-0" />
                                <div class="card-body">
                                    <button type="button" class="btn btn-instagram">Connect to <strong>Instagram</strong></button>
                                </div>
                            </div> */}
                            <div class="tab-pane fade" id="account-notifications">
                                <div class="card-body pb-2">
                                    <h6 class="mb-4">Activity</h6>
                                    <div class="form-group">
                                        <label class="switcher">
                                            <input type="checkbox" class="switcher-input" checked="" />
                                            <span class="switcher-indicator">
                                                <span class="switcher-yes"></span>
                                                <span class="switcher-no"></span>
                                            </span>
                                            <span class="switcher-label">Email me when someone comments on my article</span>
                                        </label>
                                    </div>
                                    <div class="form-group">
                                        <label class="switcher">
                                            <input type="checkbox" class="switcher-input" checked="" />
                                            <span class="switcher-indicator">
                                                <span class="switcher-yes"></span>
                                                <span class="switcher-no"></span>
                                            </span>
                                            <span class="switcher-label">Email me when someone answers on my forum thread</span>
                                        </label>
                                    </div>
                                    <div class="form-group">
                                        <label class="switcher">
                                            <input type="checkbox" class="switcher-input" />
                                            <span class="switcher-indicator">
                                                <span class="switcher-yes"></span>
                                                <span class="switcher-no"></span>
                                            </span>
                                            <span class="switcher-label">Email me when someone follows me</span>
                                        </label>
                                    </div>
                                </div>
                                <hr class="border-light m-0" />
                                <div class="card-body pb-2">
                                    <h6 class="mb-4">Application</h6>
                                    <div class="form-group">
                                        <label class="switcher">
                                            <input type="checkbox" class="switcher-input" checked="" />
                                            <span class="switcher-indicator">
                                                <span class="switcher-yes"></span>
                                                <span class="switcher-no"></span>
                                            </span>
                                            <span class="switcher-label">News and announcements</span>
                                        </label>
                                    </div>
                                    <div class="form-group">
                                        <label class="switcher">
                                            <input type="checkbox" class="switcher-input" />
                                            <span class="switcher-indicator">
                                                <span class="switcher-yes"></span>
                                                <span class="switcher-no"></span>
                                            </span>
                                            <span class="switcher-label">Weekly product updates</span>
                                        </label>
                                    </div>
                                    <div class="form-group">
                                        <label class="switcher">
                                            <input type="checkbox" class="switcher-input" checked="" />
                                            <span class="switcher-indicator">
                                                <span class="switcher-yes"></span>
                                                <span class="switcher-no"></span>
                                            </span>
                                            <span class="switcher-label">Weekly blog digest</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="text-right mt-3 mb-3">
                <button type="button" class="btn btn-primary" onClick={handleSubmit}>Save changes</button>&nbsp;
                <button type="button" class="btn btn-outline-dark">Cancel</button>
            </div>
        </div>
    )
}