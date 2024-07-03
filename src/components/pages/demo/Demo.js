// src/Demo.js
import React, { useContext, useEffect, useState } from "react";
import SingleDemo from "./SingleDemo";
import { Link } from "react-router-dom";
import { makeSureOnline } from "../../shared/MessageConst";
import toast from "react-hot-toast";
import { getAllDemos } from "../../../services/userServices";
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
import getFiscalYear from "../../shared/commonDataStores";
import { toBengaliNumber } from "bengali-number";
import LoaderWithOutDynamicMessage from "../../shared/LoaderWithOutDynamicMessage";


const Demo = () => {
  const { projects: allProject } = useSelector((state) => state.dae);
  const [demos, setDemos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchEnd, setFetchEnd] = useState(false);
  const { user } = useContext(AuthContext);
  const { blockAndUnions } = useSelector((state) => state.dae);
  const [allUnion, setAllUnion] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [fiscalYear, setFiscalYear] = useState("");
  const [season, setSeason] = useState("");
  const [unionName, setUnionName] = useState("");
  const [blockName, setBlockName] = useState("");
  const [search, setSearch] = useState("");
  const [filteredProjects, setFilteredProjects] = useState(demos);
  const [blocksOfUnion, setBlocksOfUnion] = useState([]);

  useEffect(() => {
    const checkUnion = [];
    blockAndUnions?.map((single) =>
      checkUnion.includes(single?.unionB) ? "" : checkUnion.push(single?.unionB)
    );
    setAllUnion(checkUnion);
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

    return filtered;
  };

  useEffect(() => {
    const filtered = filterProjects();
    setFilteredProjects(filtered);
  }, [selectedProject, fiscalYear, season, unionName, blockName]);

  const handleSelectChange = (e) => {
    setSelectedProject(e.target.value);
  };

  useEffect(() => {
    const filtered = demos.filter((item) => {
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
    setFilteredProjects(filtered);
  }, [search]);

  const handleUnionAndBlockSelection = (e) => {
    const selectedUnion = e.target.value;
    setUnionName(selectedUnion);

    const result = blockAndUnions?.filter(
      (single) => single?.unionB === selectedUnion
    );
    const blocks = result?.map((single) => single?.blockB);

    setBlocksOfUnion(blocks);
  };

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
        project.demoDate.bopon,
        project.demoDate.ropon,
        project.demoDate.korton.startDate
          ? project.demoDate.korton.startDate +
          " - " +
          project.demoDate.korton.endDate
          : "এখনো কর্তন হয়নি।",
        project.demoInfo.tech,
        project.demoInfo.crop,
        project.demoInfo.variety,
        project.production.productionPerHector,
        project.production.totalProduction,
        project.production.sidePlotProduction,
        project?.SAAO?.name + " - " + project?.SAAO?.mobile,
      ];
    });

    const worksheet = XLSX.utils.aoa_to_sheet([
      [
        "প্রকল্পের পুরো নাম",
        "প্রকল্পের সংক্ষেপ",
        "অর্থবছর",
        "মৌসুম",
        "কৃষক/কৃষাণীর নাম",
        "পিতা/স্বামীর নাম",
        "জাতীয় পরিচয়পত্র নং",
        "BID",
        "মোবাইল নং",
        "গ্রাম",
        "ব্লক",
        "ইউনিয়ন",
        "বপণ",
        "রোপণ",
        "কর্তন",
        "প্রযুক্তি",
        "ফসল",
        "জাত",
        "ফলন (মেঃটন/হেঃ)",
        "প্রদর্শনীতে ফলন",
        "কন্ট্রোল প্লটে ফলন (মেঃটন/হেঃ)",
        "উপসহকারী কৃষি কর্মকর্তার নাম ও মোবাইল নং",
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
    saveAs(dataBlob, `${user?.block} ${getFiscalYear()}.xlsx`);
  };
  return (
    <section className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div className="text-right font-extrabold col-span-1">
        <SectionTitle
          title={`সকল প্রদর্শনী (${toBengaliNumber(filteredProjects?.length)})`}
        />
      </div>
      {user && (
        <>
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

            <div>
              <label className="font-extrabold mb-1 block">ইউনিয়নের নাম</label>
              <select
                className="input input-bordered w-full"
                value={unionName}
                onChange={handleUnionAndBlockSelection}
              >
                <option key={"kdsfkd"} value="">
                  ইউনিয়ন
                </option>
                {allUnion?.map((single) => (
                  <option key={single}>{single}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-extrabold mb-1 block">ব্লকের নাম</label>
              <select
                className="input input-bordered w-full"
                value={blockName}
                onChange={(e) => setBlockName(e.target.value)}
              >
                <option value="">সিলেক্ট করুন</option>
                {blocksOfUnion?.map((single, index) => (
                  <option key={index} value={single}>
                    {single}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex mb-12 items-center justify-center gap-4">
            <div className="w-full">
              <input
                type="text"
                className="input input-bordered w-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="খুজুন (নাম, পিতার নাম, মোবাইল নং, NID, BID, কৃষিকার্ড, প্রকল্পের নাম, প্রযুক্তি, ফসল)"
              />
            </div>
            <div>
              <SiMicrosoftexcel
                color="green"
                size={50}
                cursor={"pointer"}
                onClick={handleToExportInToExcel}
              />
            </div>

          </div>
        </>
      )}

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
        <LoaderWithOutDynamicMessage />
      )}
      <AddModuleButton link={"addDemo"} btnText={"প্রদর্শনী যুক্ত করুন"} />
    </section>
  );
};

export default Demo;
