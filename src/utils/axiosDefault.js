import axios from 'axios';
import {getLang} from '../lang/t';

axios.defaults.baseURL = 'http://localhost/api'
axios.defaults.headers.common['X-lang'] = getLang();

