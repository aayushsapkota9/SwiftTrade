import { BlackLogo, WhiteLogo } from '../../components/logo'
import Sidebar from '@/components/sidebar'
import React from 'react'
import { useSelector } from 'react-redux'
function Dashboard() {
    // const { fullName } = useSelector(state => state.users)
    return (
        <div>
            <Sidebar></Sidebar>

        </div>
    )
}

export default Dashboard