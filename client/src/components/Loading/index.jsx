import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import './loading.scss';

const Loading = ({fixed = false}) => {
    const element = 'loading';
    const loadingStyles = classNames({
        [`${element}`]: true,
        [`${element}__fixed`]: fixed,
    });

    return (
        <FontAwesomeIcon spin
                         size='4x'
                         className={loadingStyles}
                         icon={faSpinner}/>
    );
};

Loading.propTypes = {
    fixed: PropTypes.bool,
};

export default Loading;