import React, { Component } from 'react'
import * as Yup from 'yup';
import { Formik, Form as FormFormik, ErrorMessage } from 'formik';
import classes from './style.module.scss';
import TextField from '@mui/material/TextField';
import { Alert, Checkbox, FormControlLabel, Typography } from '@mui/material';
import { Col, Container, Form, Row } from 'react-bootstrap';
import Button from '@mui/material/Button';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';
import { LoginService } from 'lib/services/auth';
import { ILogin } from 'lib/interfaces/login';
import axios from 'axios';
import { IHomePage } from 'lib/interfaces/home';
import { inject } from 'mobx-react';

@inject('AppStore')
class LoginForm extends Component<IHomePage, any> {
    constructor(props: IHomePage) {
        super(props)
    }

    handleSetCookie(token: string) {
        const cookie = this.props?.cookies
        if (cookie) cookie.set('authToken', token, { path: '/' });
    }
    
    render() {
        return (

            <Formik
                initialValues={{
                    username: '',
                    password: '',
                    remember: false
                }}
                validationSchema={Yup.object().shape({
                    username: Yup.string().email('پست الکترونیکی صحیح نمیباشد').required('الزامی'),
                    password: Yup.string().required('الزامی')
                })}
                onSubmit={values => {
                    const { username, password, remember } = values
                    LoginService({
                        "email": username,
                        "password": password
                    }).then((res: any) => {
                        const token = res.data?.token
                        if (token) {
                            toast.success('ورود موفقیت امیز')

                            if (remember) {
                                this.handleSetCookie(token)
                            } else {
                                this.props.AppStore.changeToken(token)
                            }
                            this.props.history.replace('/')
                        }
                    })
                }}
                render={({ errors, touched, setFieldValue }) => (
                    <FormFormik>
                        <Typography variant="h5" component="div" className={classes.title}>
                            ورود به سامانه
                        </Typography>
                        <br />
                        <Typography variant="body1" component="p">
                            ورود به سامانه جهت تست برنامه درخواستی مصاحبه به منظور ذخیره و گرفتن توکن میباشد
                        </Typography>
                        <br />
                        <Form.Group className={classes.group}>
                            <TextField label="پست الکترونیکی" variant="filled" onChange={(field) => setFieldValue('username', field.target.value)} className={classes.textField} />
                            <ErrorMessage
                                name="username"
                                component={(error) => <Alert variant="outlined" severity="error">{error.children}</Alert>}
                                className="field-error"
                            />
                        </Form.Group>

                        <Form.Group className={classes.group}>
                            <TextField label="رمز عبور" type="password" variant="filled" onChange={(field) => setFieldValue('password', field.target.value)} className={classes.textField} />
                            <ErrorMessage
                                name="password"
                                component={(error) => <Alert variant="outlined" severity="error">{error.children}</Alert>}
                                className="field-error"
                            />
                        </Form.Group>

                        <Form.Group className={classes.group}>
                            <FormControlLabel onChange={(field: any) => setFieldValue('remember', field.target.checked)} control={<Checkbox />} label="مرا بخاطر بسپار" />
                        </Form.Group>

                        <Button type="submit" disabled={false} variant="contained">{0 ? 'در حال پردازش ...' : 'ورود'}</Button>
                    </FormFormik>
                )}
            />
        )
    }
}

export default withCookies(withRouter(LoginForm))
