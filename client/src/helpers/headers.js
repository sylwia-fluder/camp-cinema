import { STORAGE_NAMES } from '../constants';

const headers = () => {
    return {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    };
};

const headersWithToken = () => {
    return {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem(STORAGE_NAMES.TOKEN).replace(/"/g, ''),
    };
};

export {
    headers,
    headersWithToken,
};