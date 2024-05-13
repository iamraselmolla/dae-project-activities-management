// AdminDashboard.js
import React, { PureComponent } from 'react';

import { useSelector } from 'react-redux';
import { GoNote, GoProject } from 'react-icons/go';
import DashboardCard from '../../../shared/DashboardCard';
import { FaUser } from 'react-icons/fa';
import { GiDiscussion } from 'react-icons/gi';
import { GrCheckboxSelected } from 'react-icons/gr';
import { AiOutlineFileDone } from 'react-icons/ai';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


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
    const data = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];

    return (
        <section className='py-5'>
            <div className="grid grid-cols-2 gap-5 justify-center items-center">
                <div className="grid grid-cols-3 gap-3">
                    {cards.map((card, index) => (
                        <DashboardCard key={index} {...card} />
                    ))}
                </div><ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        width={500}
                        height={400}
                        data={data}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="uv" stackId="1" stroke="#8884d8" fill="#8884d8" />
                        <Area type="monotone" dataKey="pv" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                        <Area type="monotone" dataKey="amt" stackId="1" stroke="#ffc658" fill="#ffc658" />
                    </AreaChart>
                </ResponsiveContainer>
                <div>

                </div>
            </div>
        </section>
    );
};

export default AdminDashboard;
