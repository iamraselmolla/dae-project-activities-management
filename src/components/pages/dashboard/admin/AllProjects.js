import React, { useEffect, useState } from 'react';
import { getAllProjects } from '../../../../services/userServices';
import SectionTitle from '../../../shared/SectionTitle';
import Loader from '../../../shared/Loader';
import SingleProject from './SingleProject'

const AllProjects = () => {
    const [allProjects, setAllProjects] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        try {
            setLoading(true)
            const getAllProjectsInfo = async () => {
                const result = await getAllProjects()
                if (result?.status === 200) {
                    setAllProjects(result?.data?.data)
                    setLoading(false)
                }
            }
            getAllProjectsInfo()
        }
        catch (err) {
            console.log(err)
            setLoading(false)
        }
    }, [])
    return (
        <div className='py-5 px-4'>
            {!loading && allProjects?.length > 0 && <>

                <SectionTitle title={"সকল প্রকল্পের তালিকা"} />
                {allProjects?.map((project, index) =>

                    <SingleProject index={index} key={project?._id} data={project} />

                )}
            </>}

            {loading && <div className='flex justify-center items-center'>
                <Loader />

            </div>}

        </div>
    );
};

export default AllProjects;