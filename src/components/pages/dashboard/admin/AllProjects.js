import React, { useEffect, useState } from "react";
import SectionTitle from "../../../shared/SectionTitle";
import SingleProject from "./SingleProject";
import { useSelector } from "react-redux";

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
    <div className="py-5 px-4">
      <>
        {activeProjects.length > 0 && (
          <div className="mb-6">
            <SectionTitle title="সকল চলমান প্রকল্পের তালিকা" />
            {activeProjects.map((project, index) => (
              <SingleProject
                index={index}
                key={project?._id}
                data={project}
              />
            ))}
          </div>
        )}
        {completedProjects.length > 0 && (
          <div className="mb-6 mt-12">
            <SectionTitle title="সকল সম্পন্ন হওয়া প্রকল্পের তালিকা" />
            {completedProjects.map((project, index) => (
              <SingleProject
                index={index}
                key={project?._id}
                data={project}
              />
            ))}
          </div>
        )}
        {activeProjects.length === 0 && completedProjects.length === 0 && (
          <div>কোনো প্রকল্পের তথ্য পাওয়া যায়নি।</div>
        )}
      </>
    </div>
  );
};

export default AllProjects;
