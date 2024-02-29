import React from 'react';
import DashboardMenu from './DashboardMenu';
// import './dashboard-css/admin.css'

const DashboardLayout = () => {
    return (
        <section className='grid py-0'>
            <div class="grid grid-cols-5 gap-4 h-24">
                <div class="col-span-1">
                    <DashboardMenu />
                </div>
                <div class="col-span-4 bg-green-200">80%</div>
            </div>
        </section>
    );
};

export default DashboardLayout;