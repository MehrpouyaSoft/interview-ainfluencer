import React, { useEffect } from 'react'
import { withCookies } from 'react-cookie'
import Routes from './components/route/routes'
import axiosConfig from './lib/services/_axiosConfig'
import CustomToastContainer from './components/common/toast/_main';

function App(props: any) {

    useEffect(() => {
        axiosConfig(props.allCookies.authToken)
    }, [])

    return (
        <>
            <CustomToastContainer />
            <Routes />
        </>
    )
}

export default withCookies(App)
