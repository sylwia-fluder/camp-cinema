import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './context/auth';
import { ROUTES } from './constants';

const PrivateRoute = ({component: Component, ...rest}) => {
    const { authTokens } = useAuth();

    return (
        <Route {...rest}
               render={props => (
                   authTokens ?
                       <Component {...props} /> :
                       <Redirect to={{pathname: ROUTES.SIGN_IN, state: {referer: props.location}}}/>
               )}
        />
    );
};

PrivateRoute.propTypes = {
    component: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.func,
    ]),
    location: PropTypes.object,
};

export default PrivateRoute;