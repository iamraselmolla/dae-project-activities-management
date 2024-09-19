import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, LineChart, Line } from 'recharts';
import { useSelector } from "react-redux";
import { FaBowlRice, FaPeopleGroup } from "react-icons/fa6";
import { GiFarmer } from "react-icons/gi";
import { FcReadingEbook } from "react-icons/fc";
import { GoNote } from "react-icons/go";
import { AiOutlineFileDone } from "react-icons/ai";
import getFiscalYear from '../../../shared/commonDataStores';
import { toBengaliNumber } from 'bengali-number';
import { seasonsArr } from '../../../shared/MessageConst';

const UserDashboard = () => {
  const { notes, demos, fieldDays, schools, daeMeetings } = useSelector((state) => state.dae);
  const [noteTypes, setNoteTypes] = useState([]);
  const [noteData, setNoteData] = useState([]);

  useEffect(() => {
    const uniqueNoteTypes = new Set(notes.map(note => note.purpose?.target).filter(Boolean));
    setNoteTypes(Array.from(uniqueNoteTypes));
  }, [notes]);

  useEffect(() => {
    if (noteTypes.length > 0) {
      const newData = noteTypes.map((type) => ({
        name: type,
        incompleted: notes.filter(note => note.purpose.target === type && !note.completed).length,
        completed: notes.filter(note => note.purpose.target === type && note.completed).length,
      }));
      setNoteData(newData);
    }
  }, [noteTypes, notes]);

  const runningFiscalYear = toBengaliNumber(getFiscalYear());
  const completedNotes = notes.filter((note) => note.completed).length;

  const cards = [
    { icon: <FaBowlRice className="w-8 h-8" />, count: toBengaliNumber(demos?.length), text: "প্রদর্শনী", color: "text-primary" },
    { icon: <FaPeopleGroup className="w-8 h-8" />, count: toBengaliNumber(fieldDays?.length), text: "মাঠ দিবস", color: "text-secondary" },
    { icon: <GiFarmer className="w-8 h-8" />, count: toBengaliNumber(daeMeetings?.length), text: "কৃষক সভা", color: "text-accent" },
    { icon: <FcReadingEbook className="w-8 h-8" />, count: toBengaliNumber(schools?.length), text: "স্কুল", color: "text-info" },
    { icon: <GoNote className="w-8 h-8" />, count: toBengaliNumber(notes.length - completedNotes), text: "অসম্পন্ন নোটস", color: "text-warning" },
    { icon: <AiOutlineFileDone className="w-8 h-8" />, count: toBengaliNumber(completedNotes), text: "সম্পন্ন নোটস", color: "text-success" },
  ];

  const demoData = seasonsArr.map(season => ({
    name: season,
    completed: demos.filter(demo => demo.demoTime?.season === season && demo.demoTime?.fiscalYear === runningFiscalYear && demo.completed).length,
    incomplete: demos.filter(demo => demo.demoTime?.season === season && demo.demoTime?.fiscalYear === runningFiscalYear && !demo.completed).length,
  }));

  const projectsData = Array.from(new Set(demos.map(demo => demo.projectInfo?.short)))
    .map(project => ({
      name: project,
      count: demos.filter(demo => demo.projectInfo?.short === project).length,
    }));

  const fiscalYearData = Array.from(new Set(demos.map(demo => demo.demoTime?.fiscalYear)))
    .map(year => ({
      name: year,
      count: demos.filter(demo => demo.demoTime?.fiscalYear === year).length,
    }));

  const fieldDaysData = Array.from(new Set(fieldDays.map(day => day.fiscalYear)))
    .map(year => ({
      name: year,
      'খরিপ-১': fieldDays.filter(day => day.fiscalYear === year && day.season === 'খরিপ-১').length,
      'খরিপ-২': fieldDays.filter(day => day.fiscalYear === year && day.season === 'খরিপ-২').length,
      'রবি': fieldDays.filter(day => day.fiscalYear === year && day.season === 'রবি').length,
    }));

  return (
    <div className="p-6 bg-base-200 min-h-screen">
      <h1 className="text-3xl font-bold text-base-content mb-6">ড্যাশবোর্ড</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {cards.map((card, index) => (
          <div key={index} className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <div className={`${card.color}`}>{card.icon}</div>
              <h2 className="card-title">{card.count}</h2>
              <p>{card.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title mb-4">{toBengaliNumber(getFiscalYear())} অর্থবছরের প্রদর্শনী (প্রাথমিক ও চূড়ান্ত)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={demoData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="completed" stackId="a" fill="#36D399" />
                <Bar dataKey="incomplete" stackId="a" fill="#3ABFF8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title mb-4">সকল প্রকল্পের প্রদর্শনীর তথ্য</h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={projectsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="count" stroke="#F87272" fill="#F87272" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title mb-4">অর্থবছর অনুযায়ী প্রদর্শনীর তথ্য</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={fiscalYearData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#A78BFA" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title mb-4">অর্থবছর অনুযায়ী সকল মাঠদিবসের মৌসুম ভিত্তিক তথ্য</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={fieldDaysData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="খরিপ-১" fill="#FBBD23" />
                <Bar dataKey="রবি" fill="#36D399" />
                <Bar dataKey="খরিপ-২" fill="#3ABFF8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title mb-4">নোটস</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={noteData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="completed" stackId="a" fill="#36D399" />
              <Bar dataKey="incompleted" stackId="a" fill="#F87272" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;