import React from 'react';
import PropTypes from 'prop-types';
import './emptyList.scss';

const EmptyList = (props) => {
    return (
        <p className='empty__info'>
            {props.children}
        </p>
    );
};

EmptyList.propTypes = {
    children: PropTypes.node.isRequired,
};

export default EmptyList;