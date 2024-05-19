import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useSelector } from "react-redux";
import { GoNote, GoProject } from "react-icons/go";
import DashboardCard from "../../../shared/DashboardCard";
import { FaUser } from "react-icons/fa";
import { GiDiscussion } from "react-icons/gi";
import { GrCheckboxSelected } from "react-icons/gr";
import { AiOutlineFileDone } from "react-icons/ai";
import { MdAgriculture, MdTour } from "react-icons/md";

const AdminDashboard = () => {
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
        uv: notes?.filter(
          (single2) => single2?.purpose.target === single && !single2?.completed
        ).length,
        pv: notes?.filter(
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

  const data5 = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  return (
    <section className="py-5">
      <div className="grid grid-cols-3 gap-5 justify-center items-center">
        <div className="grid bg-white p-4 col-span-2 rounded-xl grid-cols-3 gap-3">
          {cards.map((card, index) => (
            <DashboardCard key={index} {...card} />
          ))}
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data5}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            barSize={20}
          >
            <XAxis
              dataKey="name"
              scale="point"
              padding={{ left: 10, right: 10 }}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="pv" fill="#8884d8" background={{ fill: "#eee" }} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="h-80 mt-8">
        <ResponsiveContainer
          className={"bg-white p-3 rounded-xl"}
          width="100%"
          height="100%"
        >
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
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
            <Bar
              dataKey="uv"
              fill="#ede18b"
              activeBar={<Rectangle fill="pink" stroke="blue" />}
            />
            <Bar
              dataKey="pv"
              fill="#69d586"
              activeBar={<Rectangle fill="gold" stroke="purple" />}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default AdminDashboard;
