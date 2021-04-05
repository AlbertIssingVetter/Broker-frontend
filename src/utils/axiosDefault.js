import axios from 'axios';
import {getLang} from '../lang/t';

axios.defaults.baseURL = 'https://trustmarket.net/api'
axios.defaults.headers.common['X-lang'] = getLang();
if (localStorage.getItem('token')) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
}

let showNetErrorDialog = null;
let hideNetErrorDialog = null;

export function setShowNetErrorDialog(dialog) {
    showNetErrorDialog = dialog;
}

export function setHideNetErrorDialog(dialog) {
    hideNetErrorDialog = dialog;
}

axios.interceptors.response.use(response => {
    return response;
}, async error => {
    if (!error.response) {
        if (showNetErrorDialog) {
            let res = null;
            showNetErrorDialog(() => {
                hideNetErrorDialog()
                axios.request(error.config).then(result => {
                    res = result;
                }).catch(e => {
                    showNetErrorDialog(null);
                })
            });
            while (!res) {
                await new Promise(resolve => setTimeout(resolve, 100));
            }
            hideNetErrorDialog();
            return res;
        } else {
            console.log('dialog is null');
        }
    } else if (error.response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = "/login";
    }
    return Promise.reject(error);
});
