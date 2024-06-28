import React, { PureComponent, useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Pie, PieChart } from 'recharts';
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
    demos, fieldDays, schools, daeMeetings,
  } = useSelector((state) => state.dae);
  const [noteTypes, setNoteTypes] = useState([]);
  const [Notedata, setData] = useState([]);

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
        incompleted: notes?.filter(
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
      count: daeMeetings?.length,
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

  const allProjectsFieldDaysDataArray = fiscalYearArrMap?.map(single => {
    const kharip1 = fieldDays?.filter(singleFieldDay => singleFieldDay?.fiscalYear === single && singleFieldDay?.season === 'খরিপ-১').length;
    const kharip2 = fieldDays?.filter(singleFieldDay => singleFieldDay?.fiscalYear === single && singleFieldDay?.season === 'খরিপ-২').length;
    const robi = fieldDays?.filter(singleFieldDay => singleFieldDay?.fiscalYear === single && singleFieldDay?.season === 'রবি').length;
    return {
      name: single,
      kharip2: kharip2 || 0,
      robi: robi || 0,
      kharip1: kharip1 || 0,
    }
  });
  return (
    <section className="py-5">
      <div className="grid  grid-cols-1 md:grid-cols-3 gap-5 justify-center items-center">
        <div className="grid bg-white px-4 py-6 col-span-2 rounded-xl md:grid-cols-2 grid-cols-2 lg:grid-cols-3 gap-3">
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
      <div className="grid gap-5 grid-cols-5">
        <div className='py-6 mt-10 pr-3 col-span-2 bg-white rounded-lg'>
          <div className='w-full h-full'>
            <h2 className='text-md font-semibold text-center'>অর্থবছর অনুযায়ী প্রদর্শনীর তথ্য</h2>

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
        <div className='col-span-3 h-80 bg-white pb-10 rounded-xl py-2 mt-10'>
          <h2 className='text-md font-semibold text-center'>অর্থবছর অনুযায়ী সকল মাঠদিবসের মৌসুম ভিত্তিক তথ্য</h2>

          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={allProjectsFieldDaysDataArray}
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
              <Bar dataKey="kharip1" fill="#ffc658" />
              <Bar dataKey="robi" stackId="a" fill="#82ca9d" />
              <Bar dataKey="kharip2" stackId="a" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>


      <div className="h-96 mt-6 py-6 bg-white rounded-xl">
        <h2 className='text-md font-semibold text-center'>নোটস</h2>

        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={Notedata}
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
            <Bar dataKey="incompleted" stackId="a" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default UserDashboard;
