import React, { useEffect, useState } from "react";
import AddModuleButton from "../../shared/AddModuleButton";
import { getAllMotivationalTours } from "../../../services/userServices";
import toast from "react-hot-toast";
import Loader from "../../shared/Loader";
import SingleTour from "./SingleTour";
import SectionTitle from "../../shared/SectionTitle";
import Season from "../../shared/Season";
import FiscalYear from "../../shared/FiscalYear";
import { useSelector } from "react-redux";

function MotivationalTour() {
  const { projects: allProjects } = useSelector(state => state.dae)
  const [allTours, setAllTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState("");
  const [fiscalYear, setFiscalYear] = useState("");
  const [season, setSeason] = useState("");
  const [search, setSearch] = useState("");
  const [filteredTours, setFilteredTours] = useState(allTours);

  const filterTours = () => {
    let filtered = allTours;

    if (selectedProject !== "") {
      filtered = filtered.filter((project) =>
        project.projectInfo.details.includes(selectedProject)
      );
    }

    if (fiscalYear !== "") {
      filtered = filtered.filter((project) =>
        project.time.fiscalYear.includes(fiscalYear)
      );
    }

    if (season !== "") {
      filtered = filtered.filter((project) =>
        project.time.season.includes(season)
      );
    }

    return filtered; // Return the filtered projects
  };

  // Call filterProjects inside the useEffect hook to update filteredProjects state
  useEffect(() => {
    const filtered = filterTours();
    setFilteredTours(filtered);
  }, [selectedProject, fiscalYear, season]);


  useEffect(() => {
    const fetchTours = async () => {
      try {
        const result = await getAllMotivationalTours();
        if (result.status === 200) {
          setAllTours(result?.data?.data);
        }
      } catch (err) {
        toast.error("উদ্বুদ্ধকরণ  ভ্রমণ ডাটাবেইজ থেকে আনতে অসুবিধা হচ্ছে।");
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, []);
  const handleSelectChange = (e) => {
    setSelectedProject(e.target.value);
  };
  return (
    <>
      <section className="mx-auto bg-white max-w-7xl px-2 sm:px-6 lg:px-8">
        <AddModuleButton
          link={"add-motivational-tour"}
          btnText={"উদ্বদ্ধরণ ভ্রমণ যুক্ত করুন"}
        />
        <SectionTitle title={"সকল উদ্বুদ্ধকরণ ভ্রমণ"} />
        <div className="flex flex-wrap justify-between items-center gap-3">
          <div>
            <label className="font-extrabold mb-1 block">
              প্রকল্পের পুরো নাম
            </label>
            <select
              className="input input-bordered w-full"
              value={selectedProject}
              onChange={handleSelectChange}
            >
              <option value="" label="প্রকল্প সিলেক্ট করুন" />
              {allProjects?.map((project) => (
                <option
                  key={project?.name?.details}
                  value={project?.name?.details}
                  label={project?.name?.details}
                />
              ))}
            </select>
          </div>

          <div>
            <label className="font-extrabold mb-1 block">অর্থবছর</label>
            <select
              className="input input-bordered w-full"
              type="text"
              value={fiscalYear}
              onChange={(e) => setFiscalYear(e.target.value)}
              placeholder="অর্থবছর সিলেক্ট করুন"
            >
              <FiscalYear />
            </select>
          </div>
          <div>
            <label className="font-extrabold mb-1 block">মৌসুম</label>
            <select
              className="input input-bordered w-full"
              id="season"
              name="season"
              value={season}
              onChange={(e) => setSeason(e.target.value)}
            >
              <Season />
            </select>
          </div>

        </div>
        <div className=" mb-10">
          <label className="font-extrabold mb-1 block">খুজুন</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="অনুসন্ধান লিখুন"
          />
        </div>
        {!loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-6">
            {filteredTours &&
              filteredTours?.length > 0 &&
              filteredTours?.map((single) => (
                <SingleTour key={single?._id} tour={single} />
              ))}
          </div>
        ) : (
          <>
            <div className="flex justify-center items-center">
              <Loader />
            </div>
          </>
        )}
      </section>
    </>
  );
}

export default MotivationalTour;
