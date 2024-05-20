import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
  LineChart,
  Line,
  // XAxis,
  // YAxis,
  // CartesianGrid,
  // Tooltip,
  // Legend,
  Brush,
  AreaChart,
  Area,
  // ResponsiveContainer,
} from 'recharts';

import { useSelector } from "react-redux";
import { FaBowlRice } from "react-icons/fa6";
import { FaPeopleGroup } from "react-icons/fa6";
import { GiFarmer } from "react-icons/gi";
import { FcReadingEbook } from "react-icons/fc";
import { GoNote } from "react-icons/go";
import { AiOutlineFileDone } from "react-icons/ai";
import DashboardCard from "../../../shared/DashboardCard";
import getFiscalYear from '../../../shared/commonDataStores';
import { toBengaliNumber } from 'bengali-number';

const UserDashboard = () => {
  const {
    notes,
    userData: { demos, fieldDays, schools, daeMeetins },
  } = useSelector((state) => state.dae);
  const runningFiscalYear = toBengaliNumber(getFiscalYear());
  const completedNotes = notes?.filter((single) => single.completed).length;
  const cards = [
    {
      icon: <FaBowlRice />,
      count: demos?.length,
      text: "প্রদর্শনী",
      backgroundColor: "#ffe2e6", // Light pink
    },
    {
      icon: <FaPeopleGroup />,
      count: fieldDays?.length,
      text: "মাঠ দিবস",
      backgroundColor: "#fff4de", // Light yellow
    },
    {
      icon: <GiFarmer />,
      count: daeMeetins?.length,
      text: "কৃষক সভা",
      backgroundColor: "#dcfce7", // Light green
    },
    {
      icon: <FcReadingEbook />,
      count: schools?.length,
      text: "স্কুল",
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
  ];
  const data2 = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  const seasons = ['খরিপ-২', 'রবি', 'খরিপ-১',];

  const data = seasons.map(season => {
    const seasonDemos = demos?.filter(single => single?.demoTime?.season === season && single?.demoTime?.fiscalYear === runningFiscalYear);
    const completedCount = seasonDemos?.filter(single => single?.completed).length;
    const incompleteCount = seasonDemos?.filter(single => !single?.completed).length;

    return {
      name: season,
      uv: completedCount || 0,
      pv: incompleteCount || 0,
      amt: 2400,
    };
  });
  const allProjectsSetMap = new Set();
  demos?.forEach(single => {
    allProjectsSetMap.add(single?.projectInfo?.short);
  });
  const projectsArrMap = Array.from(allProjectsSetMap);
  const projectsData = projectsArrMap?.map(single => {
    const projectDemos = demos?.filter(singleDemo => singleDemo?.projectInfo?.short === single).length;
    return {
      name: single,
      // uv: projectDemos  || 0,
      pv: projectDemos || 0,
      amt: 2400,
    };
  })
  return (
    <section className="py-5">
      <div className="grid grid-cols-3 gap-5 justify-center items-center">
        <div className="grid bg-white p-4 col-span-2 rounded-xl grid-cols-3 gap-3">
          {cards.map((card, index) => (
            <DashboardCard key={index} {...card} />
          ))}
        </div>
        <ResponsiveContainer className={'bg-white rounded-lg'} width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
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
            <Bar label={{ position: 'top', content: ({ value }) => `${value} Custom Label` }} dataKey="pv" stackId="a" fill="#8884d8" />
            <Bar dataKey="uv" stackId="a" fill="#00ca92" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-10 bg-white py-6 rounded-lg">
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart
            width={500}
            height={200}
            data={projectsData}
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
    </section>
  );
};

export default UserDashboard;
