import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { get } from 'lodash';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import Error from '../components/Error';
import Loading from '../components/Loading';
import Input from '../components/Input';
import Button from '../components/Button';
import Curtains from '../components/Curtains';
import { ENDPOINTS, HEADER_TOKEN, ROUTES } from '../constants';
import { useAuth } from '../context/auth';
import { headers } from '../helpers';

const SignUpModel = {
    email: '',
    password: '',
    passwordConfirm: '',
};

const SignUpSchema = yup.object().shape({
    email: yup
        .string()
        .email()
        .required(),
    password: yup
        .string()
        .min(8)
        .max(16)
        .required(),
    passwordConfirm: yup
        .string()
        .oneOf([yup.ref('password'), null], 'passwords must match')
        .required('password confirm is required'),
});

const SignUp = (props) => {
    const { authTokens, setAuthTokens } = useAuth();
    const [isLoggedIn, setLoggedIn] = useState(authTokens);
    const [showLoader, setShowLoader] = useState(false);

    const referer = get(props.location, 'state.referer.pathname', ROUTES.MY_TICKETS);

    const postRegister = (values) => {
        setShowLoader(true);

        fetch(
            ENDPOINTS.SIGN_UP,
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
                toast.success('The user has been added');
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
                initialValues={SignUpModel}
                validationSchema={SignUpSchema}
                onSubmit={values => postRegister(values)}
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
                    <Field component={Input}
                           type='password'
                           name='passwordConfirm'
                           placeholder='Password Confirm'
                           size='large'
                           custom='center'/>
                    <ErrorMessage component={Error}
                                  name='passwordConfirm'
                                  custom='center'/>
                    <Button type='submit'
                            custom='center'>
                        Sign Up
                    </Button>
                </Form>
            </Formik>
        </Curtains>
    );
};

SignUp.propTypes = {
    location: PropTypes.object,
};

export default SignUp;

