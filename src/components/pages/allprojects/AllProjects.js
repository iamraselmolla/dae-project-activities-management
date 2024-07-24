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

  return (
    <section className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div className="container">
        {!loading ? (
          <>
            <SectionTitle
              title={`সকল প্রকল্প (${toBengaliNumber(projects?.length)})`}
            />
            <div className="grid grid-cols-1 mt-10 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
