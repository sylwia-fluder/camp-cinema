import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import MyPayments from './pages/MyPayments';
import MyTickets from './pages/MyTickets';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Navbar from './components/Navbar'
import PrivateRoute from './PrivateRoute';
import { AuthContext } from './context/auth';
import { ROUTES, STORAGE_NAMES } from './constants';
import Movies from './pages/Movies';

export const TOAST_OPTIONS = {
    position: 'bottom-right',
    autoClose: 5000,
    newestOnTop: true,
    pauseOnHover: true,
};

const App = () => {
    const localStorageToken = localStorage.getItem(STORAGE_NAMES.TOKEN);
    const [authTokens, setAuthTokens] = useState(
        localStorageToken === 'undefined' || localStorageToken === null ? '' : localStorageToken
    );

    const setTokens = (data) => {
        localStorage.setItem(STORAGE_NAMES.TOKEN, JSON.stringify(data));
        setAuthTokens(data);
    };

    return (
        
        <AuthContext.Provider value={{authTokens, setAuthTokens: setTokens}}>
            <Router>
                <React.Fragment>
                    <ToastContainer {...TOAST_OPTIONS}/>
                    <Navbar />
                    <div className='content'>
                        <Route exact path={ROUTES.HOME} component={Home}/>
                        <Route path={ROUTES.SIGN_IN} component={SignIn}/>
                        <Route path={ROUTES.SIGN_UP} component={SignUp}/>
                        <Route path={ROUTES.MOVIES} component={Movies}/>
                        <PrivateRoute path={ROUTES.MY_PAYMENTS} component={MyPayments}/>
                        <PrivateRoute path={ROUTES.MY_TICKETS} component={MyTickets}/>
                    </div>
                </React.Fragment>
            </Router>
        </AuthContext.Provider>
    );
};

export default App;
