import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import './poster.scss';

const Poster = (props) => {
    const {
        image_src,
        alt,
        size,
    } = props;

    if (props.isLink){
        return(
            <div className='poster'>
                <img className={`poster-img ${props.size}`} src={props.image_src} alt={props.alt} />
                <Link className='buy-ticket-link'>BUY TICKETS</Link>
            </div>
            
        )
    }
    else {
        return(
            <div className='poster'>
                <img className={`poster-img ${props.size}`} src={props.image_src} alt={props.alt} />
            </div>
        )
    }


    
};

Poster.propTypes = {
    image_src: PropTypes.string,
    alt: PropTypes.string,
    size: PropTypes.oneOf([
        'small',
        'big'
    ]),
    isLink: PropTypes.bool
}

Poster.defaultProps = {
    alt: 'movie_poster',
    isLink: false
};

export default Poster; 