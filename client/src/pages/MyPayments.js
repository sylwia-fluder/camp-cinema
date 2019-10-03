import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import valid from 'card-validator';
import {toast} from 'react-toastify';
import * as yup from 'yup';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import Error from '../components/Error';
import Loading from '../components/Loading';
import Input from '../components/Input';
import {ENDPOINTS} from '../constants';
import {headersWithToken} from '../helpers';

const PaymentsModel = ({...paymentsData}) => {
    return {
        name: paymentsData.name || '',
        cardNumber: paymentsData.cardNumber || '',
        expirationDate: paymentsData.expirationDate || '',
        cvv: paymentsData.cvv || '',
    };
};

const PaymentsSchema = yup.object().shape({
    name: yup
        .string()
        .required(),
    cardNumber: yup
        .string()
        .test(
            'test-card',
            'Card number is invalid',
            value => valid.number(value).isValid
        )
        .required(),
    expirationDate: yup
        .string()
        .test(
            'test-card',
            'Expiration date is invalid',
            value => valid.expirationDate(value).isValid
        )
        .required(),
    cvv: yup
        .string()
        .test(
            'test-card',
            'CVV is invalid',
            value => valid.cvv(value).isValid
        )
        .required(),
});

const MyPayments = () => {
    const [showLoader, setShowLoader] = useState(false);
    const [paymentsData, setPaymentsData] = useState({});

    useEffect(() => {
        getPayments();
    }, []);

    const getPayments = () => {
        // TODO: change fetch payment
        setShowLoader(true);

        fetch(
            ENDPOINTS.PAYMENTS,
            {
                method: 'GET',
                headers: headersWithToken,
            }
        ).then(response => {
            if (!response.ok) {
                throw new Error('Not 200 response');
            } else {
                setShowLoader(false);
                setPaymentsData(response);
            }
        }).catch(() => {
            setShowLoader(false);
            toast.error('Something went wrong...');
        });
    };

    const postPayments = (values) => {
        // TODO: change fetch payment
        setShowLoader(true);

        fetch(
            ENDPOINTS.PAYMENTS,
            {
                method: 'POST',
                body: values,
                headers: headersWithToken,
            }
        ).then(response => {
            if (!response.ok) {
                throw new Error('Not 200 response');
            } else {
                setShowLoader(false);
                toast.success('The payments has been saved');
            }
        }).catch(() => {
            setShowLoader(false);
            toast.error('Something went wrong...');
        });
    };

    return (
        <Formik
            enableReinitialize
            initialValues={PaymentsModel(paymentsData)}
            validationSchema={PaymentsSchema}
            onSubmit={values => postPayments(values)}
        >
            <Form>
                {showLoader && <Loading fixed/>}
                <Field component={Input}
                       type='text'
                       name='name'
                       placeholder='Name'
                       size='large'/>
                <ErrorMessage component={Error}
                              name='name'/>
                <Field component={Input}
                       type='text'
                       name='cardNumber'
                       placeholder='Card number'
                       size='large'/>
                <ErrorMessage component={Error}
                              name='cardNumber'/>
                <Field component={Input}
                       type='text'
                       name='expirationDate'
                       placeholder='Expiration date'
                       size='medium'/>
                <ErrorMessage component={Error}
                              name='expirationDate'/>
                <Field component={Input}
                       type='text'
                       name='cvv'
                       placeholder='CVV'
                       size='small'/>
                <ErrorMessage component={Error}
                              name='cvv'/>
                <button type='submit'
                        onClick={postPayments}>
                    Update
                </button>
            </Form>
        </Formik>
    );
};

MyPayments.propTypes = {
    location: PropTypes.object,
};

export default MyPayments;