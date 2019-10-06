import React, { useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import Error from '../components/Error';
import Loading from '../components/Loading';
import Input from '../components/Input';
import { ENDPOINTS } from '../constants';
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

const SignUp = () => {
    const [showLoader, setShowLoader] = useState(false);

    const postRegister = (values) => {
        // TODO: change fetch register
        setShowLoader(true);

        fetch(
            ENDPOINTS.SIGN_UP,
            {
                method: 'POST',
                body: values,
                headers: headers,
            }
        ).then(response => {
            if (!response.ok) {
                throw new Error('Not 200 response');
            } else {
                toast.success('The user has been added');
            }
        }).catch(() => {
            setShowLoader(false);
            toast.error('Something went wrong...');
        });
    };

    return (
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
                <Field component={Input}
                       type='password'
                       name='passwordConfirm'
                       placeholder='Password Confirm'
                       size='large'/>
                <ErrorMessage component={Error}
                              name='passwordConfirm'/>
                <button type='submit'
                        onClick={postRegister}>
                    Sign Up
                </button>
            </Form>
        </Formik>
    );
};

export default SignUp;

