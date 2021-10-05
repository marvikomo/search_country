import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import {base_url} from '../config/config'
import {api_key} from '../config/config'

export class HttpService {
    public static getCountries = async()=>{
       let result: AxiosResponse = await axios.get(`${base_url}/all?access_key=${api_key}`);
       return result.data;
    }
}