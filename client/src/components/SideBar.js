import React, { useState } from 'react';
import {
    HomeOutlined,
    ShopOutlined,
    ShoppingCartOutlined,
    FileOutlined,
    TeamOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { WhiteLogo } from '../components/logo'
import { useRouter } from 'next/router';
const { Sider } = Layout;
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
const items = [
    getItem('Dashboard', 'dashboard', <HomeOutlined />),
    getItem('Billing', 'billing', <ShoppingCartOutlined />,),
    getItem('Inventory', 'inventory', <ShopOutlined />,),
    getItem('Option', 'sub1', <ShopOutlined />, [
        getItem('Tom', '3'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined />),
];
const SideBar = (props) => {
    const router = useRouter()
    const [collapsed, setCollapsed] = useState(false);
    const handleClick = (tabId) => {
        console.log(tabId)
        tabId.key == "dashboard" ? router.push('/dashboard') : null
        tabId.key == "billing" ? router.push('/dashboard/billing') : null
        tabId.key == "inventory" ? router.push('/dashboard/inventory') : null
    }
    return (
        <Layout
        >
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} style={{
                minHeight: '100vh',
            }}>
                <div className="demo-logo-vertical" />
                <div className='mt-10 w-16 ml-1'>
                    <WhiteLogo ></WhiteLogo>
                </div>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={(e) => handleClick(e)} />
            </Sider>
        </Layout>
    )
}

export default SideBar