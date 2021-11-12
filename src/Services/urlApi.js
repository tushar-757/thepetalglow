import axios  from 'axios';

const real='https://plantapp57.herokuapp.com/'
const dev='http://localhost:5000/'
const aws="https://api.thepetalglow.com"
const api = axios.create({
    baseURL:aws
})
export default api;