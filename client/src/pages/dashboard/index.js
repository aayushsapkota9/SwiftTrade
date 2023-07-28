import React, { useState } from 'react';
import { WhiteLogo } from '../../components/logo'
import Link from 'next/link';
import { Layout, Menu, Button, theme, Avatar } from 'antd';

import Billing from '@/components/billing';
import DashboardCard from '@/components/dashboard';
import Customers_Vendors from '@/components/customers_vendors';
import Inventory from '@/components/inventory';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';




const Dashboard = () => {
    const { Header, Sider, Content } = Layout;
    const [tabId, setTabId] = useState(1)
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const onChange = (key) => {
        console.log(key.key)
        setTabId(key.key);
    }
    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed} >
                <div className="demo-logo-vertical" />
                <div className='mt-10 w-16 ml-1'>
                    <WhiteLogo ></WhiteLogo>
                </div>
                <Menu
                    className='h-screen'
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    onClick={onChange}
                    items={[
                        {
                            key: 1,
                            icon: <UserOutlined />,
                            label: 'Dashboard'
                        },
                        {
                            key: 2,
                            icon: <VideoCameraOutlined />,
                            label: 'Sales & Billing',
                        },
                        {
                            key: 3,
                            icon: <UploadOutlined />,
                            label: 'Inventory',
                        },
                        {
                            key: 4,
                            icon: <UploadOutlined />,
                            label: 'Customers & Vendors',
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
                    <div className='inline float-right mr-10'><Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" /></div>

                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >

                    {tabId == 1 ? <DashboardCard /> : null}
                    {tabId == 2 ? <Billing /> : null}
                    {tabId == 3 ? <Inventory /> : null}
                    {tabId == 4 ? <Customers_Vendors /> : null}
                </Content>
            </Layout>
        </Layout>
    );
};
export default Dashboard;