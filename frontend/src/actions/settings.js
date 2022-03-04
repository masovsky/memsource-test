import axios from 'axios';
import { showInfoNotification } from './notifications';
import { notifyOnError } from './index';

export const loadSetting = (onResponse, dispatch) => (
    axios.get(`http://${process.env.REACT_APP_SERVER_HOST || window.location.host}/setting/read`)
        .then(response => onResponse(response))
        .catch((error) => {
            notifyOnError(error, dispatch)
        })
);

export const saveSetting = (name, password) => (dispatch) => (
    axios.post(`http://${process.env.REACT_APP_SERVER_HOST || window.location.host}/setting/save`, { name, password })
        .then(response => {
                if (response.status === 200) {
                    dispatch(showInfoNotification("Setting saved"))
                }
            }
        ).catch((error) => {
        notifyOnError(error, dispatch)
    })
);
