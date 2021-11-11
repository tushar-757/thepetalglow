import axios  from 'axios';

const real='https://plantapp57.herokuapp.com/'
const dev='http://localhost:5000/'
const aws="http://thepetalglow-env.eba-vqrfgiyr.ap-south-1.elasticbeanstalk.com/"
const api = axios.create({
    baseURL:aws
})
export default api;