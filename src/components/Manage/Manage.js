import React, { useState } from 'react'
import SideBar from '../SideBar/SideBar'
import { FaBars } from 'react-icons/fa'
import { Outlet } from 'react-router-dom'


const Manage = () => {
    const [collapsed, setCollapsed] = useState(false)

    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <SideBar collapsed={collapsed} />
            </div>
            <div className="admin-content">
                <div className="admin-header">
                    <FaBars onClick={() => setCollapsed(!collapsed)} />
                </div>
                <Outlet />
            </div>
        </div>
    )
}

export default Manage