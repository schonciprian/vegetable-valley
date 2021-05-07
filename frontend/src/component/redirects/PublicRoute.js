import React, {useContext} from 'react'
import { Redirect, Route } from 'react-router-dom'
import {UserContext} from "../../context/User";

const PublicRoute = ({ component: Component, render: render, ...rest }) => {
    const [user] = useContext(UserContext);
    const isLoggedIn = user.username;

    if (isLoggedIn) {
        return (<Route {...rest} render={props =>
            <Redirect to={{pathname: '/', state: {from: props.location}}}/>
        }/>)
    }

    return (
        <Route
            {...rest}
            render={props =>
                Component
                    ? <Component {...props} />
                    : render()
            }
        />
    )
}

export default PublicRoute
