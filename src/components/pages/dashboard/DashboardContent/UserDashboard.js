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
import { seasonsArr } from '../../../shared/MessageConst';

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


  const data = seasonsArr.map(season => {
    const seasonDemos = demos?.filter(single => single?.demoTime?.season === season && single?.demoTime?.fiscalYear === runningFiscalYear);
    const completedCount = seasonDemos?.filter(single => single?.completed).length;
    const incompleteCount = seasonDemos?.filter(single => !single?.completed).length;

    return {
      name: season,
      completed: completedCount || 0,
      incomplete: incompleteCount || 0,
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
      uv: projectDemos || 0,
      pv: projectDemos || 0,
      amt: 2400,
    };
  })

  // All demos based on every fiscal Year
  const allFiscalYearSetMap = new Set();
  demos?.forEach(single => {
    allFiscalYearSetMap.add(single?.demoTime?.fiscalYear);
  });
  const fiscalYearArrMap = Array.from(allFiscalYearSetMap);
  const fiscalYearData = fiscalYearArrMap?.map(single => {
    const fiscalYearDemos = demos?.filter(singleDemo => singleDemo?.demoTime?.fiscalYear === single).length;
    return {
      name: single,
      uv: fiscalYearDemos || 0,
      pv: fiscalYearDemos || 0,
      amt: 2400,
    };
  })
  const demosBasedOnFiscalYear = demos?.filter(single => single?.demoTime?.fiscalYear === runningFiscalYear);
  return (
    <section className="py-5">
      <div className="grid grid-cols-3 gap-5 justify-center items-center">
        <div className="grid bg-white px-4 py-6 col-span-2 rounded-xl grid-cols-3 gap-3">
          {cards.map((card, index) => (
            <DashboardCard key={index} {...card} />
          ))}
        </div>
        {/* Running Year Fiscal Year Demos statics */}
        <div className='h-96 py-6  bg-white rounded-lg'>
          <div className='w-full h-full'>
            <ResponsiveContainer width="100%" height="100%">
              <h2 className='text-md font-semibold text-center'>{toBengaliNumber(getFiscalYear())} অর্থবছরের প্রদর্শনী (প্রাথমিক ও চূড়ান্ত)</h2>
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
                <Bar dataKey="completed" stackId="a" fill="#00ca92" />
                <Bar dataKey="incomplete" stackId="a" fill="#8884d8" />

              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* User All Projects statics */}
      <div className="mt-10 max-h-96 bg-white py-6 rounded-lg">
        <h2 className='text-md font-semibold text-center'>সকল প্রকল্পের প্রদর্শনীর তথ্য</h2>
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

      {/* Demos information Based on Fiscal Year */}
      <div className="grid grid-cols-2 mt-10 rounded-lg gap-5 justify-center items-center">
        <div className='h-96 py-6  bg-white rounded-lg'>
          <div className='w-full h-full'>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart
                width={500}
                height={200}
                data={fiscalYearData}
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
                <Line connectNulls type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserDashboard;
