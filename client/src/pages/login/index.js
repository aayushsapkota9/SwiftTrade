import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import Image from 'next/image';
import SecuredImage from "../../../public/LoginSecuredImg.png"
import BlackLogo from "../../../public/swift-logo-black.png"
import { message } from 'antd';
import { setUserDetails } from '@/redux/reducerSlice/userSlice';
import { useDispatch } from 'react-redux';
import router from 'next/router';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';


const LoginSchema = Yup.object().shape({

    password: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
});

export const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const [messageApi, contextHolder] = message.useMessage();
    const handleLogin = async (values) => {
        try {
            const res = await fetch('http://localhost:4000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            });
            const data = await res.json();

            if (data && res.status == 200 && data.success) {

                dispatch(setUserDetails(data))
                messageApi.info(data.msg);
                router.push('/dashboard')
            } else {
                messageApi.info(data.msg);
            }
        } catch (error) {

        }
    }
    return (

        <div className='grid grid-cols-3 h-screen ' >
            {contextHolder}
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
                            handleLogin(values);
                        }}
                    >
                        {({ errors, touched }) => (

                            <Form className='flex flex-col gap-5'>
                                <div className=''>
                                    <label for="email" className='block text-lg'>Email Id: </label>
                                    <Field name="email" id="email" type="email" placeholder="john.doe@gmail.com" className="border-gray-600 bg-gray-100	border-2 rounded-md p-1 w-96" />
                                    {errors.email && touched.email ? <div>{errors.email}</div> : null}
                                </div>
                                <div >
                                    <label className='block text-lg'>Password: </label>
                                    <Field name="password" type={showPassword ? 'text' : 'password'} placeholder="Password" className="border-gray-600 bg-gray-100	border-2 rounded-md p-1 w-96" />
                                    <span className='m-5 hover:cursor-pointer'
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeInvisibleOutlined /> : <EyeTwoTone />}
                                    </span>
                                    <ErrorMessage name="password" component="div" />
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
    )
};
export default Login;
