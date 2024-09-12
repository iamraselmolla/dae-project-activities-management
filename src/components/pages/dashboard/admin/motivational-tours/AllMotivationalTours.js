import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddModuleButton from "../../../../shared/AddModuleButton";
import SectionTitle from "../../../../shared/SectionTitle";
import NoContentFound from "../../../../shared/NoContentFound";
import MotivationalTourCard from "./MotivationalTourCard";
import { toBengaliNumber } from "bengali-number";
import FiscalYear from "../../../../shared/FiscalYear";
import Season from "../../../../shared/Season";

function AllMotivationalTours() {
  const { tours: allTours, projects: allProjects } = useSelector((state) => state.dae);
  const [selectedProject, setSelectedProject] = useState("");
  const [fiscalYear, setFiscalYear] = useState("");
  const [season, setSeason] = useState("");
  const [search, setSearch] = useState("");
  const [filteredTours, setFilteredTours] = useState([]);

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

  useEffect(() => {
    const filtered = allTours.filter((item) => {
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
    setFilteredTours(filtered);
  }, [search]);

  return (
    <div className="flex py-4 flex-col">
      <div className="mt-4">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <AddModuleButton
            link={"add-motivational-tour"}
            btnText={"মোটিভেশনাল ট্যুর যুক্ত করুন"}
          />
          <div>
            <SectionTitle
              title={`সকল উদ্বুদ্ধকরণ ভ্রমণ (${toBengaliNumber(
                filteredTours?.length
              )})`}
            />

            <div className="flex mb-8 mt-4 flex-wrap justify-between items-center gap-3">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTours?.length > 0 &&
                filteredTours?.map((tour, index) => (
                  <MotivationalTourCard
                    data={tour}
                    index={index}
                    key={tour?._id}
                  />
                ))}
            </div>
            {filteredTours?.length < 1 && (
              <NoContentFound text={"কোনো ট্যুরের তথ্য পাওয়া যায়নি!!"} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllMotivationalTours;
