import React, { useContext, useEffect, useState } from "react";
import './Settings.css';
import Navbar from "../../components/common/Navbar/Navbar";
import { Context } from "../../context/Context";
// import { useSelector } from 'react-redux';

export default function Settings() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [DOB, setDOB] = useState('')
    const [avatar, setAvatar] = useState('');
    const [new_password, setNewPassword] = useState('');
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
        }
    }

    return (

        <div className="align-items-center settings">
            <main className="form-settings">
                <h1 className="h3 mb-3 fw-normal text-center">Change your settings</h1>
                <form>
                    <div class="mb-3">
                        <label for="formFile" class="form-label imageLabel">Choose your avatar</label>
                        <input class="form-control" type="file" id="formFile" />
                    </div>
                    <div className="form-floating username-settings">
                        <input type="text" className="form-control" id="floatingUser" placeholder="username" value={user.data.username} onChange={(e) => setUsername(e.target.value)} />
                        <label htmlFor="floatingUser">Username</label>
                    </div>
                    <div className="form-floating DOB-settings">
                        <input type="date" className="form-control" id="floatingDOB" placeholder="Date of Birth" value={user.data.DOB} onChange={(e) => setDOB(e.target.value)} />
                        <label htmlFor="floatingDOB">Date of Birth</label>
                    </div>
                    <div className="form-floating email-settings">
                        <input type="email" className="form-control" id="floatingEmail" placeholder="name@example.com" value={user.data.email} onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor="floatingEmail">Email Address</label>
                    </div>
                    <div className="form-floating password-settings">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="123456" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <label htmlFor="floatingPassword">Old Password</label>
                    </div>
                    <div className="form-floating password-settings">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="123456" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <label htmlFor="floatingPassword">New Password</label>
                    </div>
                    <div className="form-floating password-settings">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="123456" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <label htmlFor="floatingPassword">Confirm Password</label>
                    </div>
                    <div style={{ "textAlign": "center" }}><button className="w-50 btn btn-lg btn-primary saveSettingButton" type="submit">Save</button></div>
                </form>
            </main>
        </div>
    )
}