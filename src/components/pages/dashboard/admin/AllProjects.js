import React, { useContext, useEffect, useState } from "react";
import { getAllProjects } from "../../../../services/userServices";
import SectionTitle from "../../../shared/SectionTitle";
import Loader from "../../../shared/Loader";
import SingleProject from "./SingleProject";
import { makeSureOnline } from "../../../shared/MessageConst";
import { AuthContext } from "../../../AuthContext/AuthProvider";

const AllProjects = () => {
  const [activeProjects, setActiveProjects] = useState([]);
  const [completedProjects, setCompletedProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const { role } = useContext(AuthContext);

  useEffect(() => {
    const getAllProjectsInfo = async () => {
      try {
        setLoading(true);
        const result = await getAllProjects(role);
        if (result?.status === 200) {
          const projects = result?.data?.data || [];
          const active = projects.filter((project) => !project.end);
          const completed = projects.filter((project) => project.end);
          setActiveProjects(active);
          setCompletedProjects(completed);
        } else {
          setError("Failed to fetch projects");
        }
      } catch (err) {
        setError("An error occurred while fetching projects");
      } finally {
        setLoading(false);
      }
    };

    if (navigator.onLine) {
      getAllProjectsInfo();
    } else {
      makeSureOnline();
    }
  }, [refetch, role]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="py-5 px-4">
      {loading && (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      )}
      {!loading && (
        <>
          {activeProjects.length > 0 && (
            <div className="mb-৪">
              <SectionTitle title="সকল চলমান প্রকল্পের তালিকা" />
              {activeProjects.map((project, index) => (
                <SingleProject
                  setRefetch={setRefetch}
                  refetch={refetch}
                  index={index}
                  key={project?._id}
                  data={project}
                />
              ))}
            </div>
          )}
          {completedProjects.length > 0 && (
            <div className="mb-৪">
              <SectionTitle title="সকল সম্পন্ন হওয়া প্রকল্পের তালিকা" />
              {completedProjects.map((project, index) => (
                <SingleProject
                  setRefetch={setRefetch}
                  refetch={refetch}
                  index={index}
                  key={project?._id}
                  data={project}
                />
              ))}
            </div>
          )}
          {activeProjects.length === 0 && completedProjects.length === 0 && (
            <div>No projects available</div>
          )}
        </>
      )}
    </div>
  );
};

export default AllProjects;
