import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
    companyname: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required(),
    confirm_password: Yup.string().label('confirm password').required().oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

export const ValidationSchemaExample = () => (
    <div>
        <h1>Signup</h1>
        <Formik
            initialValues={{
                companyname: '',
                email: '',
                password: '',
                confirm_password: ''
            }}
            validationSchema={SignupSchema}
            onSubmit={values => {
                // same shape as initial values
                console.log(values);
            }}
        >
            {({ errors, touched }) => (
                <Form>
                    <div>
                        <label>Company Name: </label>
                        <Field name="companyname" placeholder="XYZ PVT LTD" />
                        {errors.companyname && touched.companyname ? (
                            <div>{errors.companyname}</div>
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
                        <Field name="confirm_password" placeholder="Confirm Password" />
                        {errors.confirm_password && touched.confirm_password ? (
                            <div>{errors.confirm_password}</div>
                        ) : null}</div>
                    <button type="submit">Register</button>

                </Form>
            )}
        </Formik>
    </div>
);
export default ValidationSchemaExample;