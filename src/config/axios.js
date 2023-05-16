import axios from 'axios'

const axiosClient = axios.create({
    baseURL: 'https://sheltered-badlands-26138.herokuapp.com'
})

export default axiosClient