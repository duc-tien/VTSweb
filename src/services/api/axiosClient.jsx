import axios from "axios"

const axiosClient = axios.create({
    baseURL: 'https://mqttcloud.azurewebsites.net/api/DataVali/'
})
export default axiosClient