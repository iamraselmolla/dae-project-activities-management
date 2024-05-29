import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../AuthContext/AuthProvider";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteASchool,
  getUserAllSchools,
} from "../../../../../services/userServices";
import toast from "react-hot-toast";
import SectionTitle from "../../../../shared/SectionTitle";
import NoContentFound from "../../../../shared/NoContentFound";
import TableHead from "../../../../shared/TableHead";
import UserSchoolTableRow from "./UserSchoolTableRow";
import { daeAction } from "../../../../store/projectSlice";
import FiscalYear from "../../../../shared/FiscalYear";
import Season from "../../../../shared/Season";

const UserSchools = () => {
  const { user } = useContext(AuthContext);
  const {
    refetch,
    userData: { schools },
    projects: allProject,
  } = useSelector((state) => state.dae);
  const dispatch = useDispatch();
  const [selectedProject, setSelectedProject] = useState("");
  const [fiscalYear, setFiscalYear] = useState("");
  const [season, setSeason] = useState("");
  const [search, setSearch] = useState("");
  const [filteredSchools, setFilteredSchools] = useState(schools);

  // Delete a school
  const handleSchoolDeletion = async (schoolId) => {
    if (window.confirm(`আপনি কি এই স্কুলটি মুছে ফেলতে চান?`)) {
      try {
        const result = await deleteASchool(schoolId); // Assuming you have a deleteSchool function
        if (result.status === 200) {
          toast.success(result.data.message);
          dispatch(daeAction.setRefetch());
        }
      } catch (err) {
        toast.error("স্কুলটি মুছতে সাময়িক অসুবিধা হচ্ছে।");
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
  }, [selectedProject, fiscalYear, season]);

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
  }, [search]);

  return (
    <div className="flex flex-col">
      <SectionTitle title="ইউজারের স্কুলসমূহ" />
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
                key={project._id}
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
      <div className="w-full mb-12">
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
      <div className="mt-10 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <table className="min-w-full divide-y bg-white divide-gray-200">
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
              {schools.length > 0 ? (
                schools.map((school, index) => (
                  <UserSchoolTableRow
                    handleSchoolDeletion={handleSchoolDeletion}
                    index={index}
                    school={school}
                    key={school?._id}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="5">
                    <NoContentFound text="কোনো স্কুল পাওয়া যায়নি" />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserSchools;
