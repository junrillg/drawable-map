import axios from 'axios';

const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
axios.defaults.headers.common['X-CSRF-Token'] = token;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

export default axios;