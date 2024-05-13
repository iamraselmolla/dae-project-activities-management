import React, { useContext, useEffect, useState } from "react";
import SingleDemo from "./SingleDemo";
import { Link } from "react-router-dom";
import { makeSureOnline } from "../../shared/MessageConst";
import toast from "react-hot-toast";
import { getAllDemos, getAllProjects } from "../../../services/userServices";
import Loader from "../../shared/Loader";
import { AuthContext } from "../../AuthContext/AuthProvider";
import AddModuleButton from "../../shared/AddModuleButton";
import NoContentFound from "../../shared/NoContentFound";
import getFiscalYear from "../../shared/commonDataStores";
import { toBengaliNumber } from "bengali-number";
import FiscalYear from "../../shared/FiscalYear";
import Season from "../../shared/Season";

const Demo = () => {
  const [demos, setDemos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchEnd, setFetchEnd] = useState(false);
  const [allProject, setAllProjects] = useState([]);
  const { user } = useContext(AuthContext)
  useEffect(() => {
    const fetchAllDemos = async () => {
      setLoading(true);
      try {
        const result = await getAllDemos();
        if (result?.status === 200) {
          setDemos(result.data?.data);
          setFilteredProjects(result.data?.data)
          setLoading(false);
          setFetchEnd(true);
        }
      } catch (err) {
        toast.error(
          "প্রদর্শনীর তথ্য ডাটাবেজ থেকে আনতে সমস্যা হয়েছে। দয়া করে সংশ্লিষ্ট কর্তৃপক্ষকে অবহিত করুন"
        );
        setLoading(false);
        setFetchEnd(true);
      }
    };
    if (navigator.onLine) {
      fetchAllDemos();
    } else {
      makeSureOnline();
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllProjects();
        if (result?.data?.success) {
          setAllProjects(result.data.data);
        } else {
          setAllProjects([]);
          toast.error("প্রকল্পের তথ্য পাওয়া যায়নি");
        }
      } catch (error) {
        console.error("প্রকল্পের তথ্যের সমস্যা:", error);
        toast.error(
          "প্রকল্পের তথ্য সার্ভার থেকে আনতে অসুবিধার সৃষ্টি হয়েছে। পুনরায় রিলোড করেন অথবা সংশ্লিষ্ট কর্তৃপক্ষকে অবহিত করুন"
        );
      }
    };

    if (navigator.onLine) {
      fetchData();
    } else {
      makeSureOnline();
    }
  }, []);


  const [selectedProject, setSelectedProject] = useState('');
  const [fiscalYear, setFiscalYear] = useState('');
  const [season, setSeason] = useState('');
  const [unionName, setUnionName] = useState('');
  const [blockName, setBlockName] = useState('');
  const [filteredProjects, setFilteredProjects] = useState(demos);

  // Filter function
  // Filter function
  const filterProjects = () => {
    let filtered = demos;

    if (selectedProject !== '') {
      filtered = filtered.filter(project => project.projectInfo.full.includes(selectedProject));
    }

    if (fiscalYear !== '') {
      filtered = filtered.filter(project => project.demoTime.fiscalYear.includes(fiscalYear));
    }

    if (season !== '') {
      filtered = filtered.filter(project => project.demoTime.season.includes(season));
    }

    if (unionName !== '') {
      filtered = filtered.filter(project => project.address.union.includes(unionName));
    }

    if (blockName !== '') {
      filtered = filtered.filter(project => project.address.block.includes(blockName));
    }

    return filtered; // Return the filtered projects
  };


  // Call filterProjects inside the useEffect hook to update filteredProjects state
  useEffect(() => {
    const filtered = filterProjects();
    setFilteredProjects(filtered);
  }, [selectedProject, fiscalYear, season, unionName, blockName]);

  const handleSelectChange = (e) => {
    setSelectedProject(e.target.value);
  };

  console.log(filteredProjects)

  return (
    <section className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      {user &&
        <div className="grid grid-cols-4 mb-10">
          <div className="col-span-3">
            <div className="flex justify-between items-center gap-3">

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
                  {allProject.map((project) => (
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
                <input
                  className="input input-bordered w-full"
                  type="text"
                  value={fiscalYear}
                  onChange={(e) => setFiscalYear(e.target.value)}
                  placeholder="অর্থবছর সিলেক্ট করুন"
                >
                </input>
              </div>
            </div>

            <div className="flex justify-between items-center gap-3 mt-3">
              <div>
                <label className="font-extrabold mb-1 block">মৌসুম</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={season}
                  onChange={(e) => setSeason(e.target.value)}
                  placeholder="মৌসুম লিখুন"
                />
              </div>

              <div>
                <label className="font-extrabold mb-1 block">ইউনিয়নের নাম</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={unionName}
                  onChange={(e) => setUnionName(e.target.value)}
                  placeholder="ইউনিয়নের নাম লিখুন"
                />
              </div>

              <div>
                <label className="font-extrabold mb-1 block">ব্লকের নাম</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={blockName}
                  onChange={(e) => setBlockName(e.target.value)}
                  placeholder="ব্লকের নাম লিখুন"
                />
              </div>
            </div>
          </div>

          <div className="text-right font-extrabold col-span-1">
            <AddModuleButton link={'addDemo'} btnText={'প্রদর্শনী যুক্ত করুন'} />
          </div>
        </div>
      }

      <div className="container px-4 md:px-0 grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-3 mt-10">
        {!loading &&
          fetchEnd &&
          filteredProjects?.length > 0 &&
          filteredProjects?.map((demo) => <SingleDemo key={demo?._id} data={demo} />)}
      </div>
      {!loading && fetchEnd && filteredProjects?.length < 1 && (
        <NoContentFound text={'কোনো প্রদর্শনীর তথ্য পাওয়া যায়নি!'} />
      )}
      {!fetchEnd && loading && (
        <div className="py-20">
          <div className="fixed daeLoader">
            <Loader />
            <h2 className="text-green-600 mt-3 text-4xl">
              তথ্য আনা হচ্ছে। দয়া করে অপেক্ষা করুন
            </h2>
          </div>
        </div>
      )}
    </section>
  );
};

export default Demo;
