import React, {useContext} from 'react'
import { Redirect, Route } from 'react-router-dom'
import {UserContext} from "../../context/User";

const PublicRoute = ({ component: Component, ...rest }) => {
    const [user] = useContext(UserContext);
    const isLoggedIn = user.username;

    return (
        <Route
            {...rest}
            render={props =>
                !isLoggedIn
                    ? (<Component {...props} />)
                    : (<Redirect to={{ pathname: '/', state: { from: props.location } }} />)
            }
        />
    )
}

export default PublicRoute
