import axios from "axios"
import { ILogin } from "../interfaces/login"
import { API } from "./_axiosConfig"

export const LoginService = (data: ILogin) => {
    return API.post('https://reqres.in/api/login', data)
}