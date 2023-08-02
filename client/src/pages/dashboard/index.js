import React, { useState } from 'react';
import { WhiteLogo } from '../../components/logo'
import Link from 'next/link';
import { Layout, Menu, Button, theme, Avatar, Dropdown, Space } from 'antd';

import Billing from '@/components/billing';
import DashboardCard from '@/components/dashboard';
import Customers_Vendors from '@/components/customers_vendors';
import Inventory from '@/components/inventory';
import Bank_Cash from '@/components/bank_cash';
import ManageStore from '@/components/managestore';
import Reports from '@/components/reports';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    LogoutOutlined,
    ShoppingCartOutlined,
    HomeOutlined,
    ShopOutlined,
    TransactionOutlined,
    TeamOutlined,
    SwitcherOutlined,
    PieChartOutlined,
    DownOutlined,
    SettingOutlined,
    UserOutlined

} from '@ant-design/icons';




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
            label: <Link href="/profile">Profile</Link>,
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
                            label: 'Dashboard'
                        },
                        {
                            key: 2,
                            icon: <ShoppingCartOutlined />,
                            label: 'Sales & Billing',
                        },
                        {
                            key: 3,
                            icon: <ShopOutlined />,
                            label: 'Inventory',
                        },
                        {
                            key: 4,
                            icon: <TransactionOutlined />,
                            label: 'Banking',
                        },
                        {
                            key: 5,
                            icon: <TeamOutlined />,
                            label: 'Customers & Vendors',
                        },
                        {
                            key: 6,
                            icon: <PieChartOutlined />,
                            label: 'Reports',

                        },
                        {
                            key: 7,
                            icon: <SwitcherOutlined />,
                            label: 'Manage Stores',

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

                    {tabId == 1 ? <DashboardCard /> : null}
                    {tabId == 2 ? <Billing /> : null}
                    {tabId == 3 ? <Inventory /> : null}
                    {tabId == 4 ? <Customers_Vendors /> : null}
                    {tabId == 5 ? <Bank_Cash /> : null}
                    {tabId == 6 ? <Reports /> : null}
                    {tabId == 7 ? <ManageStore /> : null}
                </Content>
            </Layout>
        </Layout >
    );
};
export default Dashboard;