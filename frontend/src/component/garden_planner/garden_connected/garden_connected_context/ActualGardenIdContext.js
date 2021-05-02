import React, {useState, createContext, useEffect, useContext} from "react";
import {useHistory} from "react-router-dom";
import {getRequest} from "../../../additionals/Requests";
import {LoadingContext} from "../../../../context/LoadingContext";
import {authenticationFeedback} from "../../../additionals/SweetAlert";

export const ActualGardenIdContext = createContext(1);

export const ActualGardenIdProvider = (props) => {
    const [actualGardenId, setActualGardenId] = useState(null);
    const [, setLoading] = useContext(LoadingContext)
    const history = useHistory()

    useEffect(() => {
        if (!window.sessionStorage.getItem("token")) return
        const intervalId = setInterval(() => {
            if (actualGardenId === null && history.location.pathname === '/garden-planner') {
                setLoading(true)

                getRequest('/api/get-user-gardens', {},
                    (response) => {
                    setActualGardenId(response.data[0].id)
                    },
                    (error) => {
                        if (error.response === undefined) {
                            authenticationFeedback("Service unavailable", "Try again later, you are redirected to main page", "error", 3000, history)
                            setTimeout(() => {
                                history.push('/')
                            }, 3000)
                        }
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
