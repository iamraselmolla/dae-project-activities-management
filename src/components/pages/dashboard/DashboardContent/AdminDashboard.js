// AdminDashboard.js
import React from 'react';
import { useSelector } from 'react-redux';
import { GoNote, GoProject } from 'react-icons/go';
import DashboardCard from '../../../shared/DashboardCard';
import { FaUser } from 'react-icons/fa';
import { GiDiscussion } from 'react-icons/gi';
import { GrCheckboxSelected } from 'react-icons/gr';
import { AiOutlineFileDone } from 'react-icons/ai';

const AdminDashboard = () => {
    const { projects, users, trainings, notes } = useSelector(state => state.dae);
    const runningProjects = projects?.filter(single => !single.end).length
    const completedNotes = notes?.filter(single => single.completed).length

    const cards = [
        { icon: <GoProject />, count: runningProjects, text: 'চলমান প্রকল্প', backgroundColor: '#ffe2e6' },
        { icon: <GrCheckboxSelected />, count: projects?.length - runningProjects, text: 'সম্পন্ন প্রকল্প', backgroundColor: '#fff4de' },
        { icon: <FaUser />, count: users?.length - 1, text: 'সকল ইউজার', backgroundColor: '#dcfce7' },
        { icon: <GiDiscussion />, count: trainings?.length, text: 'সকল প্রশিক্ষণ', backgroundColor: '#f4e8ff' },
        { icon: <GoNote />, count: notes?.length - completedNotes, text: 'অসম্পন্ন নোটস', backgroundColor: '#f5b0b9' },
        { icon: <AiOutlineFileDone />, count: completedNotes, text: 'সম্পন্ন নোটস', backgroundColor: '#ffc98b' },
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
