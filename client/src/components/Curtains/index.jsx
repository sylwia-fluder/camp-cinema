import React from 'react';
import PropTypes from 'prop-types';
import './curtains.scss';

const Curtains = (props) => {
    const {
        children,
    } = props;

    return (
        <div className='curtains'>
            {children}
        </div>
    );
};

Curtains.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Curtains;