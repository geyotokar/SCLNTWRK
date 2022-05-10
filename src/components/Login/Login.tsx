import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../REDUX/redux-store";
import {Formik, Form, Field, ErrorMessage} from 'formik'
import {login} from "../../REDUX/auth-reducer";
import '../../assets/Form.css'
import './Login.css'
import {useNavigate} from "react-router-dom";

type FormDataType = {
    email: string
    password: string
    captcha: string | null
}

const Login: React.FC = () => {
    const captchaURL = useSelector((state: AppStateType) => state.auth.captchaURL)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loginCB = (formData: FormDataType) => {
        dispatch(login(formData.email, formData.password, formData.captcha))
    }
    if (isAuth) {
        navigate('/profile')
    }
    return <div className='loginForm'>
        <h1>LOGIN</h1>
        <LoginForm captchaURL={captchaURL} login={loginCB}/>
    </div>
}

type LoginFormPropsType = {
    captchaURL: string | null
    login: (formData: FormDataType) => void
}

const LoginForm: React.FC<LoginFormPropsType> = ({captchaURL, login}) => {
    if (captchaURL) {
        return <div>
            <img src={captchaURL} alt='captcha'/>
            <Field className='field loginField' control='input' type='text' name='captcha'/>
        </div>
    }
    return <Formik
        initialValues={{email: '', password: '', captcha: null as string | null}}
        onSubmit={(values, {setSubmitting}) => {
            const formData: FormDataType = {
                email: values.email,
                password: values.password,
                captcha: values.captcha as string | null
            }
            login(formData)
            setSubmitting(false);
        }}
    >
        {({isSubmitting}) => (
            <Form>
                <Field className='field loginField' type='email' placeholder='e-mail' name='email'/>
                <ErrorMessage name='email' component='div'/>
                <Field className='field loginField' type='password' placeholder='password' name='password'/>
                <ErrorMessage name='password' component='div'/>
                <button type='submit' disabled={isSubmitting}>
                    Submit
                </button>
            </Form>
        )}
    </Formik>
}

export default Login