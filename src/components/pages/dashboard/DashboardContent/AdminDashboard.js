import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
  LineChart,
  AreaChart,
  Area,
} from "recharts";
import { useSelector } from "react-redux";
import { GoNote, GoProject } from "react-icons/go";
import DashboardCard from "../../../shared/DashboardCard";
import { FaUser } from "react-icons/fa";
import { GiDiscussion } from "react-icons/gi";
import { GrCheckboxSelected } from "react-icons/gr";
import { AiOutlineFileDone } from "react-icons/ai";
import { MdAgriculture, MdTour } from "react-icons/md";
import { toBengaliNumber } from "bengali-number";
import getFiscalYear from '../../../shared/commonDataStores';
import { seasonsArr } from "../../../shared/MessageConst";

const AdminDashboard = () => {
  const runningFiscalYear = toBengaliNumber(getFiscalYear());
  const { projects, users, trainings, notes, tours, distributions } =
    useSelector((state) => state.dae);
  const [data, setData] = useState([]);
  const [noteTypes, setNoteTypes] = useState([]);

  useEffect(() => {
    const uniqueNoteTypes = new Set();
    notes.forEach((note) => {
      if (note.purpose && note.purpose.target) {
        uniqueNoteTypes.add(note.purpose.target);
      }
    });
    const uniqueNoteTypesArray = Array.from(uniqueNoteTypes);
    setNoteTypes(uniqueNoteTypesArray);
  }, [notes]);

  useEffect(() => {
    if (noteTypes.length > 0) {
      const newData = noteTypes?.map((single) => ({
        name: single,
        incomplete: notes?.filter(
          (single2) => single2?.purpose.target === single && !single2?.completed
        ).length,
        completed: notes?.filter(
          (single2) => single2?.purpose.target === single && single2?.completed
        ).length,
        amt: 2400,
      }));
      setData(newData);
    }
  }, [noteTypes]);

  const runningProjects = projects?.filter((single) => !single.end).length;
  const completedNotes = notes?.filter((single) => single.completed).length;

  const cards = [
    {
      icon: <GoProject />,
      count: runningProjects,
      text: "চলমান প্রকল্প",
      backgroundColor: "#ffe2e6", // Light pink
    },
    {
      icon: <GrCheckboxSelected />,
      count: projects?.length - runningProjects,
      text: "সম্পন্ন প্রকল্প",
      backgroundColor: "#fff4de", // Light yellow
    },
    {
      icon: <FaUser />,
      count: users?.length - 1,
      text: "ইউজার",
      backgroundColor: "#dcfce7", // Light green
    },
    {
      icon: <GiDiscussion />,
      count: trainings?.length,
      text: "প্রশিক্ষণ",
      backgroundColor: "#f4e8ff", // Light purple
    },
    {
      icon: <GoNote />,
      count: notes?.length - completedNotes,
      text: "অসম্পন্ন নোটস",
      backgroundColor: "#a9cded", // Light blue
    },
    {
      icon: <AiOutlineFileDone />,
      count: completedNotes,
      text: "সম্পন্ন নোটস",
      backgroundColor: "#c4ff8b", // Light green
    },
    {
      icon: <MdTour />,
      count: tours?.length,
      text: "উদ্বুদ্ধকরণ ভ্রমণ",
      backgroundColor: "#ffdbdb", // Light red
    },
    {
      icon: <MdAgriculture />,
      count: distributions?.length,
      text: "উপকরণ বিতরণ",
      backgroundColor: "#fde2a8", // Light orange
    },
    {
      icon: <FaUser />,
      count: users?.length - 1,
      text: "ইউজার",
      backgroundColor: "#e2f6ff", // Light cyan
    },
  ];

  const allProjectsFieldDaysDataArray = seasonsArr.map(single => {
    return {
      name: single,
      uv: trainings?.filter(singleTraining => singleTraining?.season === single && singleTraining?.fiscalYear === runningFiscalYear).length,

    }
  });
  const allProjectsDistributionsDataArray = seasonsArr.map(single => {
    return {
      name: single,
      pv: distributions?.filter(singleDistribution => singleDistribution?.time.season === single && singleDistribution?.time.fiscalYear === runningFiscalYear).length,

    }
  });



  return (
    <section className="py-5">
      <div className="grid lg:grid-cols-1 md:grid-cols-1 grid-cols-1 gap-5 w-full">
        <div className="grid bg-white p-4 rounded-xl grid-cols-1 sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-3 w-full">
          {cards.map((card, index) => (
            <DashboardCard key={index} {...card} />
          ))}
        </div>
      </div>

      <div>
        <div className="h-64 pb-16 pt-4 px-2 bg-white rounded-xl">
          <h2 className="font-extrabold text-center text-xl">{toBengaliNumber(getFiscalYear())} অর্থবছরের প্রশিক্ষণ</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart
              width={500}
              height={200}
              data={allProjectsFieldDaysDataArray}
              syncId="anyId"
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" fill="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="h-64 mt-8 pb-16 pt-4 px-2 bg-white rounded-xl">
          <h2 className="font-extrabold text-center text-xl">{toBengaliNumber(getFiscalYear())} অর্থবছরের উপকরণ বিতরণ</h2>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart
              width={500}
              height={200}
              data={allProjectsDistributionsDataArray}
              syncId="anyId"
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="pv" stroke="#82ca9d" fill="#82ca9d" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="h-96 mt-12 bg-white rounded-xl">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={600}
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="completed" stackId="a" fill="#00ca92" />
            <Bar dataKey="incomplete" stackId="a" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </section>
  );
};

export default AdminDashboard;
