import React from 'react';
import { useAuth } from '../context/auth';

const MyTickets = () => {
    const {setAuthTokens} = useAuth();

    const logOut = () => setAuthTokens();

    return (
        <React.Fragment>
            <div>My Account</div>
            <button onClick={logOut}>Log out</button>
        </React.Fragment>
    );
};

export default MyTickets;