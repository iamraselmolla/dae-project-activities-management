import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteASchool
} from "../../../../../services/userServices";
import toast from "react-hot-toast";
import SectionTitle from "../../../../shared/SectionTitle";
import NoContentFound from "../../../../shared/NoContentFound";
import TableHead from "../../../../shared/TableHead";
import UserSchoolTableRow from "./UserSchoolTableRow";
import { daeAction } from "../../../../store/projectSlice";
import FiscalYear from "../../../../shared/FiscalYear";
import Season from "../../../../shared/Season";
import { toBengaliNumber } from "bengali-number";
import AddModuleButton from "../../../../shared/AddModuleButton";
import { createRandomNumber } from '../../../../utilis/createRandomNumber';
import DeletingLoader from "../../../../shared/DeletingLoader";

const UserSchools = () => {
  const {
    schools,
    projects: allProject,
  } = useSelector((state) => state.dae);
  const dispatch = useDispatch();
  const [selectedProject, setSelectedProject] = useState("");
  const [fiscalYear, setFiscalYear] = useState("");
  const [season, setSeason] = useState("");
  const [search, setSearch] = useState("");
  const [filteredSchools, setFilteredSchools] = useState(schools);
  const [loading, setLoading] = useState(false);

  // Delete a school
  const handleSchoolDeletion = async (schoolData) => {
    if (window.confirm(`আপনি কি এই স্কুলটি মুছে ফেলতে চান?`)) {
      try {
        setLoading(true);
        const result = await deleteASchool(schoolData); // Assuming you have a deleteSchool function
        if (result.status === 200) {
          toast.success(result.data.message);
          dispatch(daeAction.setRefetch(`schools${createRandomNumber()}`));
        }
      } catch (err) {
        toast.error("স্কুলটি মুছতে সাময়িক অসুবিধা হচ্ছে।");
      }
      finally {
        setLoading(false);
      }
    }
  };

  const filterProjects = () => {
    let filtered = schools;

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

  useEffect(() => {
    const filtered = filterProjects();
    setFilteredSchools(filtered);
  }, [selectedProject, fiscalYear, season, schools]);

  const handleSelectChange = (e) => {
    setSelectedProject(e.target.value);
  };

  // make the function to search accordingly all field and call the function in each change
  useEffect(() => {
    // Filter data whenever the search input changes
    const filtered = schools.filter((item) => {
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
    setFilteredSchools(filtered); // Update filtered data
  }, [search, schools]);

  return (
    <div className="flex flex-col">

      <AddModuleButton link={"add-school"} btnText={"স্কুল যুক্ত করুন"} />
      <SectionTitle title={`ইউজারের স্কুলসমূহ (${toBengaliNumber(filteredSchools?.length || 0)})`} />
      <div className="flex py-6 flex-wrap md:flex-wrap lg:flex-nowrap  justify-between items-center gap-3">
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
            {allProject?.map((project) => (
              <option
                key={project.name?.details}
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
      <div className="w-full mb-4">
        <div>
          <input
            type="text"
            className="input input-bordered w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="খুজুন (প্রকল্পের নাম, উপস্থিত কর্মকর্তার নাম/পদবী, মন্তব্য)"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <div className="border mt-6 rounded-lg shadow overflow-hidden dark:border-gray-700 dark:shadow-gray-900">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 bg-white">
            {/* Table Header */}
            <thead>
              <tr className="divide-x font-extrabold divide-gray-200">
                <TableHead text="ক্রঃ নং" />
                <TableHead text="প্রকল্প" />
                <TableHead text="অর্থবছর ও মৌসুম" />
                <TableHead text="স্কুলের তথ্য" />
                <TableHead text="ঠিকানা" />
                <TableHead text="তারিখ" />
                <TableHead text="সহায়তাকারী" />
                <TableHead text="উর্ধবতন" />
                <TableHead text="ছবিসমূহ" />
                <TableHead text="SAAO নাম ও মোবাইল" />
                <TableHead text="মন্তব্য" />
                <TableHead text="একশন" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {/* Table Body */}
              {filteredSchools.length > 0 && (
                filteredSchools.map((school, index) => (
                  <UserSchoolTableRow
                    handleSchoolDeletion={handleSchoolDeletion}
                    index={index}
                    school={school}
                    key={school?._id}
                  />
                ))
              )}

            </tbody>
          </table>
          {filteredSchools?.length < 1 &&
            <NoContentFound text="কোনো স্কুল পাওয়া যায়নি" />
          }
          {
            loading && <DeletingLoader />
          }
        </div>
      </div>
    </div>
  );
};

export default UserSchools;
