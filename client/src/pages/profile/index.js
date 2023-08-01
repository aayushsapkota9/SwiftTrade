import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { message, Image } from 'antd';
import { useDispatch } from 'react-redux';

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


export const Register = () => {
    const dispatch = useDispatch();
    const [messageApi, contextHolder] = message.useMessage();
    const handleRegister = async (values) => {
        try {
        } catch (error) {

        }

    }
    return (
        <div className=' ' >
            <div className='flex px-64 m-16 flex-col gap-10 '>
                <h1 className='text-5xl  relative left-52 '>General</h1>
                <div className='flex  gap-16 '>
                    <div className='p-0 flex flex-col gap-10 '>

                        <Image
                            width={150}
                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                        />
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
                                <div className='flex justify-between'><button type="submit" className="bg-black text-white px-7 rounded py-2">Update</button>
                                </div>

                            </Form>
                        )}
                    </Formik>
                    <div></div>
                </div>
            </div>
            <div className=' bg-gray-200 flex py-16 justify-center '>
                <div className='flex flex-col  gap-5  pt-12 relative right-32'>
                    <div className='flex flex-col gap-16 '>
                        <div className='p-0 grid grid-cols-3 '>
                            <h1 className='text-5xl col-span-2 justify-self-start self-center relative ' >Security</h1>
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
                                        <label className='block text-lg'>Current Password: </label>
                                        <Field name="password" placeholder="Password" className="border-gray-600 bg-gray-100	border-2 rounded-md p-1 w-96" />
                                        {errors.password && touched.password ? (
                                            <div>{errors.password}</div>
                                        ) : null}
                                    </div>
                                    <div>
                                        <label className='block text-lg'>New Password: </label>
                                        <Field name="password" placeholder="Password" className="border-gray-600 bg-gray-100	border-2 rounded-md p-1 w-96" />
                                        {errors.password && touched.password ? (
                                            <div>{errors.password}</div>
                                        ) : null}
                                    </div>
                                    <div>
                                        <label className='block text-lg'>New Confirm Password: </label>
                                        <Field name="confirmPassword" placeholder="Confirm Password" className="border-gray-600 bg-gray-100	 border-2 rounded-md p-1 w-96" />
                                        {errors.confirmPassword && touched.confirmPassword ? (
                                            <div>{errors.confirmPassword}</div>
                                        ) : null}
                                    </div>
                                    <div className='flex justify-between'><button type="submit" className="bg-black text-white px-7 rounded py-2">Update</button>
                                    </div>

                                </Form>
                            )}
                        </Formik>
                    </div>

                </div>
            </div>
        </div >
    )
};
export default Register;
