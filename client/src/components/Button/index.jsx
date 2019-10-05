import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './button.scss';

const Button = (props) => {
    const {
        children,
        custom,
    } = props;

    const element = 'btn';
    const buttonStyles = classNames({
        [`${element}`]: true,
        [`${element}__${custom}`]: custom,
    });

    return (
        <button className={buttonStyles} {...props}>
            {children}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    custom: PropTypes.oneOf([
        'center',
        'inline',
    ]),
};

export default Button;