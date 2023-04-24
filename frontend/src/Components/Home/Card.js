import React from "react";
import {useNavigate} from 'react-router-dom';

function Card(props) {

    
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate('/concert', {state: props});
    }

    return (
        <React.Fragment>
            <div class="card" onClick={handleClick}>
                <img src={`/Images/${props.image}`} class="card-img-top" alt="..." />
                <div class="card-body">
                    <div class="venue">
                        <h5 class="card-title">{props.title}</h5>
                        <p class="card-text">{props.text}</p>
                    </div>
                    <div class="fare">
                        <h3>{props.fare}</h3>
                    </div>
                </div>
                <div class="date">
                    <h4>{props.date}</h4>
                    <h6>{props.month}</h6>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Card;