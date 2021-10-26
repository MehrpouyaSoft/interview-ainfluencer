import axios from "axios"
import { ILogin } from "../interfaces/login"

export const LoginService = (data: ILogin) => {
    return axios.post('https://reqres.in/api/login', data)
}