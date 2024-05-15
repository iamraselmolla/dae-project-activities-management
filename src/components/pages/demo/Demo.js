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
import FiscalYear from "../../shared/FiscalYear";
import Season from "../../shared/Season";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { SiMicrosoftexcel } from "react-icons/si";
import SectionTitle from "../../shared/SectionTitle";
import { useSelector } from "react-redux";

const Demo = () => {
  const [demos, setDemos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchEnd, setFetchEnd] = useState(false);
  const [allProject, setAllProjects] = useState([]);
  const { user } = useContext(AuthContext);
  const { blockAndUnions } = useSelector(state => state.dae)
  const [allUnion, setAllUnion] = useState([])
  const [selectedProject, setSelectedProject] = useState("");
  const [fiscalYear, setFiscalYear] = useState("");
  const [season, setSeason] = useState("");
  const [unionName, setUnionName] = useState("");
  const [blockName, setBlockName] = useState("");
  const [search, setSearch] = useState("");
  const [filteredProjects, setFilteredProjects] = useState(demos);
  const [blocksOfUnion, setBlocksOfUnion] = useState([])

  useEffect(() => {
    const checkUnion = []
    blockAndUnions?.map(single => (checkUnion.includes(single?.unionB)) ? '' : checkUnion.push(single?.unionB))
    setAllUnion(checkUnion)
  }, [blockAndUnions]);

  useEffect(() => {
    const fetchAllDemos = async () => {
      setLoading(true);
      try {
        const result = await getAllDemos();
        if (result?.status === 200) {
          setDemos(result.data?.data);
          setFilteredProjects(result.data?.data);
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



  // make the function to search accordingly selected filed's each changes
  const filterProjects = () => {
    let filtered = demos;

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

    if (unionName !== "") {
      filtered = filtered.filter((project) =>
        project.address.union.includes(unionName)
      );
    }

    if (blockName !== "") {
      filtered = filtered.filter((project) =>
        project.address.block.includes(blockName)
      );
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

  // make the function to search accordingly all filed and call the function in each change
  useEffect(() => {
    // Filter data whenever the search input changes
    const filtered = demos.filter((item) => {
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
    setFilteredProjects(filtered); // Update filtered data
  }, [search]);

  const handleUnionAndBlockSelection = (e) => {
    const selectedUnion = e.target.value;
    setUnionName(selectedUnion);

    // Find the blocks under the selected union
    const result = blockAndUnions?.filter((single) => single?.unionB === selectedUnion);
    const blocks = result?.map((single) => single?.blockB); // Assuming result contains an array of objects with 'blockB' property

    // Update the state with the blocks of the selected union
    setBlocksOfUnion(blocks);
  };


  // Function to export filtered data to Excel
  const handleToExportInToExcel = () => {
    const data = filteredProjects.map((project) => {
      return [
        project.projectInfo.full,
        project.projectInfo.short,
        project.demoTime.fiscalYear,
        project.demoTime.season,
        project.farmersInfo.name,
        project.farmersInfo.fatherOrHusbandName,
        project.numbersInfo.NID,
        project.numbersInfo.BID,
        project.numbersInfo.mobile,
        project.address.village,
        project.address.block,
        project.address.union,
        project.comment.farmersReview,
        project.comment.overallComment,
        project.completed,
        project.createdAt,
        project.updatedAt,
        project.demoDate.bopon,
        project.demoDate.ropon,
        project.demoDate.korton.startDate,
        project.demoDate.korton.endDate,
        project.demoImages.map((image) => image.image.join(", ")).join("; "),
        project.demoImages.map((image) => image.date).join("; "),
        project.demoImages.map((image) => image.presentCondition).join("; "),
        project.demoImages.map((image) => image.presentOfficer).join("; "),
        project.demoInfo.tech,
        project.demoInfo.crop,
        project.demoInfo.variety,
        project.production.productionPerHector,
        project.production.totalProduction,
        project.production.sidePlotProduction,
      ];
    });

    const worksheet = XLSX.utils.aoa_to_sheet([
      [
        "Project Full Name",
        "Project Short Name",
        "Fiscal Year",
        "Season",
        "Farmer Name",
        "Father/Husband Name",
        "NID",
        "BID",
        "Mobile",
        "Village",
        "Block",
        "Union",
        "Farmer's Review",
        "Overall Comment",
        "Completed",
        "Created At",
        "Updated At",
        "Demo Bopon",
        "Demo Ropon",
        "Demo Korton Start Date",
        "Demo Korton End Date",
        "Demo Image URLs",
        "Demo Image Dates",
        "Demo Image Present Condition",
        "Demo Image Present Officer",
        "Demo Tech",
        "Demo Crop",
        "Demo Variety",
        "Production Per Hector",
        "Total Production",
        "Side Plot Production",
      ],
      ...data,
    ]);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Filtered Projects");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const dataBlob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(dataBlob, `projects.xlsx`);
  };

  return (
    <section className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div className="text-right font-extrabold col-span-1">
        <AddModuleButton link={"addDemo"} btnText={"প্রদর্শনী যুক্ত করুন"} />
      </div>
      {user && (
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

          <div>
            <label className="font-extrabold mb-1 block">ইউনিয়নের নাম</label>
            <select
              className="input input-bordered w-full"
              value={unionName}
              onChange={handleUnionAndBlockSelection}
            >
              <option key={'kdsfkd'} value=''>ইউনিয়ন</option>
              {allUnion?.map(single => <option key={single}>{single}</option>)}
            </select>
          </div>

          <div>
            <label className="font-extrabold mb-1 block">ব্লকের নাম</label>
            <select
              className="input input-bordered w-full"
              value={blockName}
              onChange={(e) => setBlockName(e.target.value)}
            >
              <option value="">ব্লক সিলেক্ট করুন</option>
              {blocksOfUnion?.map((single, index) => (
                <option key={index} value={single}>{single}</option>
              ))}
            </select>
          </div>


          <div>
            <label className="font-extrabold mb-1 block">অনুসন্ধান</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="অনুসন্ধান লিখুন"
            />
          </div>
          <div>
            <SiMicrosoftexcel
              color="green"
              size={50}
              cursor={'pointer'}
              onClick={handleToExportInToExcel}
            />
          </div>
        </div>
      )}

      <SectionTitle title={"সকল প্রদর্শনী"} />
      <div className="container px-4 md:px-0 grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-3 mt-10">
        {!loading &&
          fetchEnd &&
          filteredProjects?.length > 0 &&
          filteredProjects?.map((demo) => (
            <SingleDemo key={demo?._id} data={demo} />
          ))}
      </div>
      {!loading && fetchEnd && filteredProjects?.length < 1 && (
        <NoContentFound text={"কোনো প্রদর্শনীর তথ্য পাওয়া যায়নি!"} />
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
