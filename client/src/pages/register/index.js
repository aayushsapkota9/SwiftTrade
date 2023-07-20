import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link'

const SignupSchema = Yup.object().shape({
    fullName: Yup.string()
        .min(1, 'Too Short!')
        .max(100, 'Too Long!')
        .required('Required'),
    companyName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
        .min(5, 'Password Too Short!')
        .required('Required'),
    confirmPassword: Yup.string()
        .min(5, 'Password Too Short!')
        .required('Required')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});
const handleRegister = async (values) => {
    const { confirmPassword, ...userDetails } = values
    await fetch('http://localhost:4000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userDetails)
    })
}

export const ValidationSchemaExample = () => (
    <div>
        <h1>Signup</h1>
        <Formik
            initialValues={{
                fullName: "",
                companyName: '',
                email: '',
                password: '',
                confirmPassword: ''
            }}
            validationSchema={SignupSchema}
            onSubmit={values => {
                handleRegister(values);
            }}
        >
            {({ errors, touched }) => (
                <Form>
                    <div>
                        <label>Full Name: </label>
                        <Field name="fullName" placeholder="John Doe" />
                        {errors.fullName && touched.fullName ? (
                            <div>{errors.fullName}</div>
                        ) : null}
                    </div>
                    <div>
                        <label>Company Name: </label>
                        <Field name="companyName" placeholder="XYZ PVT LTD" />
                        {errors.companyName && touched.companyName ? (
                            <div>{errors.companyName}</div>
                        ) : null}
                    </div>
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
                        ) : null}</div>
                    <div>
                        <label>Confirm Password: </label>
                        <Field name="confirmPassword" placeholder="Confirm Password" />
                        {errors.confirmPassword && touched.confirmPassword ? (
                            <div>{errors.confirmPassword}</div>
                        ) : null}</div>
                    <button type="submit">Register</button>

                </Form>
            )}
        </Formik>
        <p>Already have an account?<Link href="http://localhost:3000/login"> Login</Link></p>

    </div>
);
export default ValidationSchemaExample;