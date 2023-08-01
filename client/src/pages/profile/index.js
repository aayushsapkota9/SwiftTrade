import React, { useState } from 'react';
import { WhiteLogo } from '../../components/logo'
import Link from 'next/link';
import { Layout, Menu, Button, theme, Avatar, Dropdown, Space } from 'antd';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Image } from '@chakra-ui/react'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    LogoutOutlined,
    ShoppingCartOutlined,
    HomeOutlined,
    ShopOutlined,
    DownOutlined,
    SettingOutlined,
    UserOutlined

} from '@ant-design/icons';
const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    lastName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
});
const EditProfile = () => {
    return <div className='ml-64 flex flex-col gap-12'>
        <div className='text-5xl'>Edit Profile</div>
        <div><Image
            borderRadius='full'
            boxSize='150px'
            src='https://bit.ly/dan-abramov'
            alt='Dan Abramov'
        /></div>
        <div>     <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                address: '',
                city: '',
                state: '',
                zip: '',
                country: '',

            }}
            validationSchema={SignupSchema}
            onSubmit={values => {
                // same shape as initial values
                console.log(values);
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
                            <Field name="fullName" placeholder="New York" className="border-gray-400 	border-2 rounded-sm p-1 w-64" />
                            {errors.fullName && touched.fullName ? (
                                <div>{errors.fullName}</div>
                            ) : null}</div>
                        <div className=''><label className=' text-lg block'>State: </label>

                            <Field name="companyName" placeholder="Ohio" className="border-gray-400 border-2 rounded-sm p-1 w-72" />
                            {errors.companyName && touched.companyName ? (
                                <div>{errors.companyName}</div>
                            ) : null}</div>
                    </div>

                    <div className='flex justify-between'><button type="submit" className="bg-black text-white px-7 rounded py-2">Change</button>
                    </div>
                </Form>
            )}
        </Formik></div>

    </div>
}
const Security = () => {
    return <div>
        <div>Edit Password</div>

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
            label: 'Logout',
            icon: <LogoutOutlined />,
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
                            icon: <HomeOutlined />,
                            label: 'Edit Profile'
                        },
                        {
                            key: 2,
                            icon: <ShoppingCartOutlined />,
                            label: 'Security',
                        },
                        {
                            key: 3,
                            icon: <ShopOutlined />,
                            label: 'Privacy Policy',
                        },
                        {
                            key: 4,
                            icon: <ShopOutlined />,
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
                                <div className='relative left-32'><Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" /> <DownOutlined /></div>

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