import React, {useState, createContext, useEffect} from "react";
import {getRequest} from "../../../additionals/Requests";

export const ActualGardenIdContext = createContext(1);

export const ActualGardenIdProvider = (props) => {
    const [actualGardenId, setActualGardenId] = useState(null);

    useEffect(() => {
        if (!window.sessionStorage.getItem("token")) return

        getRequest('/api/get-user-gardens', {},
            (response) => setActualGardenId(response.data[0].id),
            () => {})
    }, [])

    return (
        <ActualGardenIdContext.Provider value={[actualGardenId, setActualGardenId]}>
            {props.children}
        </ActualGardenIdContext.Provider>
    );
};
