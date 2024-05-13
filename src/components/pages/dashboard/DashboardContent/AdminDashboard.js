// AdminDashboard.js
import React from 'react';
import { useSelector } from 'react-redux';
import { GoProject } from 'react-icons/go';
import DashboardCard from '../../../shared/DashboardCard';

const AdminDashboard = () => {
    const { projects } = useSelector(state => state.dae);
    const runningProjects = projects?.filter(single => !single.end);
    const endProjects = projects?.filter(single => single.end);

    const cards = [
        { icon: <GoProject />, count: runningProjects?.length, text: 'চলমান প্রকল্প', backgroundColor: '#ffe2e6' },
        { icon: <GoProject />, count: endProjects?.length, text: 'সম্পন্ন প্রকল্প', backgroundColor: '#fff4de' },
        { icon: <GoProject />, count: endProjects?.length, text: 'সম্পন্ন প্রকল্প', backgroundColor: '#dcfce7' },
        { icon: <GoProject />, count: endProjects?.length, text: 'সম্পন্ন প্রকল্প', backgroundColor: '#f4e8ff' },
        { icon: <GoProject />, count: endProjects?.length, text: 'সম্পন্ন প্রকল্প', backgroundColor: '#b2c4c0' },
        { icon: <GoProject />, count: endProjects?.length, text: 'সম্পন্ন প্রকল্প', backgroundColor: '#ffc98b' },
        // Add more cards as needed
    ];

    return (
        <section className='py-5'>
            <div className="grid grid-cols-6 gap-5 justify-center items-center">
                {cards.map((card, index) => (
                    <DashboardCard key={index} {...card} />
                ))}
            </div>
        </section>
    );
};

export default AdminDashboard;
