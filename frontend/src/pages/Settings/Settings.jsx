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

        // <div className="align-items-center settings">
        //     <main className="form-settings">
        //         <h1 className="h3 mb-3 fw-normal text-center">Change your settings</h1>
        //         <form>
        //             <div className="mb-3">
        //                 <label for="formFile" className="form-label imageLabel">Choose your avatar</label>
        //                 <input className="form-control" type="file" id="formFile" />
        //             </div>
        //             <div className="form-floating username-settings">
        //                 <input type="text" className="form-control" id="floatingUser" placeholder="username" value={user.data.username} onChange={(e) => setUsername(e.target.value)} />
        //                 <label htmlFor="floatingUser">Username</label>
        //             </div>
        //             <div className="form-floating DOB-settings">
        //                 <input type="date" className="form-control" id="floatingDOB" placeholder="Date of Birth" value={user.data.DOB} onChange={(e) => setDOB(e.target.value)} />
        //                 <label htmlFor="floatingDOB">Date of Birth</label>
        //             </div>
        //             <div className="form-floating email-settings">
        //                 <input type="email" className="form-control" id="floatingEmail" placeholder="name@example.com" value={user.data.email} onChange={(e) => setEmail(e.target.value)} />
        //                 <label htmlFor="floatingEmail">Email Address</label>
        //             </div>
        //             <div className="form-floating password-settings">
        //                 <input type="password" className="form-control" id="floatingPassword" placeholder="123456" value={password} onChange={(e) => setPassword(e.target.value)} />
        //                 <label htmlFor="floatingPassword">Old Password</label>
        //             </div>
        //             <div className="form-floating password-settings">
        //                 <input type="password" className="form-control" id="floatingPassword" placeholder="123456" value={password} onChange={(e) => setPassword(e.target.value)} />
        //                 <label htmlFor="floatingPassword">New Password</label>
        //             </div>
        //             <div className="form-floating password-settings">
        //                 <input type="password" className="form-control" id="floatingPassword" placeholder="123456" value={password} onChange={(e) => setPassword(e.target.value)} />
        //                 <label htmlFor="floatingPassword">Confirm Password</label>
        //             </div>
        //             <div style={{ "textAlign": "center" }}><button className="w-50 btn btn-lg btn-primary saveSettingButton" type="submit">Save</button></div>
        //         </form>
        //     </main>
        // </div>
        <div className="container" style={{"marginTop": "2rem"}}>
            <div className="row">
                <div className="col-lg-4">
                    <div className="profile-card-4 z-depth-3">
                        <div className="card">
                            <div className="card-body text-center bg-primary rounded-top">
                                <div className="user-box">
                                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="user avatar" />
                                </div>
                                <h5 className="mb-1 text-white">{user.data.username}</h5>
                                <h6 className="text-light">Rank: {}</h6>
                            </div>
                            <div className="card-body">
                                <ul className="list-group shadow-none">
                                    <li className="list-group-item">
                                        <div className="list-icon">
                                            <i className="fa fa-phone-square"></i>
                                        </div>
                                        <div className="list-details">
                                            <span>9910XXXXXX</span>
                                            <small>Mobile Number</small>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <div className="list-icon">
                                            <i className="fa fa-envelope"></i>
                                        </div>
                                        <div className="list-details">
                                            <span>info@example.com</span>
                                            <small>Email Address</small>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <div className="list-icon">
                                            <i className="fa fa-globe"></i>
                                        </div>
                                        <div className="list-details">
                                            <span>www.example.com</span>
                                            <small>Website Address</small>
                                        </div>
                                    </li>
                                </ul>
                                <div className="row text-center mt-4">
                                    <div className="col p-2">
                                        <h4 className="mb-1 line-height-5">154</h4>
                                        <small className="mb-0 font-weight-bold">Projects</small>
                                    </div>
                                    <div className="col p-2">
                                        <h4 className="mb-1 line-height-5">2.2k</h4>
                                        <small className="mb-0 font-weight-bold">Followers</small>
                                    </div>
                                    <div className="col p-2">
                                        <h4 className="mb-1 line-height-5">9.1k</h4>
                                        <small className="mb-0 font-weight-bold">Views</small>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer text-center">
                                <a href="javascript:void()" className="btn-social btn-facebook waves-effect waves-light m-1"><i className="fa fa-facebook"></i></a>
                                <a href="javascript:void()" className="btn-social btn-google-plus waves-effect waves-light m-1"><i className="fa fa-google-plus"></i></a>
                                <a href="javascript:void()" className="list-inline-item btn-social btn-behance waves-effect waves-light"><i className="fa fa-behance"></i></a>
                                <a href="javascript:void()" className="list-inline-item btn-social btn-dribbble waves-effect waves-light"><i className="fa fa-dribbble"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8">
                    <div className="card z-depth-3">
                        <div className="card-body">
                            <ul className="nav nav-pills nav-pills-primary nav-justified">
                                <li className="nav-item">
                                    <a href="javascript:void();" data-target="#profile" data-toggle="pill" className="nav-link active show"><i className="icon-user"></i> <span className="hidden-xs">Profile</span></a>
                                </li>
                                <li className="nav-item">
                                    <a href="javascript:void();" data-target="#messages" data-toggle="pill" className="nav-link"><i className="icon-envelope-open"></i> <span className="hidden-xs">Messages</span></a>
                                </li>
                                <li className="nav-item">
                                    <a href="javascript:void();" data-target="#edit" data-toggle="pill" className="nav-link"><i className="icon-note"></i> <span className="hidden-xs">Edit</span></a>
                                </li>
                            </ul>
                            <div className="tab-content p-3">
                                <div className="tab-pane active show" id="profile">
                                    <h5 className="mb-3">User Profile</h5>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <h6>About</h6>
                                            <p>
                                                Web Designer, UI/UX Engineer
                                            </p>
                                            <h6>Hobbies</h6>
                                            <p>
                                                Indie music, skiing and hiking. I love the great outdoors.
                                            </p>
                                        </div>
                                        <div className="col-md-6">
                                            <h6>Recent badges</h6>
                                            <a href="javascript:void();" className="badge badge-dark badge-pill">html5</a>
                                            <a href="javascript:void();" className="badge badge-dark badge-pill">react</a>
                                            <a href="javascript:void();" className="badge badge-dark badge-pill">codeply</a>
                                            <a href="javascript:void();" className="badge badge-dark badge-pill">angularjs</a>
                                            <a href="javascript:void();" className="badge badge-dark badge-pill">css3</a>
                                            <a href="javascript:void();" className="badge badge-dark badge-pill">jquery</a>
                                            <a href="javascript:void();" className="badge badge-dark badge-pill">bootstrap</a>
                                            <a href="javascript:void();" className="badge badge-dark badge-pill">responsive-design</a>
                                            <hr />
                                        </div>
                                        <div className="col-md-12">
                                            <h5 className="mt-2 mb-3"><span className="fa fa-clock-o ion-clock float-right"></span> Recent Activity</h5>
                                            <table className="table table-hover table-striped">
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <strong>Abby</strong> joined ACME Project Team in <strong>`Collaboration`</strong>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <strong>Gary</strong> deleted My Board1 in <strong>`Discussions`</strong>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <strong>Kensington</strong> deleted MyBoard3 in <strong>`Discussions`</strong>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <strong>John</strong> deleted My Board1 in <strong>`Discussions`</strong>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <strong>Skell</strong> deleted his post Look at Why this is.. in <strong>`Discussions`</strong>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane" id="messages">
                                    <div className="alert alert-info alert-dismissible" role="alert">
                                        <button type="button" className="close" data-dismiss="alert">×</button>
                                        <div className="alert-icon">
                                            <i className="icon-info"></i>
                                        </div>
                                        <div className="alert-message">
                                            <span><strong>Info!</strong> Lorem Ipsum is simply dummy text.</span>
                                        </div>
                                    </div>
                                    <table className="table table-hover table-striped">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <span className="float-right font-weight-bold">3 hrs ago</span> Here is your a link to the latest summary report from the..
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span className="float-right font-weight-bold">Yesterday</span> There has been a request on your account since that was..
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span className="float-right font-weight-bold">9/10</span> Porttitor vitae ultrices quis, dapibus id dolor. Morbi venenatis lacinia rhoncus.
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span className="float-right font-weight-bold">9/4</span> Vestibulum tincidunt ullamcorper eros eget luctus.
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span className="float-right font-weight-bold">9/4</span> Maxamillion ais the fix for tibulum tincidunt ullamcorper eros.
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="tab-pane" id="edit">
                                    <form>
                                        <div className="form-group row">
                                            <label className="col-lg-3 col-form-label form-control-label">Username</label>
                                            <div className="col-lg-9">
                                                <input className="form-control" type="text" value={user.data.username} onChange={(e) => setUsername(e.target.value)}/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-lg-3 col-form-label form-control-label">Email</label>
                                            <div className="col-lg-9">
                                                <input className="form-control" type="email" value={user.data.email} onChange={(e) => setEmail(e.target.value)}/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-lg-3 col-form-label form-control-label">Phone Number</label>
                                            <div className="col-lg-9">
                                                <input className="form-control" type="email" value="0912345678" />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-lg-3 col-form-label form-control-label">Date of Birth</label>
                                            <div className="col-lg-9">
                                            <input type="date" className="form-control" id="floatingDOB" placeholder="Date of Birth" value={user.data.DOB} onChange={(e) => setDOB(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-lg-3 col-form-label form-control-label">Change profile</label>
                                            <div className="col-lg-9">
                                                <input className="form-control" type="file" />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-lg-3 col-form-label form-control-label">Password</label>
                                            <div className="col-lg-9">
                                                <input className="form-control" type="password" value="11111122333" />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-lg-3 col-form-label form-control-label">Confirm password</label>
                                            <div className="col-lg-9">
                                                <input className="form-control" type="password" value="11111122333" />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-lg-3 col-form-label form-control-label"></label>
                                            <div className="col-lg-9">
                                                <input type="reset" className="btn btn-secondary" style={{"marginRight": "0.5rem"}} value="Cancel" />
                                                <input type="button" className="btn btn-primary" value="Save Changes" />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}