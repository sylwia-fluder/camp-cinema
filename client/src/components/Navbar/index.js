import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants';
import Logo from '../Logo'
import './navbar.scss';

const Navbar = () => {
    return (
      <nav>
        <Logo className='logo'/>
        <ul className="navbar">
          <li>
            <Link className="nav-link">MOVIES</Link>
          </li>
          <li>
            <Link className="nav-link">EVENTS</Link>
          </li>
          <li>
            <Link className="nav-link">MEMBERSHIP</Link>
          </li>
          <li>
            <Link to={ROUTES.SIGN_IN} className="nav-link sign-in">
              SIGN IN
            </Link>
          </li>
          <li>
            <Link to={ROUTES.SIGN_UP} className="nav-link button">
              SIGN UP
            </Link>
          </li>
        </ul>
      </nav>
    );
};

export default Navbar;