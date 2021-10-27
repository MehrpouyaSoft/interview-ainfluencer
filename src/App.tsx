import React, { useEffect } from 'react'
import { withCookies } from 'react-cookie'
import Routes from './components/route/routes'
import CustomToastContainer from './components/common/toast/_main';

function App(props: any) {
    return (
        <>
            <CustomToastContainer />
            <Routes />
        </>
    )
}

export default withCookies(App)
