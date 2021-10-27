import React from 'react'
import classes from './style.module.scss';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useMutation } from 'react-query';
import { LoginService } from '../../../lib/services/auth';
import { ILogin } from '../../../lib/interfaces/login';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import LoginForm from './parts/form/_main';

function LoginPage() {

    return (
        <Container className={classes.container}>
            <Row>
                <Col sm="5" className={classes.form}>
                    <LoginForm />
                </Col>
                <Col sm="7" className={classes.image}>
                    <img src={'/assets/images/remotly.svg'} alt="" />
                </Col>
            </Row>

        </Container>
    )
}

export default withRouter(LoginPage)
