import React, {useState, createContext, useEffect, useContext} from "react";
import {useHistory} from "react-router-dom";
import {getRequest} from "../../../additionals/Requests";
import {LoadingContext} from "../../../../context/LoadingContext";

export const ActualGardenIdContext = createContext(1);

export const ActualGardenIdProvider = (props) => {
    const [actualGardenId, setActualGardenId] = useState(null);
    const [loading, setLoading] = useContext(LoadingContext)
    console.log(loading);
    const history = useHistory()

    useEffect(() => {
        if (!window.sessionStorage.getItem("token")) return
        const intervalId = setInterval(() => {
            if (actualGardenId === null && history.location.pathname === '/garden-planner') {
                setLoading(true)

                getRequest('/api/get-user-gardens', {},
                    (response) => {
                    setActualGardenId(response.data[0].id)
                        // setLoading(false)
                    },
                    () => {
                    })

            }
        }, 4000)
        return () => clearInterval(intervalId);
    }, [actualGardenId, history.location.pathname, setLoading])

    return (
        <ActualGardenIdContext.Provider value={[actualGardenId, setActualGardenId]}>
            {props.children}
        </ActualGardenIdContext.Provider>
    );
};
