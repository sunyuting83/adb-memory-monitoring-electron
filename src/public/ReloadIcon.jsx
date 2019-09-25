import React from "react";
import reload from './icons/reload.svg';

const Reload = (props) => {
    return (
        <div className="cuur" onClick={() => props.reload()}>
            <img src={reload} className="cuur reload_Icon" alt="reload" />
        </div>
    )
};

export default Reload;