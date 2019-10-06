import React from 'react';
import { Link } from 'react-router-dom';
import shortid from 'shortid';
import { ROUTES } from '../../constants';
import Logo from '../Logo'
import './navbar.scss';
import { useAuth } from '../../context/auth';

const Navbar = () => {
    const {authTokens, setAuthTokens} = useAuth();
    const logOut = () => setAuthTokens();

    const links = [
        <Link className='nav-link'>MOVIES</Link>,
        <Link className='nav-link'>EVENTS</Link>,
        <Link className='nav-link'>MEMBERSHIP</Link>,
    ];

    const items = links.map(link => {
        return <li key={shortid.generate()} className='navbar-item'>{link}</li>
    });

    return (
        <nav className='navbar-box'>
            <Logo className='logo'/>
            <ul className='navbar'>
                {items}
                {authTokens ?
                    <React.Fragment>
                        <li className='navbar-item'>
                            <div onClick={logOut} className='nav-link sign-in'>
                                LOG OUT
                            </div>
                        </li>
                        <li className='navbar-item'>
                            <Link to={ROUTES.MY_TICKETS} className='nav-link button'>
                                USER
                            </Link>
                        </li>
                    </React.Fragment> :
                    <React.Fragment>
                        <li className='navbar-item'>
                            <Link to={ROUTES.SIGN_IN} className='nav-link sign-in'>
                                SIGN IN
                            </Link>
                        </li>
                        <li className='navbar-item'>
                            <Link to={ROUTES.SIGN_UP} className='nav-link button'>
                                SIGN UP
                            </Link>
                        </li>
                    </React.Fragment>
                }
            </ul>
        </nav>
    );
};

export default Navbar;