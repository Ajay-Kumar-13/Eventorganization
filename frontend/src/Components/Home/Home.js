import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PersonIcon from '@material-ui/icons/Person';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import SearchIcon from '@material-ui/icons/Search';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import HomeIcon from '@material-ui/icons/Home';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import EmailIcon from '@material-ui/icons/Email';
import SettingsIcon from '@material-ui/icons/Settings';
import './Home.css';
import axios from "axios";
import Card from "./Card";

function Home() {

    const [Events, setEvents] = useState(null);
    const [allEvents, setAllEvents] = useState([]);
    const [user, setUser] = useState();
    const [userObj, setUserobj] = useState();

    axios.defaults.withCredentials = true;

    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://" + window.location.hostname + ":5000/getSession")
            .then(response => {
                setUser(response.data.userName.username);
                setUserobj(response.data);
            })
    }, [])

    useEffect(() => {
        axios.get("http://" + window.location.hostname + ":5000/getEvents")
            .then(response => {
                if (response.data.length != 0) {
                    console.log("In frontend", response.data);
                    setAllEvents([response.data]);
                    setEvents([response.data]);
                }
            })
    }, []);

    const manageEvents = (e) => {
        handleNavbar(e);
        axios.get("http://" + window.location.hostname + ":5000/getEvents")
            .then(response => {
                if (response.data.length != 0) {
                    console.log("In frontend", response.data);
                    setAllEvents([response.data]);
                    setEvents([response.data]);
                }
            })
    }

    const manageLikedEvents = (e) => {
        handleNavbar(e);
        axios.get("http://" + window.location.hostname + ":5000/getLikedEvents/"+user)
            .then(response => {
                var data = allEvents[0].filter(event => {
                    for (let i = 0; i < response.data.length; i++) {
                        if (event._id === response.data[i].eventId) {
                            return event;
                        }
                    }
                })
                setAllEvents([data]);
            })
    }

    const getFoodStalls = (event) => {
        return event.eventType === "Food";
    }

    const getConcerts = (event) => {
        return event.eventType === "Concert";
    }

    const getEvents = (event) => {
        return event.eventType === "Food" || event.eventType === "Concert";
    }

    const changeClass = (e) => {
        document.querySelector('.buttons').childNodes.forEach((n) => {
            n.classList.remove('active');
        });
        e.target.classList.add('active');
    }

    const changeNavClass = (e) => {
        document.querySelector('.bottomNavbar').childNodes.forEach((n) => {
            n.classList.remove('active');
        });
        e.target.classList.add('active');
    }

    const handleFoodSection = (e) => {
        var Foodstalls = allEvents[0].filter(getFoodStalls);
        setEvents([Foodstalls]);
        changeClass(e);
    }

    const handleConcertSection = (e) => {
        var Concerts = allEvents[0].filter(getConcerts);
        setEvents([Concerts]);
        changeClass(e);
    }

    const handleMyFeed = (e) => {
        var Feed = allEvents[0].filter(getEvents);
        setEvents([Feed]);
        changeClass(e);
    }

    const handleNavbar = (e) => {
        changeNavClass(e);
    }

    const handleMyAccount = () => {
        navigate('/account')
    }

    const handleAccount = (e) => {
        axios.get("http://"+window.location.hostname+":5000/getSession")
            .then(response => {
                navigate('/account', {state: response.data})
            })
    }

    const toogleDiv = () => {
        var x = document.getElementById("toogleDiv");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    }

    const toogleSettings = () => {
        var x = document.getElementById("settingDiv");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    } 

    const handleLogout = () => {
        axios.get("http://"+window.location.hostname+":5000/logout")
            .then(response => {
                console.log(response);
                if(response.data.logout) {
                    navigate('/');
                }
            })
    }


    return (
        <React.Fragment>
            {/* Topbar */}
            <div className="homeBody">
                <div class="topbar">

                    <div class="bars" onClick={toogleDiv}>
                        <i class="fas fa-solid fa-bars-staggered"></i>
                    </div>
                    <div class="location">
                        <LocationOnIcon style={{ color: "red" }} /> Andhra pradesh,India
                    </div>
                    <div class="astronaut" onClick={toogleSettings} >
                        <SettingsIcon />
                    </div>
                </div>
                {/* <!-- Search Bar --> */}
                <div class="search">
                    <div class="searchbar">
                        <SearchIcon />
                        <input type="text" placeholder="Search all events..." />
                    </div>
                </div>
                {/* <!-- navbar --> */}
                <div class="navbar">
                    <div class="title">
                        <strong>Upcoming events</strong>
                    </div>
                    <div class="seeAllLink">
                        <a href="#">See All</a>
                    </div>
                </div>
                {/* <!-- buttons --> */}
                <div class="buttons">
                    <div class="button active myfeed" onClick={handleMyFeed}>
                        <div class="icon">
                            <i class="fas fa-solid fa-bolt"></i>
                        </div>
                        My Feed
                    </div>
                    <div class="button food" onClick={handleFoodSection}>
                        <div class="icon">
                            <RestaurantIcon />
                        </div>
                        Food
                    </div>
                    <div class="button concerts" onClick={handleConcertSection}>
                        <div class="icon">
                            <MusicNoteIcon />
                        </div>
                        Concert
                    </div>
                </div>

                {/* <!-- cards --> */}

                <div class="events">
                    {
                        Events && Events[0].map((event, index) => <Card key={index} title={event.cardTitle}
                            text={event.cardText} fare={event.fare} day={event.day} month={event.month}
                            image={event.image} venue={event.venue} date={event.date} time={event.time}
                            description={event.description} about={event.about} cardId={event._id}
                            eventType={event.eventType}
                        />)
                    }
                </div>

                {/* <!-- bottomNavbar --> */}

                <div class="bottomNavbar">

                    <div class="ficon active" onClick={manageEvents}>
                        <HomeIcon />
                    </div>
                    <div class="ficon" onClick={manageLikedEvents}>
                        <FavoriteBorderIcon />
                    </div>
                    <div class="ficon">
                        <EmailIcon />
                    </div>
                    <div class="ficon" onClick={handleAccount}>
                        <PersonIcon />
                    </div>

                </div>

                {/* topbar tooglediv */}
                <div id="toogleDiv">
                    <div className="content">
                        <div onClick={handleMyAccount}>
                            My Account
                        </div>
                        <hr></hr>
                        <div>
                            My Passes
                        </div>
                        <hr></hr>
                        <div onClick={handleLogout}>
                            Logout
                        </div>
                    </div>
                </div>

                <div id="settingDiv">
                <div className="content">
                        <div onClick={() => {navigate('/account', {state: userObj})}}>
                            Update Username
                        </div>
                        <hr></hr>
                        <div onClick={() => {navigate('/account', {state: userObj})}}>
                            Update Password
                        </div>
                        <hr></hr>
                        <div onClick={() => {navigate('/account', {state: userObj})}}>
                            Update Mobile Number
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Home;