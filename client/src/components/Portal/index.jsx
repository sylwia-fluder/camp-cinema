import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const Portal = ({ children }) => {
    const portalRoot = document.getElementById('portal');
    const element = document.createElement('div');

    useEffect(() => {
        portalRoot.appendChild(element);
        return () => portalRoot.removeChild(element);
    }, [portalRoot, element]);

    return ReactDOM.createPortal(children, element);
};

Portal.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Portal;