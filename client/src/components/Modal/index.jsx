import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Portal from '../Portal';
import './modal.scss';

const Modal = ({ children, open, toggle }) => {
    return (
        <Portal>
            {open && (
                <div className='modal' onClick={toggle}>
                    <div className='modal__body' onClick={e => e.stopPropagation()}>
                        <FontAwesomeIcon className='modal__button_close' size='2x' icon={faTimes} onClick={toggle}/>
                        {children}
                    </div>
                </div>
            )}
        </Portal>
    );
};

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    open: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
};

export default Modal;