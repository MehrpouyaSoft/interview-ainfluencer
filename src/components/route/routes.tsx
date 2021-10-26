import React from 'react'
import { withCookies } from 'react-cookie';
import { Switch, Route, Redirect } from "react-router-dom";
import LoginPage from '../pages/login/_main';
import MainPage from '../pages/home/_main';
import { useSelector } from 'react-redux';

function AppRoutes(props: any) {
    const token = useSelector((state: any) => state.token)

    return (

        <Switch>
            <Route path="/login" component={LoginPage} />
            {token || props.allCookies.authToken ?
                <>
                    <Route path="/" exact component={MainPage} />
                </>
                :
                <Redirect to="/login" />}
        </Switch>
    )
}

export default withCookies(AppRoutes)
