import React, { useEffect, useState } from "react";
import SectionTitle from "../../shared/SectionTitle";
import SingleProject from "./SingleProject";
import { findAllProjectsData } from "../../../services/userServices";
import toast from "react-hot-toast";
import { toBengaliNumber } from "bengali-number";
import LoaderWithOutDynamicMessage from "../../shared/LoaderWithOutDynamicMessage";

const AllProjects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [projectType, setProjectType] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await findAllProjectsData();
        if (result?.status === 200) {
          setProjects(result?.data?.data);
          setFilteredProjects(result?.data?.data);
        }
      } catch (err) {
        toast.error("প্রকল্পের তথ্য সার্ভার থেকে আনতে অসুবিধা হচ্ছে।");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = projects;
    if (projectType === "running") {
      filtered = filtered.filter((project) => !project.end);
    } else if (projectType === "completed") {
      filtered = filtered.filter((project) => project.end);
    }
    setFilteredProjects(filtered);
  }, [projectType, projects]);

  return (
    <section className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div className="container">
        <SectionTitle
          title={`সকল প্রকল্প (${toBengaliNumber(filteredProjects?.length)})`}
        />
        <div role="tablist" className="tabs tabs-boxed">
          <a
            role="tab"
            onClick={() => setProjectType("all")}
            className={`tab py-4 h-auto md:text-2xl text-lg font-bold ${projectType === "all" && "text-white theme-bg"}`}
          >
            সকল
          </a>
          <a
            role="tab"
            onClick={() => setProjectType("running")}
            className={`tab py-4 h-auto md:text-2xl text-lg font-bold ${projectType === "running" && "text-white theme-bg"}`}
          >
            চলমান
          </a>
          <a
            role="tab"
            onClick={() => setProjectType("completed")}
            className={`tab py-4 h-auto md:text-2xl text-lg font-bold ${projectType === "completed" && "text-white theme-bg"}`}
          >
            সম্পন্ন
          </a>
        </div>
        {!loading ? (
          <div className="grid grid-cols-1 mt-16 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProjects?.map((single) => (
              <SingleProject key={single?.name?.details} single={single} />
            ))}
          </div>
        ) : (
          <LoaderWithOutDynamicMessage />
        )}
      </div>
    </section>
  );
};

export default AllProjects;
