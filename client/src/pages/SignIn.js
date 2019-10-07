import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import * as yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useAuth } from '../context/auth';
import Error from '../components/Error';
import Loading from '../components/Loading';
import Input from '../components/Input';
import Button from '../components/Button';
import Curtains from '../components/Curtains';
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

const SignIn = (props) => {
    const { authTokens, setAuthTokens } = useAuth();

    const [isLoggedIn, setLoggedIn] = useState(authTokens);
    const [showLoader, setShowLoader] = useState(false);
    const referer = get(props.location, 'state.referer.pathname', ROUTES.MY_TICKETS);

    const postLogin = (values) => {
        setShowLoader(true);

        fetch(
            ENDPOINTS.SIGN_IN,
            {
                method: 'POST',
                body: JSON.stringify({
                    email: values.email,
                    password: values.password,
                }),
                headers: headers(),
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
        <Curtains>
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
                           size='large'
                           custom='center'/>
                    <ErrorMessage component={Error}
                                  name='email'
                                  custom='center'/>
                    <Field component={Input}
                           type='password'
                           name='password'
                           placeholder='Password'
                           size='large'
                           custom='center'/>
                    <ErrorMessage component={Error}
                                  name='password'
                                  custom='center'/>
                    <Button type='submit'
                            custom='center'>
                        Sign In
                    </Button>
                </Form>
            </Formik>
        </Curtains>
    );
};

SignIn.propTypes = {
    location: PropTypes.object,
};

export default SignIn;