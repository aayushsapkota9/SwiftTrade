import React, { useState } from 'react';
import { WhiteLogo } from '../../components/logo'
import Link from 'next/link';
import { Layout, Menu, Button, theme, Avatar, Dropdown, Space, message } from 'antd';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Image } from '@chakra-ui/react'
import router from 'next/router';
import { setUserDetails } from '@/redux/reducerSlice/userSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    LogoutOutlined,
    SecurityScanOutlined,
    ShopOutlined,
    DownOutlined,
    SettingOutlined,
    UserOutlined,
    RollbackOutlined

} from '@ant-design/icons';

const EditProfile = () => {
    const { userDetails, token } = useSelector(state => state.users)
    const dispatch = useDispatch();

    const [messageApi, contextHolder] = message.useMessage();
    const SignupSchema = Yup.object().shape({
        fullName: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        companyName: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        address: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!'),
        city: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!'),
        state: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!'),
        country: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!'),
    });
    const handleSubmit = async (values) => {
        const newData = { userDetails }
        newData.country = values.country
        newData.address = values.address
        newData.state = values.state
        newData.city = values.city
        newData.token = token
        try {
            const res = await fetch(`http://localhost:4000/profile/${userDetails._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            });
            const data = await res.json();

            if (data && res.status == 200) {
                dispatch(setUserDetails(newData))
                messageApi.info(data.msg);
            } else {
                messageApi.info(data.msg);
            }
        } catch (error) {
        }

    }

    return <div className='ml-64 flex flex-col gap-12'>
        {contextHolder}
        <div className='relative right-8'> <Link href="/dashboard">
            <RollbackOutlined className='text-3xl relative right-8 bottom-3 text-gray-600 hover:cursor-pointer' />
        </Link><p className='text-5xl inline'>Edit Profile</p></div>
        <div><Image
            borderRadius='full'
            boxSize='150px'
            src='https://bit.ly/dan-abramov'
            alt='Dan Abramov'
        /></div>
        <div>     <Formik
            initialValues={{
                fullName: userDetails?.fullName,
                companyName: userDetails?.companyName,
                email: userDetails?.email,
                address: userDetails?.address,
                city: userDetails?.city,
                state: userDetails?.state,
                country: userDetails?.country,

            }}
            validationSchema={SignupSchema}
            onSubmit={(values) => {

                handleSubmit(values);

            }}
        >
            {({ errors, touched }) => (
                <Form className='flex flex-col gap-5'>
                    <div className='flex gap-10'>
                        <div className=''><label className=' text-lg block'>Full Name: </label>
                            <Field name="fullName" placeholder="John Doe" className="border-gray-400 	border-2 rounded-sm p-1 w-64" />
                            {errors.fullName && touched.fullName ? (
                                <div>{errors.fullName}</div>
                            ) : null}</div>
                        <div className=''><label className=' text-lg block'>Company Name: </label>

                            <Field name="companyName" placeholder="XYZ PVT LTD" className="border-gray-400 	border-2 rounded-sm p-1 w-72" />
                            {errors.companyName && touched.companyName ? (
                                <div>{errors.companyName}</div>
                            ) : null}</div>
                    </div>
                    <div>
                        <label className='text-lg block'>Email: </label>
                        <Field name="email" type="email" placeholder="john.doe@gmail.com" className="border-gray-400 	border-2 rounded-sm p-1 w-96 " />
                        {errors.email && touched.email ? <div>{errors.email}</div> : null}
                    </div>
                    <div><label className=' text-lg block'>Address </label>
                        <Field name="address" placeholder="1328 Hayhurust Street" className="border-gray-400 	border-2 rounded-sm p-1 w-96" />
                        {errors.address && touched.address ? (
                            <div>{errors.address}</div>
                        ) : null}</div>
                    <div className='flex gap-10'>
                        <div className=''><label className=' text-lg block'>City: </label>
                            <Field name="city" placeholder="New York" className="border-gray-400 	border-2 rounded-sm p-1 w-64" />
                            {errors.city && touched.fullName ? (
                                <div>{errors.city}</div>
                            ) : null}</div>
                        <div className=''><label className=' text-lg block'>State: </label>

                            <Field name="state" placeholder="Ohio" className="border-gray-400 border-2 rounded-sm p-1 w-72" />
                            {errors.state && touched.state ? (
                                <div>{errors.state}</div>
                            ) : null}</div>
                    </div>
                    <div>
                        <label className='text-lg block'>Country: </label>
                        <Field name="country" type="country" placeholder="USA" className="border-gray-400 	border-2 rounded-sm p-1 w-96 " />
                        {errors.country && touched.country ? <div>{errors.country}</div> : null}
                    </div>
                    <div className='flex justify-between'><button type="submit" className="bg-black text-white px-7 rounded py-2">Change Details</button>
                    </div>
                </Form>
            )}
        </Formik></div>

    </div >
}
const Security = () => {
    const { userDetails } = useSelector(state => state.users)
    const [messageApi, contextHolder] = message.useMessage();
    const handleChangePassword = async (values, resetForm) => {
        const { confirmNewPassword, ...formFields } = values
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formFields)
        };
        const res = await fetch(`http://localhost:4000/change-password/${userDetails._id}`, requestOptions)
        const data = await res.json();
        if (data && res.status == 200) {
            messageApi.info(data.msg);
            resetForm();
        } else if (data && res.status == 401) {
            messageApi.info(data.msg);

        }


    }
    const ChangePasswordSchema = Yup.object().shape({
        password: Yup.string()
            .min(5, 'Password Too Short!')
            .required('Required'),
        newPassword: Yup.string()
            .min(5, 'Password Too Short!')
            .required('Required'),
        confirmNewPassword: Yup.string()
            .min(5, 'Password Too Short!')
            .required('Required')
            .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
    });
    return <div className='ml-64 flex flex-col gap-12'>
        <div className='relative right-8'> <Link href="/dashboard">
            <RollbackOutlined className='text-3xl relative right-8 bottom-3 text-gray-600 hover:cursor-pointer' />
        </Link><p className='text-5xl inline'>Change Password</p></div>

        <div>     <Formik
            initialValues={{
                password: '',
                newPassword: '',
                confirmNewPassword: '',


            }}
            validationSchema={ChangePasswordSchema}
            onSubmit={(values, { resetForm }) => {

                handleChangePassword(values, resetForm);


            }}
        >
            {({ errors, touched }) => (
                <Form className='flex flex-col gap-5'>
                    {contextHolder}
                    <div>
                        <label className='text-lg block'>Current Password: </label>
                        <Field name="password" type="password" placeholder="current password" className="border-gray-400 	border-2 rounded-sm p-1 w-96 " />
                        {errors.password && touched.password ? <div>{errors.password}</div> : null}
                    </div>
                    <div><label className=' text-lg block'>New Password </label>
                        <Field name="newPassword" type="password" placeholder="new password" className="border-gray-400 	border-2 rounded-sm p-1 w-96" />
                        {errors.newPassword && touched.newPassword ? (
                            <div>{errors.newPassword}</div>
                        ) : null}</div>
                    <div>
                        <label className='text-lg block'>Confirm New Password: </label>
                        <Field name="confirmNewPassword" type="password" placeholder="confirm new password" className="border-gray-400 	border-2 rounded-sm p-1 w-96 " />
                        {errors.confirmNewPassword && touched.confirmNewPassword ? <div>{errors.confirmNewPassword}</div> : null}
                    </div>
                    <div className='flex justify-between'><button type="submit" className="bg-black text-white px-7 rounded py-2">Change Password</button>
                    </div>
                </Form>
            )}
        </Formik></div>

    </div>
}



const Dashboard = () => {
    const { Header, Sider, Content } = Layout;
    const [tabId, setTabId] = useState(1)
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const onChange = (key) => {
        setTabId(key.key);
    }
    const handleLogout = () => {
        router.push("/login")
    }
    const items = [
        {
            label: <Link href="/dashboard">Dashboard</Link>,
            icon: <UserOutlined />,
            key: '0',
        },
        {
            label: <Link href="#">Setting</Link>,
            icon: <SettingOutlined />,
            key: '1',
        },
        {
            type: 'divider',
        },
        {
            label: <div onClick={handleLogout}>Logout</div>,
            icon: <LogoutOutlined onClick={handleLogout} />,
            key: '3',
        },
    ];
    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed} className='h-screen'>
                <div className="demo-logo-vertical" />
                <div className='mt-10 w-16 ml-1'>
                    <WhiteLogo ></WhiteLogo>
                </div>
                <Menu

                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    onClick={onChange}
                    items={[
                        {
                            key: 1,
                            icon: <UserOutlined />,
                            label: 'Edit Profile'
                        },
                        {
                            key: 2,
                            icon: <SecurityScanOutlined />,
                            label: 'Security',
                        },
                        {
                            key: 3,
                            icon: <ShopOutlined />,
                            label: 'Privacy Policy',
                        },
                        {
                            key: 4,
                            icon: <RollbackOutlined />,
                            label: <Link href="/dashboard">Go to Dashboard</Link>,
                        },

                    ]}
                >
                </Menu>

            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />

                    <Dropdown className='inline float-right mr-4 '
                        menu={{
                            items,
                        }}
                        size="large"
                        trigger={['click']}
                    >
                        <Link href="#" onClick={(e) => e.preventDefault()}>
                            <Space className='w-36 mr-12'>
                                <div className='relative left-32'><Avatar src="https://bit.ly/dan-abramov" /> <DownOutlined /></div>

                            </Space>
                        </Link>
                    </Dropdown>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >

                    {tabId == 1 ? <EditProfile /> : null}
                    {tabId == 2 ? <Security /> : null}
                    {/* {tabId == 3 ? <Inventory /> : null} */}
                </Content>
            </Layout>
        </Layout >
    );
};
export default Dashboard;