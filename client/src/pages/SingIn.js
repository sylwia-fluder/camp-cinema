import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import get from 'lodash';
import * as yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useAuth } from '../context/auth';
import Error from '../components/Error';
import Loading from '../components/Loading';
import Input from '../components/Input';
import { ENDPOINTS, ROUTES, HEADER_TOKEN } from '../constants';
import { headers } from '../helpers';

const SignInModel = {
    email: '',
    password: '',
};

const SignInSchema = yup.object().shape({
    email: yup
        .string()
        .email()
        .required(),
    password: yup
        .string()
        .min(8)
        .max(16)
        .required(),
});

const SingIn = (props) => {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [showLoader, setShowLoader] = useState(false);

    const {setAuthTokens} = useAuth();
    const referer = get(props.location, 'state.referer', ROUTES.MY_TICKETS);

    const postLogin = (values) => {
        // TODO: change fetch login
        setShowLoader(true);

        fetch(
            ENDPOINTS.SING_IN,
            {
                method: 'POST',
                body: values,
                headers: headers,
            }
        ).then(response => {
            if (!response.ok) {
                throw new Error('Not 200 response');
            } else {
                setAuthTokens(response.headers.get(HEADER_TOKEN));
                setLoggedIn(true);
            }
        }).catch(() => {
            setShowLoader(false);
            toast.error('Something went wrong...');
        });
    };

    if (isLoggedIn) return <Redirect to={referer}/>;

    return (
        <Formik
            initialValues={SignInModel}
            validationSchema={SignInSchema}
            onSubmit={values => postLogin(values)}
        >
            <Form>
                {showLoader && <Loading fixed/>}
                <Field component={Input}
                       type='text'
                       name='email'
                       placeholder='Email'
                       size='large'/>
                <ErrorMessage component={Error}
                              name='email'/>
                <Field component={Input}
                       type='password'
                       name='password'
                       placeholder='Password'
                       size='large'/>
                <ErrorMessage component={Error}
                              name='password'/>
                <button type='submit'
                        onClick={postLogin}>
                    Sign In
                </button>
            </Form>
        </Formik>
    );
};

SingIn.propTypes = {
    location: PropTypes.object,
};

export default SingIn;