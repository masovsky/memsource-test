import { showErrorNotification } from './notifications';


export const notifyOnError = (error, dispatch) => {
    const { response } = error;
    if (response) {
        if (error.response.status === 400) {
            dispatch(showErrorNotification(error.response.data.join(",")));
        } else {
            dispatch(showErrorNotification(response.statusText));
        }
    } else {
        dispatch(showErrorNotification(error.message));
    }
};