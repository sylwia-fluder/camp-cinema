import React from 'react';
import {Link} from 'react-router-dom';
import {ROUTES} from '../../constants';
import Logo from '../Logo'
import './navbar.scss';
import {useAuth} from '../../context/auth';

const Navbar = () => {
    const {authTokens, setAuthTokens} = useAuth();
    const logOut = () => setAuthTokens();

    return (
        <nav>
            <Logo className='logo'/>
            <ul className='navbar'>
                <li>
                    <Link className='nav-link'>MOVIES</Link>
                </li>
                <li>
                    <Link className='nav-link'>EVENTS</Link>
                </li>
                <li>
                    <Link className='nav-link'>MEMBERSHIP</Link>
                </li>
                {authTokens ?
                    <React.Fragment>
                        <li>
                            <div onClick={logOut} className='nav-link sign-in'>
                                LOG OUT
                            </div>
                        </li>
                        <li>
                            <Link to={ROUTES.MY_TICKETS} className='nav-link button'>
                                USER
                            </Link>
                        </li>
                    </React.Fragment> :
                    <React.Fragment>
                        <li>
                            <Link to={ROUTES.SIGN_IN} className='nav-link sign-in'>
                                SIGN IN
                            </Link>
                        </li>
                        <li>
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