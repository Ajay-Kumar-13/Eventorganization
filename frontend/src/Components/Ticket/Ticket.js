import React from "react";
import ShareIcon from '@material-ui/icons/Share';
import GetAppIcon from '@material-ui/icons/GetApp';
import './Ticket.css';
import {useNavigate, useLocation} from "react-router-dom";

function Ticket() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLeft = () => {
        navigate("/");
    }
    return (
        <React.Fragment>
            <div className="ticketBody">
                {/* <!-- Topbar --> */}
                <div className="topbar">
                    <div className="left">
                        <i onClick={handleLeft} class="fas fa-solid fa-chevron-left"></i>
                    </div>
                    <div className="mainTitle">
                        Tickets
                    </div>
                    <div className="nodes">
                        <ShareIcon />
                    </div>
                </div>

                {/* <!-- Ticket --> */}
                <div className="ticket">
                    <div className="card">
                        <img src="/Images/jocker.jpg" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <div className="title">
                                <h5 className="card-title">Oliver Tree Concert: Indonesia</h5>
                                <h5 className="card-title">29th December 2022</h5>
                                <hr className="dottedline" />
                            </div>
                            <div className="venue">
                                <div className="myrow">
                                    <div className="lt">
                                        Date
                                    </div>
                                    <div className="rt">
                                        Time
                                    </div>
                                </div>
                                <div className="myrow dark">
                                    <div className="lt">
                                        Dec 29th, 2022
                                    </div>
                                    <div className="rt">
                                        10:00 PM
                                    </div>
                                </div>
                                <div className="myrow">
                                    <div className="lt">
                                        Venue
                                    </div>
                                    <div className="rt">
                                        Gelora Bung Karno
                                    </div>
                                </div>
                                <div className="myrow dark">
                                    <div className="lt">
                                        Seat
                                    </div>
                                    <div className="rt">
                                        No Seat
                                    </div>
                                </div>
                            </div>
                            <hr className="dottedline" />
                            <div className="icon">
                                <i className="fas fa-2x fa-solid fa-barcode"></i>
                                <i className="fa-2x fa-solid fa-barcode"></i>
                                <i className="fa-2x fa-solid fa-barcode"></i>
                                <i className="fa-2x fa-solid fa-barcode"></i>
                                <i className="fa-2x fa-solid fa-barcode"></i>
                                <i className="fa-2x fa-solid fa-barcode"></i>
                                <i className="fa-2x fa-solid fa-barcode"></i>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- Footer --> */}

                <div className="ticketFooter">
                    <div className="Button">
                        <GetAppIcon />
                        Image
                    </div>
                    <div className="Button">
                        <i className="fa-solid fa-qrcode"></i>
                        QR Code
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Ticket;