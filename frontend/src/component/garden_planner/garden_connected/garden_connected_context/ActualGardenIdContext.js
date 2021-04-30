import React, {useState, createContext, useEffect} from "react";
import axios from "axios";
import {environmentVariables} from "../../../../EnvironmentVariables";

export const ActualGardenIdContext = createContext(1);

export const ActualGardenIdProvider = (props) => {
    const [actualGardenId, setActualGardenId] = useState(null);

    useEffect(() => {
        axios({
            method: "get",
            url: `${environmentVariables.BACKEND_URL}/api/get-user-gardens`,
            headers: {
                'Content-Type': 'application/json',
                Accept: "application/json, text/plain, */*",
                Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
            },
        }).then((res) => {
            setActualGardenId(res.data[0].id)
        }).catch((error) => {
            console.log(error.response.data)
        })
    }, [])

    return (
        <ActualGardenIdContext.Provider value={[actualGardenId, setActualGardenId]}>
            {props.children}
        </ActualGardenIdContext.Provider>
    );
};
