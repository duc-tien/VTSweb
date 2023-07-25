import axios from "axios"

const axiosClient = axios.create({
    baseURL: 'https://retoolapi.dev/M3YNuo/data'
})
export default axiosClient