import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import MyTickets from './pages/MyTickets';
import SingIn from './pages/SingIn';
import SignUp from './pages/SignUp';
import PrivateRoute from './PrivateRoute';
import { AuthContext } from './context/auth';
import { ROUTES, STORAGE_NAMES } from './constants';

export const TOAST_OPTIONS = {
    position: 'bottom-right',
    autoClose: 5000,
    newestOnTop: true,
    pauseOnHover: true,
};

const App = () => {
    const [authTokens, setAuthTokens] = useState();

    const setTokens = (data) => {
        localStorage.setItem(STORAGE_NAMES.TOKEN, JSON.stringify(data));
        setAuthTokens(data);
    };

    return (
        <AuthContext.Provider value={{authTokens, setAuthTokens: setTokens}}>
            <Router>
                <React.Fragment>
                    <ToastContainer {...TOAST_OPTIONS}/>
                    <ul>
                        <li>
                            <Link to={ROUTES.HOME}>Home Page</Link>
                        </li>
                        <li>
                            <Link to={ROUTES.SIGN_IN}>Sing In</Link>
                        </li>
                        <li>
                            <Link to={ROUTES.SING_UP}>Sing up</Link>
                        </li>
                    </ul>
                    <Route exact path={ROUTES.HOME} component={Home}/>
                    <Route path={ROUTES.SIGN_IN} component={SingIn}/>
                    <Route path={ROUTES.SING_UP} component={SignUp}/>
                    <PrivateRoute path={ROUTES.MY_TICKETS} component={MyTickets}/>
                </React.Fragment>
            </Router>
        </AuthContext.Provider>
    );
};

export default App;
