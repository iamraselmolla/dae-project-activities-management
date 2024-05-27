import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddModuleButton from "../../../../shared/AddModuleButton";
import SectionTitle from "../../../../shared/SectionTitle";
import NoContentFound from "../../../../shared/NoContentFound";
import MotivationalTourTableRow from "./MotivationalTourTableRow";
import TableHead from "../../../../shared/TableHead";
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
    <div className="flex py-4 flex-col">
      <div className="mt-4 overflow-x-scroll">
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
            <div className="border rounded-lg shadow overflow-hidden dark:border-gray-700 dark:shadow-gray-900">
              {allTours?.length > 0 && (
                <table className="min-w-full bg-white divide-y divide-gray-200 dark:divide-gray-700">
                  <thead>
                    <tr className="divide-x font-extrabold divide-gray-200 dark:divide-gray-700">
                      <TableHead text={'ক্র: নং:'} />
                      <TableHead text={'প্রকল্প'} />
                      <TableHead text={'অর্থবছর ও মৌসুম'} />
                      <TableHead text={'স্থান'} />
                      <TableHead text={'তারিখ'} />
                      <TableHead text={'কৃষকের সংখ্যা'} />
                      <TableHead text={'মন্তব্য'} />
                      <TableHead text={'ছবিসমূহ'} />
                      <TableHead text={'একশন'} />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredTours?.length > 0 &&
                      filteredTours?.map((tour, index) => (
                        <MotivationalTourTableRow
                          data={tour}
                          index={index}
                          key={tour?._id}
                        />
                      ))}
                  </tbody>
                </table>
              )}
              {filteredTours?.length < 1 && (
                <NoContentFound text={"কোনো ট্যুরের তথ্য পাওয়া যায়নি!!"} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllMotivationalTours;
