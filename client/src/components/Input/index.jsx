import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './input.scss';

const Input = (props) => {
    const {
        custom,
        field,
        form,
        size,
    } = props;

    const element = 'input';
    const inputStyles = classNames({
        [`${element}`]: true,
        [`${element}__${custom}`]: custom,
        [`${element}__${size}`]: true,
        [`${element}__error`]: form.errors[field.name] && form.touched[field.name],
    });

    return (
        <input className={inputStyles} {...field} {...props}/>
    )
};

Input.propTypes = {
    custom: PropTypes.oneOf([
        'center',
        'inline',
    ]),
    field: PropTypes.object,
    form: PropTypes.object,
    size: PropTypes.oneOf([
        'small',
        'medium',
        'large',
    ]),
};

Input.defaultProps = {
    size: 'large',
};

export default Input;