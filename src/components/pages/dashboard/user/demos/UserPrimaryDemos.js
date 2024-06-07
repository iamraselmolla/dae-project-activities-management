import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { makeSureOnline } from "../../../../shared/MessageConst";
import { deleteUserDemo } from "../../../../../services/userServices";
import UserSingleDemoTableRow from "./UserSingleDemoTableRow";
import MarkDemoCompleteModal from "../../../../shared/MarkDemoCompleteModal";
import SectionTitle from "../../../../shared/SectionTitle";
import NoContentFound from "../../../../shared/NoContentFound";
import AddModuleButton from "../../../../shared/AddModuleButton";
import { useDispatch, useSelector } from "react-redux";
import { daeAction } from "../../../../store/projectSlice";
import { toBengaliNumber } from "bengali-number";
import Season from "../../../../shared/Season";
import FiscalYear from "../../../../shared/FiscalYear";

const UserPrimaryDemos = () => {
  const {
    userData,
    endFetch,
    projects: allProjects,
  } = useSelector((state) => state.dae);
  const [modalData, setModalData] = useState(null)
  const [fiscalYear, setFiscalYear] = useState("");
  const [season, setSeason] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [filteredDemos, setFilteredDemos] = useState(userData?.demos);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredDemos?.slice(indexOfFirstEntry, indexOfLastEntry);
  const completedDemos = filteredDemos?.filter((demo) => demo?.completed);
  const incompleteDemos = filteredDemos?.filter((demo) => !demo?.completed);
  // Handle pagination controls
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handleEntriesChange = (e) => {
    setEntriesPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Reset to first page on entries change
  };

  const totalPages = Math.ceil(incompleteDemos?.length / entriesPerPage);



  const handleOpenModal = (data) => {
    setModalData(data);
    document.getElementById("my_modal_33")?.showModal();
  };
  const dispatch = useDispatch();
  const handleDemoDeleting = async (
    id,
    project,
    date,
    demoInfo,
    farmersInfo
  ) => {
    if (!id) {
      return toast.error(
        "প্রদর্শনীর id পাওয়া যায়নি। দয়া করে সংশ্লিষ্ট ব্যক্তিকে অবহিত করুন"
      );
    }
    if (navigator.onLine) {
      if (
        window.confirm(
          `আপনি কি ${project} প্রকল্পের ${date?.season}/${date.fiscalYear} মৌসুমের ${demoInfo?.tech} প্রযুক্তির ${demoInfo?.crop} প্রদর্শনীপ্রাপ্ত ${farmersInfo?.name} কৃষকের তথ্য মুছে ফেলতে চান ?`
        )
      ) {
        try {
          const result = await deleteUserDemo(id);
          if (result?.status === 200) {
            toast.success(result?.data?.message);
            dispatch(daeAction.setRefetch());
          }
        } catch (err) {
          toast.error();
          console.log(err);
        }
      }
    } else {
      makeSureOnline();
    }
  };

  const filterProjects = () => {
    let filtered = userData?.demos;

    if (selectedProject !== "") {
      filtered = filtered.filter((project) =>
        project.projectInfo.full.includes(selectedProject)
      );
    }

    if (fiscalYear !== "") {
      filtered = filtered.filter((project) =>
        project.demoTime.fiscalYear.includes(fiscalYear)
      );
    }

    if (season !== "") {
      filtered = filtered.filter((project) =>
        project.demoTime.season.includes(season)
      );
    }

    return filtered; // Return the filtered projects
  };

  // Call filterProjects inside the useEffect hook to update filteredProjects state
  useEffect(() => {
    const filtered = filterProjects();
    setFilteredDemos(filtered);
  }, [selectedProject, fiscalYear, season]);

  const handleSelectChange = (e) => {
    setSelectedProject(e.target.value);
  };

  // make the function to search accordingly all filed and call the function in each change
  useEffect(() => {
    // Filter data whenever the search input changes
    const filtered = userData?.demos.filter((item) => {
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
    setFilteredDemos(filtered); // Update filtered data
  }, [search]);
  return (
    <>
      <div className="py-10 ">
        <div className="mt-4 overflow-x-scroll">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <AddModuleButton
              link={"addDemo"}
              btnText={"প্রদর্শনী যুক্ত করুন"}
            />

            <SectionTitle
              title={`চলমান প্রদর্শনী (${toBengaliNumber(
                incompleteDemos?.length
              )})`}
            />
            <div className="flex pb-6 pt-3 flex-wrap md:flex-wrap lg:flex-wrap xl:flex-nowrap  gap-3">
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
            <div className="border rounded-lg shadow overflow-hidden dark:border-gray-700 dark:shadow-gray-900">
              {currentEntries?.length > 0 && (
                <table className="min-w-full bg-white  divide-y divide-gray-200 dark:divide-gray-700">
                  <thead>
                    <tr className="divide-x font-extrabold divide-gray-200 dark:divide-gray-700">
                      <th
                        scope="col"
                        className="py-4 font-extrabold px-2  text-black text-center uppercase"
                      >
                        ক্র: নং:
                      </th>
                      <th
                        scope="col"
                        className="py-4 font-extrabold px-2  text-black text-center uppercase"
                      >
                        প্রকল্প
                      </th>
                      <th
                        scope="col"
                        className="py-4 font-extrabold px-2  text-black text-center uppercase"
                      >
                        প্রদর্শনী সম্পর্কিত
                      </th>
                      <th
                        scope="col"
                        className="py-4 font-extrabold px-2  text-black text-center uppercase"
                      >
                        অর্থবছর ও মৌসুম
                      </th>
                      <th
                        scope="col"
                        className="py-4 font-extrabold px-2  text-black text-center uppercase"
                      >
                        কৃষকের নাম ও পিতার নাম
                      </th>
                      <th
                        scope="col"
                        className="py-4 font-extrabold px-2  text-black text-center uppercase"
                      >
                        ঠিকানা
                      </th>
                      <th
                        scope="col"
                        className="py-4 whitespace-nowrap font-extrabold px-2  text-black text-center uppercase"
                      >
                        মোবাইল, এনআইডি,
                        <br /> কৃষি কার্ড, বিআইডি
                      </th>
                      <th
                        scope="col"
                        className="py-4 font-extrabold px-2  text-black text-center uppercase"
                      >
                        বপন, রোপন ও কর্তন
                      </th>
                      <th
                        scope="col"
                        className="py-4 font-extrabold px-2  text-black text-center uppercase"
                      >
                        উৎপাদন সংক্রান্ত
                      </th>
                      <th
                        scope="col"
                        className="py-4 font-extrabold px-2  text-black text-center uppercase"
                      >
                        ভিজিট সংক্রান্ত
                      </th>
                      <th
                        scope="col"
                        className="py-4 font-extrabold px-2  text-black text-center uppercase"
                      >
                        মন্তব্য
                      </th>
                      <th
                        scope="col"
                        className=" py-4 font-extrabold px-2  text-black text-center uppercase"
                      >
                        SAAO-এর নাম ও মোবাইল নং
                      </th>
                      <th
                        scope="col"
                        className="py-4 font-extrabold px-2  text-black text-center uppercase"
                      >
                        একশন
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {endFetch &&
                      incompleteDemos?.length > 0 &&
                      incompleteDemos?.map((single, index) => (
                        <UserSingleDemoTableRow
                          handleDemoDeleting={handleDemoDeleting}
                          data={single}
                          index={index}
                          key={single?._id}
                          handleOpenModal={handleOpenModal}
                        />
                      ))}
                  </tbody>
                </table>
              )}
              {endFetch && incompleteDemos?.length < 1 && (
                <NoContentFound
                  text={"কোনো চলমান প্রদর্শনীর তথ্য পাওয়া যায়নি!!"}
                />
              )}
            </div>
            <div>
              <span>প্রতি পৃষ্ঠায়:</span>
              <select className="ml-2 border rounded" value={entriesPerPage} onChange={handleEntriesChange}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={filteredDemos?.length}>সব</option>
              </select>
            </div>
            <div>
              <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>&laquo; পূর্ববর্তী</button>
              <span className="mx-2">পৃষ্ঠা {currentPage} / {totalPages}</span>
              <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>পরবর্তী &raquo;</button>
            </div>



            <div className="mt-20">
              <SectionTitle
                title={`চূড়ান্ত প্রদর্শনী (${toBengaliNumber(
                  completedDemos?.length
                )})`}
              />
              <div className="border rounded-lg shadow overflow-hidden dark:border-gray-700 dark:shadow-gray-900">
                {completedDemos?.length > 0 && (
                  <table className="min-w-full bg-white divide-y divide-gray-200 dark:divide-gray-700">
                    <thead>
                      <tr className="divide-x font-extrabold divide-gray-200 dark:divide-gray-700">
                        <th
                          scope="col"
                          className="py-4 font-extrabold px-2  text-black text-center uppercase"
                        >
                          ক্র: নং:
                        </th>
                        <th
                          scope="col"
                          className="py-4 font-extrabold px-2  text-black text-center uppercase"
                        >
                          প্রকল্প
                        </th>
                        <th
                          scope="col"
                          className="py-4 font-extrabold px-2  text-black text-center uppercase"
                        >
                          প্রদর্শনী সম্পর্কিত
                        </th>
                        <th
                          scope="col"
                          className="py-4 font-extrabold px-2  text-black text-center uppercase"
                        >
                          অর্থবছর ও মৌসুম
                        </th>
                        <th
                          scope="col"
                          className="py-4 font-extrabold px-2  text-black text-center uppercase"
                        >
                          কৃষকের নাম ও পিতার নাম
                        </th>
                        <th
                          scope="col"
                          className="py-4 font-extrabold px-2  text-black text-center uppercase"
                        >
                          ঠিকানা
                        </th>
                        <th
                          scope="col"
                          className="py-4 whitespace-nowrap font-extrabold px-2  text-black text-center uppercase"
                        >
                          মোবাইল, এনআইডি,
                          <br /> কৃষি কার্ড, বিআইডি
                        </th>
                        <th
                          scope="col"
                          className="py-4 font-extrabold px-2  text-black text-center uppercase"
                        >
                          বপন, রোপন ও কর্তন
                        </th>
                        <th
                          scope="col"
                          className="py-4 font-extrabold px-2  text-black text-center uppercase"
                        >
                          উৎপাদন সংক্রান্ত
                        </th>
                        <th
                          scope="col"
                          className="py-4 font-extrabold px-2  text-black text-center uppercase"
                        >
                          ভিজিট সংক্রান্ত
                        </th>
                        <th
                          scope="col"
                          className="py-4 font-extrabold px-2  text-black text-center uppercase"
                        >
                          মন্তব্য
                        </th>
                        <th
                          scope="col"
                          className=" py-4 font-extrabold px-2  text-black text-center uppercase"
                        >
                          SAAO-এর নাম ও মোবাইল নং
                        </th>
                        <th
                          scope="col"
                          className="py-4 font-extrabold px-2  text-black text-center uppercase"
                        >
                          একশন
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {endFetch &&
                        completedDemos?.length > 0 &&
                        completedDemos?.map((single, index) => (
                          <UserSingleDemoTableRow
                            handleDemoDeleting={handleDemoDeleting}
                            data={single}
                            index={index}
                            key={single?._id}
                            handleOpenModal={handleOpenModal}
                          />
                        ))}
                    </tbody>
                  </table>
                )}
                {endFetch && completedDemos?.length < 1 && (
                  <NoContentFound
                    text={"কোনো চূড়ান্ত প্রদর্শনীর তথ্য পাওয়া যায়নি!!"}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div >


      {modalData && <MarkDemoCompleteModal data={modalData} />
      }
    </>
  );
};

export default UserPrimaryDemos;
