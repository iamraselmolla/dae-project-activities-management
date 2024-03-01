import React from 'react';
import DashboardMenu from './DashboardMenu';
import { Outlet } from 'react-router-dom';
// import './dashboard-css/admin.css'

const DashboardLayout = () => {
    return (
        <section className='grid py-0'>
            <div className="grid relative grid-cols-5">
                <div className="col-span-1 sticky-top ">
                    <DashboardMenu />
                </div>
                <div className="col-span-4 " >
                    <Outlet />
                </div >
            </div >
        </section >
    );
};

export default DashboardLayout;