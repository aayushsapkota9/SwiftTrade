import React, { useState } from 'react';
import { Layout, Menu, Button, theme } from 'antd';
import SideBar from '@/components/SideBar';
const Dashboard = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <SideBar></SideBar>

    )
};
export default Dashboard;