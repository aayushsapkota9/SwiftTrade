import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Input } from 'postcss';
import Link from 'next/link'

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

                <Form className='flex flex-col gap-3'>
                    <div className='p-3'>
                        <label for="email">Email: </label>
                        <Field name="email" id="email" type="email" placeholder="john.doe@gmail.com" className="border-black	border-2 rounded-md" />
                        {errors.email && touched.email ? <div>{errors.email}</div> : null}
                    </div>
                    <div>
                        <label for="password">Password: </label>
                        <Field name="password" id="password" placeholder="Password" className="border-black	border-2 rounded-md" />
                        {errors.password && touched.password ? (
                            <div>{errors.password}</div>
                        ) : null}
                    </div>
                    <div><button type="submit" className="">Login</button></div>

                </Form>
            )}
        </Formik>
        <p>Don't have an account?<Link href="http://localhost:3000/register"> Register</Link></p>

    </div>
);
export default Login;