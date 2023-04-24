import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import ShareIcon from '@material-ui/icons/Share';
import './Concert.css';
import Desc from './Desc';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import axios from "axios";

function Concert() {

    axios.defaults.withCredentials = true;
    const [like, setLike] = useState(false);
    const [login, setLogin] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const handleLeft = () => {
        navigate("/")
    }

    const event = location.state;


    useEffect(() => {
        console.log("checking...");
        checkSession();
    }, [])

    useEffect(() => {
        axios.get("http://" + window.location.hostname + ":5000/getSession")
            .then(response => {
                axios.get("http://" + window.location.hostname + ":5000/checkLike/" + event.cardId + "/" + response.data.userName.username)
                    .then(response => {
                        if (response.data.length > 0) {
                            setLike(true);
                        }
                    })
            })
    }, [])

    const handleTicket = () => {
        navigate('/ticket', { state: event });
    }

    const handleLike = () => {
        setLike(!like);
        if (!like) {
            axios.post("http://" + window.location.hostname + ":5000/addLikedEvents", { cardID: event.cardId, eventType: event.eventType });
        } else {
            axios.delete("http://" + window.location.hostname + ":5000/deleteLike/" + event.cardId);
        }
    }

    const checkSession = () => {
        axios.get("http://" + window.location.hostname + ":5000/checkSession")
            .then(response => {
                console.log("login status: " + response.data.login);
                if (!response.data.login) {
                    navigate("/account", { state: event })
                } else {
                    setLogin(true);
                }
            })
    }




    return (
        <React.Fragment>
            {
                login && <div class="event">
                    <div class="topbar">
                        <div class="left">
                            <i class="fas fa-solid fa-chevron-left" onClick={handleLeft}></i>
                        </div>
                        <div class="mainTitle">
                            {event.title}
                        </div>
                        <div class="nodes">
                            <ShareIcon />
                        </div>
                    </div>

                    <div class="details">
                        <div class="block">
                            <div class="concertDetails">
                                <p class="concertTitle">{event.title}</p>
                                <p class="concertDescription">{event.venue}</p>
                            </div>
                            <div class="concertFare">
                                <span class="badge rounded-pill text-bg-light">{event.fare}</span>
                            </div>
                        </div>
                        <div class="block">
                            <div class="concertDetails">
                                <p class="concertTitle">{event.date}</p>
                                <p class="concertDescription">{event.month}</p>
                            </div>
                            <div class="concertDetails">
                                <p class="concertTitle">{event.day}</p>
                                <p class="concertDescription">{event.time}</p>
                            </div>
                            <div class="concertFare">
                                <i class="fas fa-2x fa-solid fa-calendar-days"></i>
                            </div>
                        </div>
                        <div class="block">
                            <div class="concertDetails" style={{ width: "100%" }}>
                                <p class="concertDescription">
                                    <strong>About this events:</strong> {event.about}
                                </p>
                            </div>
                        </div>
                        <div class="block">
                            <div class="concertDetails">
                                <p class="concertTitle" style={{ fontSize: "1rem" }}>Description</p>
                                <p class="concertDescription">

                                    {
                                        event.description && event.description.map((description, index) => <Desc key={index} desc={description} />)
                                    }

                                </p>

                            </div>
                        </div>
                    </div>

                    <div class="footer">
                        <div class="like" onClick={handleLike} style={{ color: like ? "rgb(237, 31, 66)" : "white" }}>
                            {like ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                        </div>
                        <div class="bookTicket">
                            <button class="getTicket" onClick={handleTicket}>Get a Ticket</button>
                        </div>
                    </div>
                </div>
            }
        </React.Fragment>
    )
}

export default Concert;