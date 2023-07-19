import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Input } from 'postcss';

const LoginSchema = Yup.object().shape({
    password: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
});

export const Login = () => (
    <div >
        <h1>Login</h1>
        <Formik
            initialValues={{
                password: '',
                email: '',
            }}
            validationSchema={LoginSchema}
            onSubmit={values => {
                // same shape as initial values
                console.log(values);
            }}
        >
            {({ errors, touched }) => (
                <Form>
                    <div>
                        <label>Email: </label>
                        <Field name="email" type="email" placeholder="john.doe@gmail.com" />
                        {errors.email && touched.email ? <div>{errors.email}</div> : null}
                    </div>
                    <div>
                        <label>Password: </label>
                        <Field name="password" placeholder="Password" />
                        {errors.password && touched.password ? (
                            <div>{errors.password}</div>
                        ) : null}
                    </div>
                    <button type="submit">Login</button>
                </Form>
            )}
        </Formik>
    </div>
);
export default Login;