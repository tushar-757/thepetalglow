import axios  from 'axios';


const dev='http://localhost:5000/'
const awsserverless="https://actzkesq20.execute-api.ap-south-1.amazonaws.com/dev/"
const api = axios.create({
    baseURL:awsserverless
})
export default api;