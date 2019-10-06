import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { useAuth } from '../../context/auth';
import './menu-user.scss';

const MenuUser = (props) => {
    const {setAuthTokens} = useAuth();

    const logOut = () => setAuthTokens();

    return (
        <React.Fragment>
            <ul className='menu-user'>
                <li>
                    <NavLink to={ROUTES.MY_TICKETS} className='menu-user__link'>
                        MY TICKETS
                    </NavLink>
                </li>
                <li>
                    <NavLink to={ROUTES.MY_PAYMENTS} className='menu-user__link'>
                        MY PAYMENTS
                    </NavLink>
                </li>
                <li>
                    <div className='menu-user__link' onClick={logOut}>
                        LOG OUT
                    </div>
                </li>
            </ul>
            <div className='content-user'>
                {props.children}
            </div>
        </React.Fragment>
    );
};

MenuUser.propTypes = {
    children: PropTypes.node.isRequired,
};

export default MenuUser;