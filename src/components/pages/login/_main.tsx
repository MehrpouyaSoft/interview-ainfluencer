import React from 'react'
import * as Yup from 'yup';
import { Formik, Form as FormFormik, ErrorMessage } from 'formik';
import classes from './style.module.scss';
import TextField from '@mui/material/TextField';
import { Alert, Checkbox, FormControlLabel, Typography } from '@mui/material';
import { Col, Container, Form, Row } from 'react-bootstrap';
import Button from '@mui/material/Button';
import { useMutation } from 'react-query';
import { LoginService } from '../../../lib/services/auth';
import { ILogin } from '../../../lib/interfaces/login';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import LoginForm from './parts/form/_main';

function LoginPage(props: any) {
    const { mutate } = useMutation((params: ILogin) => LoginService(params))
    const dispatch = useDispatch()
    const [cookies, setCookie] = useCookies();

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
