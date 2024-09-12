import React, { useContext, useEffect, useState } from "react";
import AddModuleButton from "../../shared/AddModuleButton";
import { AuthContext } from "../../AuthContext/AuthProvider";
import SectionTitle from "../../shared/SectionTitle";
import toast from "react-hot-toast";
import { getAllDistributions } from "../../../services/userServices";
import SingleDistribution from "./SingleDIstribution";
import { useSelector } from "react-redux";
import FiscalYear from "../../shared/FiscalYear";
import Season from "../../shared/Season";
import { toBengaliNumber } from "bengali-number";
import LoaderWithOutDynamicMessage from "../../shared/LoaderWithOutDynamicMessage";

const Distribution = () => {
  const { projects: allProject } = useSelector((state) => state.dae);
  const [allDistributions, setDistributions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const [selectedProject, setSelectedProject] = useState("");
  const [fiscalYear, setFiscalYear] = useState("");
  const [season, setSeason] = useState("");
  const [search, setSearch] = useState("");
  const [filteredDistributions, setFilteredDistributions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllDistributions();
        if (result.status === 200) {
          setDistributions(result?.data?.data);
          setFilteredDistributions(result?.data?.data);
        }
      } catch (err) {
        toast.error("সকল উপকরণ বিতরণের তথ্য আনতে অসুবিধার সৃষ্টি হচ্ছে । ");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const filterDistribution = () => {
    let filtered = allDistributions;

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
    const filtered = filterDistribution();
    setFilteredDistributions(filtered);
  }, [selectedProject, fiscalYear, season]);

  const handleSelectChange = (e) => {
    setSelectedProject(e.target.value);
  };

  useEffect(() => {
    // Filter data whenever the search input changes
    const filtered = allDistributions.filter((item) => {
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
    setFilteredDistributions(filtered); // Update filtered data
  }, [search]);

  return (
    <section className="container mx-auto px-4 py-8">
      {user && (
        <div className="text-right font-extrabold">
          <AddModuleButton
            link={"addDistribution"}
            btnText={"উপকরণ বিতরণের তথ্য যুক্ত করুন"}
          />
        </div>
      )}
      <SectionTitle
        title={`সকল উপকরণ বিতরণের তথ্য ${loading ? '' : `(${toBengaliNumber(filteredDistributions?.length)})`}`}
      />

      {user && (
        <div className="mb-12">
          <div className="flex py-6 flex-wrap justify-between items-center gap-3">
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
          <div className="w-full mb-12">
            <div>
              <input
                type="text"
                className="input input-bordered w-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="খুজুন (প্রকল্পের নাম, উপস্থিত কর্মকর্তার নাম, উপকরণের বিবরণ, অর্থবছর, মৌসুম)"
              />
            </div>
          </div>
        </div>
      )}

      {/* Display SingleDistribution components for each distribution */}
      {loading ?
        (<div className="flex justify-center items-center">
          <LoaderWithOutDynamicMessage />
        </div>)
        : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-6">
            {filteredDistributions.map((distribution, index) => (
              <SingleDistribution key={index} data={distribution} />
            ))}
          </div>
        )}

    </section>
  );
};

export default Distribution;
