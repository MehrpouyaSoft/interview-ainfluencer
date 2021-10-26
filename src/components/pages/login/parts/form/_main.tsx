import React from 'react'
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
import { useCookies } from 'react-cookie';
import { LoginService } from 'lib/services/auth';
import { ILogin } from 'lib/interfaces/login';

function LoginForm(props: any) {
    const { mutate, isLoading } = useMutation((params: ILogin) => LoginService(params))
    const dispatch = useDispatch()
    const [cookies, setCookie] = useCookies();

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
                mutate({
                    "email": username,
                    "password": password
                }, {
                    onSuccess: (response: any) => {
                        toast.success('ورود موفقیت امیز')

                        if (!remember) {
                            dispatch({ type: 'token', value: response.data.token })
                        } else {
                            setCookie('authToken', response.data.token, {
                                path: '/'
                            });
                        }

                        props.history.replace('/')
                    },
                    onError: (response: any) => {
                        toast.error('نام کاربری یا رمز عبور صحیح نمیباشند')
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

                    <Button type="submit" disabled={isLoading} variant="contained">{isLoading ? 'در حال پردازش ...' : 'ورود'}</Button>
                </FormFormik>
            )}
        />
    )
}

export default withRouter(LoginForm)
