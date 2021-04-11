import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../context/AuthService";

const LoggedInRoute = ({ component: Component, ...rest }) => {
    // ↑分割代入構文．componentをComponentという名前に変えている
    const user = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={props =>
                user ? (<Component {...props} />) : <Redirect to={"/login"} />
            }
        />
    );
}

export default LoggedInRoute;