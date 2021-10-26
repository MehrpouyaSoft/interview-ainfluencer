import Axios from "axios"
import { baseUrlApi } from "./_constants"

const axiosConfig = (token = null) => {
    const API = Axios.create({
        baseURL: baseUrlApi
    })
    API.interceptors.request.use(
        (config: any) => {
            if (token) return config
            config.headers.Authorization = `Bearer ${token}`
            return config
        },
        err => Promise.reject(err)
    )
}

export default axiosConfig