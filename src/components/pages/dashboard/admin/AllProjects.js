import React, { useEffect, useState } from 'react';
import { getAllProjects } from '../../../../services/userServices';

const AllProjects = () => {
    const [allProjects, setAllProjects] = useState([]);

    useEffect(() => {
        try {
            const getAllProjectsInfo = async () => {
                const result = await getAllProjects()
                if (result?.status === 200) {
                    setAllProjects(result?.data?.data)
                }
            }
            getAllProjectsInfo()
        }
        catch (err) {
            console.log(err)
        }
    }, [])
    return (
        <div>
            {allProjects && allProjects?.length}
        </div>
    );
};

export default AllProjects;