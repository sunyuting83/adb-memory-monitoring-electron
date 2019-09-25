import React from "react";
import { withRouter } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import back from './icons/back.svg';
import home from './icons/home.svg';

const Back = ({ history }) =>
    history.length > 1 && (
        <header>
            <img src={back} onClick={history.goBack} className="back" alt="back" />
            <NavLink to={`/`}><img src={home} className="back" alt="home" /></NavLink>
        </header>
    );

export default withRouter(Back);