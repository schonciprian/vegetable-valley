import React, {useState, createContext, useEffect} from "react";
import {useHistory} from "react-router-dom";
import {getRequest} from "../../../additionals/Requests";

export const ActualGardenIdContext = createContext(1);

export const ActualGardenIdProvider = (props) => {
    const [actualGardenId, setActualGardenId] = useState(null);
    const history = useHistory()

    useEffect(() => {
        if (!window.sessionStorage.getItem("token")) return
        const intervalId = setInterval(() => {
            if (actualGardenId === null && history.location.pathname === '/garden-planner') {

                getRequest('/api/get-user-gardens', {},
                    (response) => setActualGardenId(response.data[0].id),
                    () => {
                    })

            }
        }, 4000)
        return () => clearInterval(intervalId);
    }, [actualGardenId, history.location.pathname])

    return (
        <ActualGardenIdContext.Provider value={[actualGardenId, setActualGardenId]}>
            {props.children}
        </ActualGardenIdContext.Provider>
    );
};
