import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import { ROUTES } from '../../constants';
import './logo.scss';

const Logo = () => {
    return (
        <Link to={ROUTES.HOME} className='logo-box'>
            <FontAwesomeIcon className='logo-img' icon={faFilm}/>
            <p className='logo-text'>CAMP CINEMA</p>
        </Link>
    )
};

export default Logo;