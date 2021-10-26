import { Typography } from '@mui/material';
import React from 'react'
import { useCookies, withCookies } from 'react-cookie';
import { useSelector } from 'react-redux'
import classes from './style.module.scss';
import { withRouter } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

function HomePage(props: any) {
    const tokenStore = useSelector((state: any) => state.token)
    const tokenCookie = props.allCookies.authToken
    const [cookies, setCookie, removeCookie] = useCookies();

    return (
        <div className={classes.boxToken}>
            <Typography variant="h6" component="h2">
                Token
            </Typography>
            {tokenStore ? tokenStore : tokenCookie}
            <button className={classes.exit} onClick={() => {
                removeCookie('authToken', {
                    path: '/'
                });
                props.history.replace('/login')
            }}><LogoutIcon /> خروج</button>
        </div>
    )
}

export default withCookies(withRouter(HomePage))
