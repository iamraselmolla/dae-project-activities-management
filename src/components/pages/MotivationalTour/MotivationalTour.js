import React, { useContext, useEffect, useState } from "react";
import AddModuleButton from "../../shared/AddModuleButton";
import { getAllMotivationalTours } from "../../../services/userServices";
import toast from "react-hot-toast";
import SingleTour from "./SingleTour";
import SectionTitle from "../../shared/SectionTitle";
import Season from "../../shared/Season";
import FiscalYear from "../../shared/FiscalYear";
import { useSelector } from "react-redux";
import { toBengaliNumber } from "bengali-number";
import LoaderWithOutDynamicMessage from "../../shared/LoaderWithOutDynamicMessage";
import NoContentFound from "../../shared/NoContentFound"
import { AuthContext } from "../../AuthContext/AuthProvider";

function MotivationalTour() {
  const { projects: allProjects } = useSelector((state) => state.dae);
  const [allTours, setAllTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState("");
  const [fiscalYear, setFiscalYear] = useState("");
  const [season, setSeason] = useState("");
  const [search, setSearch] = useState("");
  const [filteredTours, setFilteredTours] = useState([]);
  const { role } = useContext(AuthContext)

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const result = await getAllMotivationalTours();
        if (result.status === 200) {
          setAllTours(result?.data?.data);
          setFilteredTours(result?.data?.data); // Initialize filteredTours with allTours
        }
      } catch (err) {
        toast.error("উদ্বুদ্ধকরণ  ভ্রমণ ডাটাবেইজ থেকে আনতে অসুবিধা হচ্ছে।");
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, []);

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

    return filtered;
  };

  useEffect(() => {
    const filtered = filterTours();
    setFilteredTours(filtered);
  }, [selectedProject, fiscalYear, season]);

  const handleSelectChange = (e) => {
    setSelectedProject(e.target.value);
  };

  // Make and call function to change searching result according each searching key change
  useEffect(() => {
    // Filter data whenever the search input changes
    const filtered = allTours.filter((item) => {
      // Check if any field matches the search input
      for (const key in item) {
        if (typeof item[key] === "string" && item[key].includes(search)) {
          return true;
        }
        if (typeof item[key] === "object") {
          for (const subKey in item[key]) {
            if (
              typeof item[key][subKey] === "string" &&
              item[key][subKey].includes(search)
            ) {
              return true;
            }
          }
        }
      }
      return false;
    });
    setFilteredTours(filtered); // Update filtered data
  }, [search]);

  return (
    <>
      <section className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        {role === 'admin' && <AddModuleButton
          link={"add-motivational-tour"}
          btnText={"উদ্বদ্ধরণ ভ্রমণ যুক্ত করুন"}
        />}
        <SectionTitle
          title={`সকল উদ্বুদ্ধকরণ ভ্রমণ ${!loading ? `(${toBengaliNumber(filteredTours?.length)})` : ''}`}
        />
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
        {!loading ? (
          <div className="grid mt-12 md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-6">
            {filteredTours &&
              filteredTours?.length > 0 &&
              filteredTours?.map((single) => (
                <SingleTour key={single?._id} tour={single} />
              ))}
          </div>
        ) : (
          <LoaderWithOutDynamicMessage />
        )}
        {!loading && !filteredTours?.length && (
          <NoContentFound text={'কোনো কৃষক গ্রুপ সভার তথ্য পাওয়া যায়নি । '} />
        )}
      </section>
    </>
  );
}

export default MotivationalTour;
