import React, { useEffect, useState } from "react";
import SectionTitle from "../../shared/SectionTitle";
import SingleProject from "./SingleProject";
import { findAllProjectsData } from "../../../services/userServices";
import toast from "react-hot-toast";
import { toBengaliNumber } from "bengali-number";
import LoaderWithOutDynamicMessage from "../../shared/LoaderWithOutDynamicMessage";

const AllProjects = () => {
  const [projects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [projectType, setProjectType] = useState("all");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await findAllProjectsData();
        if (result?.status === 200) {
          setAllProjects(result?.data?.data);
          setLoading(false);
        }
      } catch (err) {
        toast.error("প্রকল্পের তথ্য সার্ভার থেকে আনতে অসুবিধা হচ্ছে।");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const filterProjects = () => {
    let filtered = demos;
    if (demoType === "primary") {
      filtered = filtered.filter((project) => !project.completed);
    } else if (demoType === "final") {
      filtered = filtered.filter((project) => project.completed);
    }

    return filtered;
  };
  useEffect(() => {
    const filtered = filterProjects();
    setProjectType(filtered);
  }, [projectType]);


  return (
    <section className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div className="container">
        {!loading ? (
          <>
            <SectionTitle
              title={`সকল প্রকল্প (${toBengaliNumber(projects?.length)})`}
            />
            <div role="tablist" className="tabs tabs-boxed">
              <a
                role="tab"
                onClick={() => setProjectType("all")}
                className={`tab py-4 h-auto md:text-2xl text-lg font-bold  ${projectType === "all" && "text-white theme-bg"}`}
              >
                সকল
              </a>
              <a
                role="tab"
                onClick={() => setProjectType("running")}
                className={`tab py-4 h-auto md:text-2xl text-lg font-bold  ${projectType === "primary" && "text-white theme-bg"}`}
              >
                চলমান
              </a>
              <a
                role="tab"
                onClick={() => setProjectType("completed")}
                className={`tab py-4 h-auto md:text-2xl text-lg font-bold  ${projectType === "final" && "text-white theme-bg"}`}
              >
                সম্পন্ন
              </a>
            </div>
            <div className="grid grid-cols-1 mt-16 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {projects?.map((single, index) => (
                <SingleProject key={single?.name?.details} single={single} />
              ))}
            </div>
          </>
        ) : (
          <>
            <LoaderWithOutDynamicMessage />
          </>
        )}
      </div>
    </section>
  );
};

export default AllProjects;
