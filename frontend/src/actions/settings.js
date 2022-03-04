import axios from 'axios';
import { showErrorNotification, showInfoNotification } from './notifications';

export const loadSetting = (onResponse, onError, dispatch) => (
    axios.get(`http://${process.env.REACT_APP_SERVER_HOST || window.location.host}/setting/read`)
        .then(response => onResponse(response))
        .catch(error => {
            onError(error)
            notifyOnError(dispatch)
        })
);

export const saveSetting = (name, password) => (dispatch) => (
    axios.post(`http://${process.env.REACT_APP_SERVER_HOST || window.location.host}/setting/write`, { name, password })
        .then(dispatch(showInfoNotification("Setting saved")))
        .catch(notifyOnError(dispatch))
);

export const notifyOnError = (dispatch) => (error) => {
    const { response } = error;
    if (response) {
        dispatch(showErrorNotification(response.statusText));
    } else {
        dispatch(showErrorNotification(error.message));
    }
};