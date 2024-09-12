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
  LineChart,
  Line,
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
      icon: <GoProject className="text-2xl text-white" />,
      count: runningProjects,
      text: "চলমান প্রকল্প",
      backgroundColor: "#ffb3b3", // Light pink
    },
    {
      icon: <GrCheckboxSelected className="text-2xl text-white" />,
      count: projects?.length - runningProjects,
      text: "সম্পন্ন প্রকল্প",
      backgroundColor: "#ffe3b3", // Light yellow
    },
    {
      icon: <FaUser className="text-2xl text-white" />,
      count: users?.length,
      text: "ইউজার",
      backgroundColor: "#d9fbd3", // Light green
    },
    {
      icon: <GiDiscussion className="text-2xl text-white" />,
      count: trainings?.length,
      text: "প্রশিক্ষণ",
      backgroundColor: "#e2c6ff", // Light purple
    },
    {
      icon: <GoNote className="text-2xl text-white" />,
      count: notes?.length - completedNotes,
      text: "অসম্পন্ন নোটস",
      backgroundColor: "#b3d9ff", // Light blue
    },
    {
      icon: <AiOutlineFileDone className="text-2xl text-white" />,
      count: completedNotes,
      text: "সম্পন্ন নোটস",
      backgroundColor: "#d1fbd0", // Light green
    },
    {
      icon: <MdTour className="text-2xl text-white" />,
      count: tours?.length,
      text: "উদ্বুদ্ধকরণ ভ্রমণ",
      backgroundColor: "#ffb3b3", // Light red
    },
    {
      icon: <MdAgriculture className="text-2xl text-white" />,
      count: distributions?.length,
      text: "উপকরণ বিতরণ",
      backgroundColor: "#ffebcc", // Light orange
    }
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
    <section className="py-8 px-4 bg-gray-50">
      <div className="grid lg:grid-cols-1 md:grid-cols-1 grid-cols-1 gap-5 w-full mb-8">
        <div className="grid bg-white p-6 rounded-lg shadow-lg grid-cols-1 sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
          {cards.map((card, index) => (
            <DashboardCard key={index} {...card} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="font-bold text-xl text-gray-800 mb-4">
            {toBengaliNumber(getFiscalYear())} অর্থবছরের প্রশিক্ষণ
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={allProjectsFieldDaysDataArray}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="font-bold text-xl text-gray-800 mb-4">
            {toBengaliNumber(getFiscalYear())} অর্থবছরের উপকরণ বিতরণ
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={allProjectsDistributionsDataArray}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
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

      <div className="bg-white rounded-lg shadow-lg mt-12 p-4">
        <h2 className="font-bold text-xl text-gray-800 mb-4">
          নোটস
        </h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
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
