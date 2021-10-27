import { Typography } from '@mui/material';
import React, { Component } from 'react'
import { useCookies, withCookies } from 'react-cookie';
import { useSelector } from 'react-redux'
import classes from './style.module.scss';
import { withRouter } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { inject, observer } from 'mobx-react';
import { IHomePage } from 'lib/interfaces/home';

@inject('AppStore')
class HomePage extends Component<IHomePage, any> {
    constructor(props: IHomePage) {
        super(props);
    }

    handleRemoveCookie() {
        const cookie = this.props?.cookies
        if (cookie) cookie.remove('authToken', { path: '/' });
    }

    render() {
        const tokenState = this.props.AppStore.token
        const tokenCookie = this.props.allCookies.authToken
        return (
            <div className={classes.boxToken}>
                <Typography variant="h6" component="h2">
                    Token
                </Typography>
                {tokenState ? tokenState : tokenCookie}
                <br />
                <button className={classes.exit} onClick={() => {
                    this.handleRemoveCookie()
                    this.props.history.replace('/login')
                }}><LogoutIcon /> خروج</button>
            </div>
        )
    }
}

export default withCookies(HomePage)