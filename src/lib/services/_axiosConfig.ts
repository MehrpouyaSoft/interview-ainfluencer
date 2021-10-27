import Axios from "axios"
import { toast } from "react-toastify"
import { baseUrlApi } from "./_constants"

export const API = Axios.create({
    baseURL: baseUrlApi
})
API.interceptors.request.use(
    (config: any) => {
        // if (token) return config
        // config.headers.Authorization = `Bearer ${token}`
        return config
    },
    err => Promise.reject(err)
)

API.interceptors.response.use(
    res => {
        return res;
    },
    err => {
        const response = err?.response
        toast.error(response && response?.data?.error ? response.data.error : 'خطایی رخ داد لطفا مجددا تلاش کنید')
        return err;
    }
);


