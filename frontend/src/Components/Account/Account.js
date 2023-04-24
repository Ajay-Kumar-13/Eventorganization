import React, { useEffect, useState } from "react";
import './Account.css';
import HomeIcon from '@material-ui/icons/Home';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import EmailIcon from "@material-ui/icons/Email";
import PersonIcon from '@material-ui/icons/Person';
import LocationOnIcon from "@material-ui/icons/LocationOn";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Descrpt from "./Descrpt";

function Account() {

    axios.defaults.withCredentials = true;

    const [user, setUser] = useState(null);
    const [show, setShow] = useState(false);
    const [haveAccount, sethaveAccount] = useState(false);
    const [newUser, setnewUser] = useState({
        name: "",
        mobile: "",
        password: "",
        check: false
    });
    const [checked, setChecked] = useState(false);
    const [oldPass, setoldPass] = useState(false);
    const [error, setError] = useState(true);
    const [desc, setDesc] = useState();
    const [description, setDescription] = useState([]);
    const [event, handleEvent] = useState({
        name: "",
        venue: "",
        about: "",
        date: "",
        description: [],
        fare: "",
        type: "",
        startTime: "",
        endTime: "",
        day: ''
    })

    const navigate = useNavigate();
    const location = useLocation();

    const [updatedUser, setupdatedUser] = useState({
        name: location.state?.userName?.username,
        mobile: location.state?.userName?.mobile,
        check: location.state?.userName?.owner,
        password: "",
        newpassword: ""
    })

    useEffect(() => {
        document.getElementById("datepicker")
    })

    useEffect(() => {
        handleEvent(prev => {
            return ({
                ...prev, description: description
            })
        });
        setDesc("");
    }, [description])

    const toogleDiv = () => {
        var x = document.getElementById("toogleDiv");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    }

    const handleAccount = () => {
        setShow(true);
        setUser("creating user");
    }

    const handleClick = () => {
        setnewUser(prev => {
            return ({
                ...prev, check: !checked
            })
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setnewUser(prev => {
            return ({
                ...prev, [name]: value
            })
        })
    }

    const handleForm = (e) => {
        const { name, value } = e.target;
        setupdatedUser(prev => {
            return ({
                ...prev, [name]: value
            })
        })
    }

    const handleLeft = () => {
        window.location.reload()
    }

    const handleSubmit = () => {

        if (haveAccount) {
            axios.post("https://event-organization.onrender.com/login", newUser, { withCredentials: true })
                .then(response => {
                    console.log(response.data);
                    if (response.data.login) {

                        if (location.state?.userName) {
                            console.log("login succesfully not navigate to concert route");
                            navigate("/concert", { state: location.state });
                        } else {
                            console.log("login succesfully!");
                            navigate('/');
                        }

                    } else {
                        navigate("/account");
                    }
                })
        } else {
            axios.post("https://event-organization.onrender.com/register", newUser, { withCredentials: true })
                .then(response => {
                    if (response.data.registered) {
                        if (location.state) {
                            console.log("registered succesfully not navigate to concert route");
                            navigate("/concert", { state: location.state });
                        } else {
                            console.log("registered succesfully!");
                            navigate('/');
                        }

                    } else {
                        navigate("/account");
                    }
                })
                .catch(e => {
                    console.log(e);
                })
        }
    }

    const handleHome = () => {
        navigate('/');
    }

    const handlehaveAccount = () => {
        setShow(true);
        setUser("creating user");
        sethaveAccount(true);
    }

    const handleUpdate = () => {
        axios.put("https://event-organization.onrender.com/updateUser/" + location.state?.userName?._id, updatedUser, { withCredentials: true })
            .then(response => {
                if (response.data.docs) {
                    document.getElementById("confirmation").style.display = "flex";
                    setTimeout(() => {
                        document.getElementById("confirmation").style.display = "none";
                    }, 2000)
                    setTimeout(() => {
                        navigate('/');
                    }, 2000)
                }
            })
    }

    const handleCancel = () => {
        window.location.reload();
    }

    const handlePassword = (e) => {
        const { name, value } = e.target;
        setupdatedUser(prev => {
            return ({
                ...prev, [name]: value
            })
        })
    }

    const handleNewpass = () => {
        setoldPass(true);
        if (updatedUser.password.length > 0) {
            if (updatedUser.password !== location.state?.userName?.password) {
                setError(true);
                document.getElementById("error").style.display = "flex";
                setTimeout(() => {
                    document.getElementById("error").style.display = "none";
                }, 2000)
            } else {
                setError(false);
            }
        }
    }

    const handleDesc = (e) => {
        setDesc(e.target.value);

    }

    const addDesc = () => {
        setDescription(prev => [...prev, desc]);
    }

    const handleEventForm = (e) => {
        const { name, value } = e.target;
        handleEvent(prev => {
            return ({
                ...prev, [name]: value
            })
        })
    }

    const handleSubmitEvent = () => {
        axios.post("https://event-organization.onrender.com/registerEvent", event)
            .then(response => {
                if (response.data.sent) {
                    navigate('/');
                }
            })
    }

    return (
        <React.Fragment>
            <div className="account">
                <div class="topbar">
                    {
                        show ?
                            <div class="left">
                                <i class="fas fa-solid fa-chevron-left" onClick={handleLeft}></i>
                            </div>
                            : <div class="bars" onClick={toogleDiv}>
                                <i class="fas fa-solid fa-bars-staggered"></i>
                            </div>

                    }
                    <div class="location">
                        <LocationOnIcon style={{ color: "red" }} /> Andhra pradesh,India
                    </div>
                    <div class="astronaut"  >
                        <PersonIcon />
                    </div>
                </div>

                {
                    location.state?.userName ? <div className="userDetails">
                        <div>

                            <div className="confirmation" id="confirmation">
                                Updated succesfully!
                            </div>

                            <div className="error" id="error">
                                Incorrect Password!
                            </div>

                            <div class="form-group">
                                <label for="exampleInputusername">Username</label>
                                <input type="text" class="form-control" id="exampleInputusername" name="name" onChange={handleForm} value={updatedUser.name} placeholder="Enter new Username" />
                            </div>
                            <div class="form-group">
                                <label for="exampleInputmbn">Mobile</label>
                                <input type="text" class="form-control" id="exampleInputmbn" name="mobile" onChange={handleForm} value={updatedUser.mobile} placeholder="Enter new Mobile number" />
                            </div>

                            <div className="form-group">

                                {oldPass ?
                                    <React.Fragment>
                                        <label for="exampleInputoldpassword">Old Password</label>
                                        <input type="password" class="form-control" id="exampleInputoldpassword" name="password" onChange={handlePassword} value={updatedUser.password} placeholder="Enter old password" />
                                    </React.Fragment>
                                    : null}
                                <label for="exampleInputnewpassword">New Password</label>
                                <input type="password" class="form-control" id="exampleInputnewpassword" name="newpassword" onClick={handleNewpass} onChange={handleForm} value={updatedUser.newpassword} placeholder="Enter new password" readOnly={error} />
                            </div>

                            <div className="button-group">
                                <button type="button" class="btn btn-success" onClick={handleUpdate}>Update Changes</button>
                                <button type="submit" class="btn btn-danger" onClick={handleCancel}>Cancel Changes</button>
                            </div>

                            {
                                location.state?.userName.owner ?
                                    <div className="createEvent">

                                        <p style={{ textAlign: "center" }}>CREATE A BRAND NEW EVENT</p>
                                        <div class="form-group">
                                            <label for="exampleInputEmail1">Event Name</label>
                                            <input type="text" name="name" value={event.name} onChange={handleEventForm} class="form-control" id="exampleInputEmail1" placeholder="Enter Event Name" />
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleInputPassword1">Venue</label>
                                            <input type="text" name="venue" value={event.venue} onChange={handleEventForm} class="form-control" placeholder="Enter Venue" />
                                        </div>
                                        <div className="form-group">
                                            <label for="dateandtime">Date</label>
                                            <input type='date' name="date" value={event.date} onChange={handleEventForm} className="form-control" id='dateandtime'></input>
                                        </div>
                                        <div className="form-group">
                                            <label for="select">Day</label>
                                            <select class="form-select" name="day" value={event.day} onChange={handleEventForm} aria-label="Default select example">
                                                <option selected>Choose the Day</option>
                                                <option value="Monday">Monday</option>
                                                <option value="Tuesday">Tuesday</option>
                                                <option value="Wednesday">Wednesday</option>
                                                <option value="Thrusday">Thrusday</option>
                                                <option value="Friday">Friday</option>
                                                <option value="Saturday">Saturday</option>
                                                <option value="Sunday">Sunday</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label for="textarea">About this Event</label>
                                            <textarea id="textarea" name="about" value={event.about} onChange={handleEventForm} className="form-control" rows={3} placeholder="About this Event"></textarea>
                                        </div>
                                        <div className="form-group add">
                                            <label for="description">Description</label><br></br>
                                            <ul>
                                                {
                                                    description && description.map((desc, index) => <Descrpt key={index} d={desc} />)
                                                }
                                            </ul>
                                            <input id="description" name="description" value={desc} className="form-control" rows={3} onChange={handleDesc} placeholder="Description"></input>
                                            <div className="addSymbol" onClick={addDesc}>
                                                <i class="fa-sharp fa-solid fa-plus"></i>
                                            </div>
                                        </div>
                                        <div className="form-group timeselector">
                                            <div className="col-6">
                                                <label>Start Time</label>
                                                <input type="time" name="startTime" value={event.startTime} onChange={handleEventForm} placeholder="Time"></input>
                                            </div>
                                            <div className="col-6">
                                                <label>End Time</label>
                                                <input type="time" name="endTime" value={event.endTime} onChange={handleEventForm}></input>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label for="select">Event Type</label>
                                            <select class="form-select" name="type" value={event.type} onChange={handleEventForm} aria-label="Default select example">
                                                <option selected>Choose the Event Type</option>
                                                <option value="Concert">Concert</option>
                                                <option value="Food">Food</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label for="fare">Fare</label>
                                            <input id="fare" name="fare" value={event.fare} onChange={handleEventForm} className="form-control" placeholder="Cost of this Event"></input>
                                        </div>

                                        <button className="btn btn-outline-success" onClick={handleSubmitEvent}>Submit</button>

                                    </div>
                                    : null
                            }
                        </div>
                    </div>
                        :
                        <div>
                            {
                                user ? <div>

                                </div> : <div className="createAccount">
                                    <p>Oops! It seems you haven't logged in!</p>
                                    <p>Click here to create an account</p>
                                    <button className="btn btn-outline-danger" onClick={handleAccount}>Create Account</button>
                                    <p class="haveAccount" onClick={handlehaveAccount} style={{ color: "gray" }}>Already have an account?<a> Sign in</a></p>
                                </div>
                            }
                            {
                                show && <div className="form">
                                    <p>Fill your details</p>
                                    <div className="form-group">
                                        {/* <label for="name">Name</label> */}
                                        <input type="text" id="name" className="form-control" name="name" value={newUser.name} onChange={handleChange} placeholder="Enter your username"></input>
                                    </div>
                                    {
                                        haveAccount ? <div></div> : <div className="form-group">
                                            {/* <label for="mobile">Mobile Number</label> */}
                                            <input type="number" id="mobile" className="form-control" name="mobile" value={newUser.mobile} onChange={handleChange} placeholder="Enter your mobile number"></input>
                                        </div>
                                    }
                                    <div class="form-group">
                                        {/* <label for="exampleInputPassword1">Password</label> */}
                                        <input type="password" class="form-control" onChange={handleChange} name="password" value={newUser.password} id="exampleInputPassword1" placeholder="Password"></input>
                                    </div>
                                    {
                                        haveAccount ? <div></div> : <div className="form-check">
                                            <input type="checkbox" className="form-check-input" checked={checked} onClick={handleClick} onChange={e => setChecked(e.target.checked)} name="createEvents" value={newUser.createEvents} id="checkbox"></input>
                                            <label class="form-check-label" for="checkbox">I want to create Events</label>
                                        </div>
                                    }


                                    <button className="btn" onClick={handleSubmit}>{haveAccount ? "Login" : "Sign Up"}</button>

                                </div>
                            }
                        </div>
                }


                <div class="bottomNavbar">

                    <div class="ficon" onClick={handleHome}>
                        <HomeIcon />
                    </div>
                    <div class="ficon">
                        <FavoriteBorderIcon />
                    </div>
                    <div class="ficon">
                        <EmailIcon />
                    </div>
                    <div class="ficon active">
                        <PersonIcon />
                    </div>

                </div>
            </div>
            <div id="toogleDiv">
                <div className="content">
                    <div>
                        My Account
                    </div>
                    <hr></hr>
                    <div>
                        My Passes
                    </div>
                    <hr></hr>
                    <div>
                        Logout
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Account;
