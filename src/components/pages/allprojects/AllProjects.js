import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

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
        <div>

        </div>
    );
};

export default AllProjects;