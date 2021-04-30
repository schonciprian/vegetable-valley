import axios from "axios";
import {environmentVariables} from "../../EnvironmentVariables";

export const getRequest = (url, params, callbackSuccess, callbackError) => {
    axios({
        method: "get",
        url: `${environmentVariables.BACKEND_URL}${url}`,
        headers: {
            'Content-Type': 'application/json',
            Accept: "application/json, text/plain, */*",
            Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
        params: params,
    }).then(callbackSuccess)
        .catch(callbackError)
}

export const putRequest = (url, data, callbackSuccess, callbackError) => {
    axios({
        method: "put",
        url: `${environmentVariables.BACKEND_URL}${url}`,
        headers: {
            'Content-Type': 'application/json',
            Accept: "application/json, text/plain, */*",
            Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
        data: data,
    }).then(callbackSuccess)
        .catch(callbackError)
}
