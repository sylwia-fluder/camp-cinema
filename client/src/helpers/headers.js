import { STORAGE_NAMES } from '../constants';

const headers = () => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return headers;
};

const headersWithToken = () => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${localStorage.getItem(STORAGE_NAMES.TOKEN)}`);

    return headers;
};

export {
    headers,
    headersWithToken,
};