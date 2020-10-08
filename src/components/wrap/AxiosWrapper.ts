import axios from 'axios';
import HeaderHelper from '@/common/const/HeaderHelper';

export const REQUEST_HEADERS = {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Access-Control-Allow-Origin': '*',
    'Authorization': localStorage.getItem(HeaderHelper.POST_AUTH_HEADER),
};

axios.defaults.headers.common = REQUEST_HEADERS;

axios.interceptors.request.use( (config) => {
    config.headers = REQUEST_HEADERS;
    return config;
});

export default axios;
