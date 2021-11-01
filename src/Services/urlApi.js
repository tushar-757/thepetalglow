import axios  from 'axios';

const real='https://plantapp57.herokuapp.com/'
const dev='http://localhost:5000/'
const aws="https://actzkesq20.execute-api.ap-south-1.amazonaws.com/dev/"
const api = axios.create({
    baseURL:dev
})
export default api;