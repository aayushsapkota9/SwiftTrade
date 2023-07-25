import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Input } from 'postcss';
import Link from 'next/link';
import Image from 'next/image';
import SecuredImage from "../../../public/LoginSecuredImg.png"
import BlackLogo from "../../../public/swift-logo-black.png"



const LoginSchema = Yup.object().shape({
    password: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
});

export const Login = () => (
    <div className='grid grid-cols-3 h-screen ' >
        <div className=' bg-gray-200 col-span-2 flex justify-center '>
            <Image className='h-3/4 w-auto '
                src={SecuredImage}
                alt="A person logging In"
            />

        </div>
        <div className='flex flex-col  gap-5 h-screen pt-24 px-16'>
            <div className='flex flex-col gap-20 '>
                <div className='p-0 grid grid-cols-3 relative right-8'>
                    <Link href="/">
                        <div className="hover:cursor-pointer">
                            <Image
                                src={BlackLogo}
                                width={200}
                                height={200}
                                alt="Logo"
                            ></Image>
                        </div>
                    </Link>
                    <Link href="/" className='text-6xl col-span-2 justify-self-start self-center '><h1 >Swift Login</h1></Link>

                </div>
                <Formik
                    initialValues={{
                        password: '',
                        email: '',
                    }}
                    validationSchema={LoginSchema}
                    onSubmit={values => {
                    }}
                >
                    {({ errors, touched }) => (

                        <Form className='flex flex-col gap-5'>
                            <div className=''>
                                <label for="email" className='block text-lg'>Email Id: </label>
                                <Field name="email" id="email" type="email" placeholder="john.doe@gmail.com" className="border-gray-600 bg-gray-100	border-2 rounded-md p-1 w-96" />
                                {errors.email && touched.email ? <div>{errors.email}</div> : null}
                            </div>
                            <div>
                                <label for="password" className='block text-lg'>Password: </label>
                                <Field name="password" id="password" placeholder="Password" className="border-gray-600 bg-gray-100	border-2 rounded-md p-1 w-96" />
                                {errors.password && touched.password ? (
                                    <div>{errors.password}</div>
                                ) : null}
                            </div>
                            <div className='flex justify-between'><button type="submit" className="bg-black text-white px-7 rounded py-2">Login</button>
                                <a href='#' className='text-blue-600 underline'>Forgot password?</a>
                            </div>

                        </Form>
                    )}
                </Formik>
            </div>
            <hr></hr>
            <div><p >Don't have an account?<Link href="http://localhost:3000/register" className='text-green-600'> Register</Link></p></div>
        </div>
    </div >
);
export default Login;
