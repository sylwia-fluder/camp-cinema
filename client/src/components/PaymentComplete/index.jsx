import React from 'react';
import Loading from '../Loading';
import Logo from '../Logo';
import './paymentComplete.scss';

const PaymentComplete = () => {
    return (
        <div className='payment__container'>
            <Loading/>
            <h3 className='payment__header'>
                PAYMENT COMPLETE
            </h3>
            <p className='payment__description'>
                Your tickets will be send via e-mail within 5 minutes.
            </p>
            <Logo/>
        </div>
    );
};

export default PaymentComplete;