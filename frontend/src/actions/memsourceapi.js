import axios from 'axios';
import { notifyOnError } from './index';

export const login = (userName, password, onResponse, dispatch) => {
    return axios.post("https://cloud.memsource.com/web/api2/v1/auth/login", { userName, password })
        .then(response => onResponse(response))
        .catch(error => {
            notifyOnError(error, dispatch)
        })
};

export const readProjects = (token, onResponse, dispatch) => {
    const headers = {
        'Authorization': `ApiToken ${token}`,
    }
    return axios.get("https://cloud.memsource.com/web/api2/v1/projects", { headers })
        .then(response => onResponse(response))
        .catch(error => {
            notifyOnError(error, dispatch)
        })
};