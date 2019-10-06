import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants';
import './logo.scss';

const Logo = () => {
    return (
        <Link to={ROUTES.HOME} className='logo-box'>
            <img className='logo-img' src='logo-img.png'></img>
            <p className='logo-text'>CAMP CINEMA</p>
        </Link>
    )
};

export default Logo;