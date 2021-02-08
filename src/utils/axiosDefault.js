import axios from 'axios';
import {getLang} from '../lang/t';

axios.defaults.baseURL = 'http://localhost/api'
axios.defaults.headers.common['X-lang'] = getLang();
if (localStorage.getItem('token')) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
}

