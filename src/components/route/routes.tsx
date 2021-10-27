import React, { Component } from 'react'
import { withCookies } from 'react-cookie';
import { Switch, Route, Redirect } from "react-router-dom";
import LoginPage from '../pages/login/_main';
import MainPage from '../pages/home/_main';
import { useSelector } from 'react-redux';
import { IHomePage } from 'lib/interfaces/home';
import { inject, observer } from 'mobx-react';

@inject('AppStore')
@observer
class AppRoutes extends Component<IHomePage, any> {
    constructor(props: IHomePage) {
        super(props);
    }

    render() {
        const tokenState = this.props.AppStore.token.length
        const tokenCookie = this.props.allCookies.authToken
        
        return (
            <Switch>
                <Route path="/login" component={LoginPage} />
                {tokenState || tokenCookie ?
                    <>
                        <Route path="/" exact component={MainPage} />
                    </>
                    :
                    <Redirect to="/login" />}
            </Switch>
        )
    }
}

export default withCookies(AppRoutes)
