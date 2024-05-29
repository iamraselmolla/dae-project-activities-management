import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SectionTitle from '../../shared/SectionTitle';
import SingleProject from './SingleProject';
import { findAllProjectsData } from '../../../services/userServices';
import toast from 'react-hot-toast';


const AllProjects = () => {
    const [projects, setAllProjects] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await findAllProjectsData();
                if (result?.status === 200) {
                    setAllProjects(result?.data?.data)
                }
            }
            catch (err) {
                toast.error("প্রকল্পের তথ্য সার্ভার থেকে আনতে অসুবিধা হচ্ছে।")
            }
        }
        fetchData()
    }, []);


    return (
        <section className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
            <div className="container">
                <SectionTitle title={'সকল প্রকল্প'} />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {projects?.map((single, index) => <SingleProject key={single?.name?.details} single={single} />)}

                </div>
            </div>
        </section>
    );
};

export default AllProjects;