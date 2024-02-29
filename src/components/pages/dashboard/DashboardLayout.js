import React from 'react';
import DashboardMenu from './DashboardMenu';
import { Outlet } from 'react-router-dom';
// import './dashboard-css/admin.css'

const DashboardLayout = () => {
    return (
        <section className='grid py-0'>
            <div class="grid grid-cols-5">
                <div class="col-span-1 ">
                    <DashboardMenu />
                </div>
                <div class="col-span-4 bg-green-200">
                    <Outlet />
                </div>
            </div>
        </section>
    );
};

export default DashboardLayout;