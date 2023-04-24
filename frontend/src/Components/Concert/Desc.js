import React from "react";

function Desc(props) {
    return (
        <React.Fragment>
            <div class="description">
                <div class="checkmark">
                    <i class="fa-duotone fa-solid fa-circle-check"></i>
                </div>
                <div class="cdescription">
                    {props.desc}
                </div>
            </div>
        </React.Fragment>
    )
}

export default Desc;