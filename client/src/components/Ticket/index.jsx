import React from 'react';
import PropTypes from 'prop-types';
import './ticket.scss';

const Ticket = (props) => {
    const {
        data: {
            posterURL,
            movieTitle,
            date,
            row,
            seatNumber,
        },
    } = props;

    const fullDateTicket = new Date(date);
    const monthTicket = fullDateTicket.getMonth() + 1;
    const yearTicket = fullDateTicket.getFullYear().toString().slice(-2);
    const dateTicket = `${fullDateTicket.getDate()}-${monthTicket}-${yearTicket}`;
    const timeTicket = `${fullDateTicket.getHours()}:${fullDateTicket.getMinutes()}`;

    return (
        <div className='ticket'>
            {posterURL && <img className='ticket__poster' src={posterURL} alt={movieTitle}/>}
            <div className='ticket__info'>
                <p>{movieTitle}</p>
                <p>{dateTicket}</p>
                <p>{timeTicket}</p>
            </div>
            <div className='ticket__container'>
                <div className='ticket__seat'>
                    <p>R: {row}</p>
                    <p>S: {seatNumber}</p>
                </div>
                <div className='ticket__qrcode'/>
            </div>
        </div>
    );
};

Ticket.propTypes = {
    data: PropTypes.object.isRequired,
};

export default Ticket;