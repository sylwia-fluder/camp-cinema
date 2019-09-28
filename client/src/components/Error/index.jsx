import React from 'react';
import PropTypes from 'prop-types';
import './error.scss';

const Error = (props) => {
    return (
        <div className='error'>
            {props.children}
        </div>
    );
};

Error.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Error;