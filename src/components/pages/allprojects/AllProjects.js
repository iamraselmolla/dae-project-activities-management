import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SectionTitle from '../../shared/SectionTitle';
import { GiGrainBundle } from "react-icons/gi";
import { toBengaliNumber } from 'bengali-number';


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
                    {activeProjects?.map((single, index) => (
                        <div className='px-3 py-5 rounded-xl bg-white' key={single?.name?.details}>
                            <h2 className="text-md font-bold">
                                {single?.name?.details} ({single?.name?.short})
                            </h2>
                            <div className="mt-4">
                                <h3 className="flex gap-3">
                                    <div className='flex gap-1 items-center'>
                                        <GiGrainBundle /> প্রযুক্তিঃ
                                    </div>
                                    <div>
                                        {toBengaliNumber(single?.crops?.length)}
                                    </div>
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AllProjects;