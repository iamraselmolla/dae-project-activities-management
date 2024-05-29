import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SectionTitle from '../../shared/SectionTitle';
import SingleProject from './SingleProject';


const AllProjects = () => {
    const [activeProjects, setActiveProjects] = useState([]);
    const [completedProjects, setCompletedProjects] = useState([]);
    const { projects } = useSelector(state => state.dae)

    useEffect(() => {
        const active = projects.filter((project) => !project.end);
        const completed = projects.filter((project) => project.end);
        setActiveProjects(active);
        setCompletedProjects(completed);
    }, [projects])
    return (
        <section className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
            <div className="container">
                <SectionTitle title={'সকল প্রকল্প'} />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {activeProjects?.map((single, index) => <SingleProject key={single?.name?.details} single={single} />)}
                </div>
            </div>
        </section>
    );
};

export default AllProjects;