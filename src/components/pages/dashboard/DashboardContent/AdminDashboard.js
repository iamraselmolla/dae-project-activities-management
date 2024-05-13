import React from 'react';
import { useSelector } from 'react-redux';

const AdminDashboard = () => {
    const { projects } = useSelector(state => state.dae)
    return (
        <section className='py-5'>
            <div className="grid grid-cols-4 gap-3">
                <div className="border-b-indigo-300">

                </div>
            </div>
        </section>
    );
};

export default AdminDashboard;