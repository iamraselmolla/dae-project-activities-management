// AdminDashboard.js
import React, { PureComponent } from "react";
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

const AdminDashboard = () => {
  const { projects, users, trainings, notes } = useSelector(
    (state) => state.dae
  );
  const runningProjects = projects?.filter((single) => !single.end).length;
  const completedNotes = notes?.filter((single) => single.completed).length;

  const cards = [
    {
      icon: <GoProject />,
      count: runningProjects,
      text: "চলমান প্রকল্প",
      backgroundColor: "#ffe2e6",
    },
    {
      icon: <GrCheckboxSelected />,
      count: projects?.length - runningProjects,
      text: "সম্পন্ন প্রকল্প",
      backgroundColor: "#fff4de",
    },
    {
      icon: <FaUser />,
      count: users?.length - 1,
      text: "ইউজার",
      backgroundColor: "#dcfce7",
    },
    {
      icon: <GiDiscussion />,
      count: trainings?.length,
      text: "প্রশিক্ষণ",
      backgroundColor: "#f4e8ff",
    },
    {
      icon: <GoNote />,
      count: notes?.length - completedNotes,
      text: "অসম্পন্ন নোটস",
      backgroundColor: "#a9cded59",
    },
    {
      icon: <AiOutlineFileDone />,
      count: completedNotes,
      text: "সম্পন্ন নোটস",
      backgroundColor: "#c4ff8b80",
    },
    // Add more cards as needed
  ];
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
  ];

  const notesType = notes?.every((single) => single.purpose);
  console.log(notes);

  return (
    <section className="py-5">
      <div className="grid grid-cols-2 gap-5 justify-center items-center">
        <div className="grid bg-white p-4 rounded-xl grid-cols-3 gap-3">
          {cards.map((card, index) => (
            <DashboardCard key={index} {...card} />
          ))}
        </div>
        <ResponsiveContainer width="100%" height="100%">
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
              dataKey="pv"
              fill="#8884d8"
              activeBar={<Rectangle fill="pink" stroke="blue" />}
            />
            <Bar
              dataKey="uv"
              fill="#82ca9d"
              activeBar={<Rectangle fill="gold" stroke="purple" />}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default AdminDashboard;
