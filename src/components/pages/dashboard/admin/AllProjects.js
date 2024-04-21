import React, { useEffect, useState } from "react";
import { getAllProjects } from "../../../../services/userServices";
import SectionTitle from "../../../shared/SectionTitle";
import Loader from "../../../shared/Loader";
import SingleProject from "./SingleProject";
import { makeSureOnline } from "../../../shared/MessageConst";

const AllProjects = () => {
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    const getAllProjectsInfo = async () => {
      try {
        setLoading(true);
        const result = await getAllProjects();
        if (result?.status === 200) {
          setAllProjects(result?.data?.data);
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
  }, [refetch]);

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
      {!loading && allProjects?.length > 0 && (
        <>
          <SectionTitle title="সকল প্রকল্পের তালিকা" />
          {allProjects?.map((project, index) => (
            <SingleProject
              setRefetch={setRefetch}
              refetch={refetch}
              index={index}
              key={project?._id}
              data={project}
            />
          ))}
        </>
      )}
      {!loading && allProjects?.length === 0 && (
        <div>No projects available</div>
      )}
    </div>
  );
};

export default AllProjects;
