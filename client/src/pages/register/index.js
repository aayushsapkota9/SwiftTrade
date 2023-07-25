import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link'
import Image from 'next/image';
import SignupImage from "../../../public/Signup.png"
import BlackLogo from "../../../public/swift-logo-black.png"

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
    const { confirmPassword, ...userDetails } = values;
    await fetch('http://localhost:4000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userDetails)
    })
}

export const ValidationSchemaExample = () => (
    <div className='grid grid-cols-3 h-screen ' >

        <div className='flex flex-col  gap-5 h-screen pt-12 px-12'>
            <div className='flex flex-col gap-16 '>
                <div className='p-0 grid grid-cols-3 relative right-5'>
                    <Link href="/">
                        <div className="hover:cursor-pointer">
                            <Image
                                src={BlackLogo}
                                width={150}
                                height={150}
                                alt="Logo"
                            ></Image>
                        </div></Link>
                    <Link href="/" className='text-5xl col-span-2 justify-self-start self-center relative right-8'><h1 >Swift Register</h1></Link>
                </div>
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
                        <Form className='flex flex-col gap-5'>
                            <div>
                                <label className='block text-lg'>Full Name: </label>
                                <Field name="fullName" placeholder="John Doe" className="border-gray-600 bg-gray-100	border-2 rounded-md p-1 w-96" />
                                {errors.fullName && touched.fullName ? (
                                    <div>{errors.fullName}</div>
                                ) : null}
                            </div>
                            <div>
                                <label className='block text-lg'>Company Name: </label>
                                <Field name="companyName" placeholder="XYZ PVT LTD" className="border-gray-600 bg-gray-100	border-2 rounded-md p-1 w-96" />
                                {errors.companyName && touched.companyName ? (
                                    <div>{errors.companyName}</div>
                                ) : null}
                            </div>
                            <div>
                                <label className='block text-lg'>Email: </label>
                                <Field name="email" type="email" placeholder="john.doe@gmail.com" className="border-gray-600 bg-gray-100	border-2 rounded-md p-1 w-96 " />
                                {errors.email && touched.email ? <div>{errors.email}</div> : null}
                            </div>
                            <div>
                                <label className='block text-lg'>Password: </label>
                                <Field name="password" placeholder="Password" className="border-gray-600 bg-gray-100	border-2 rounded-md p-1 w-96" />
                                {errors.password && touched.password ? (
                                    <div>{errors.password}</div>
                                ) : null}
                            </div>
                            <div>
                                <label className='block text-lg'>Confirm Password: </label>
                                <Field name="confirmPassword" placeholder="Confirm Password" className="border-gray-600 bg-gray-100	 border-2 rounded-md p-1 w-96" />
                                {errors.confirmPassword && touched.confirmPassword ? (
                                    <div>{errors.confirmPassword}</div>
                                ) : null}
                            </div>
                            <div className='flex justify-between'><button type="submit" className="bg-black text-white px-7 rounded py-2">Register</button>
                            </div>

                        </Form>
                    )}
                </Formik>
            </div>
            <hr></hr>
            <div>
                <p>Already have an account?<Link href="http://localhost:3000/login" className='text-green-600'> Login</Link></p>
            </div>
        </div>
        <div className=' bg-gray-200 col-span-2 flex justify-center '>
            <Image className='h-1/2 w-auto mt-24'
                src={SignupImage}
                alt="A person Signing Up "
            />

        </div>
    </div >
);
export default ValidationSchemaExample;
