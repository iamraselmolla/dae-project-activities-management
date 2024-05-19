import React from "react";
import { GiDiscussion } from "react-icons/gi";
import { useSelector } from "react-redux";
import { FaBowlRice } from "react-icons/fa6";
import { FaPeopleGroup } from "react-icons/fa6";
import { GiFarmer } from "react-icons/gi";
import { FcReadingEbook } from "react-icons/fc";
import { GoNote } from "react-icons/go";
import { AiOutlineFileDone } from "react-icons/ai";
import DashboardCard from "../../../shared/DashboardCard";

const UserDashboard = () => {
  const {
    notes,
    userData: { demos, fieldDays, schools, daeMeetins },
  } = useSelector((state) => state.dae);
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
  return (
    <section className="py-5">
      <div className="grid grid-cols-3 gap-5 justify-center items-center">
        <div className="grid bg-white p-4 col-span-2 rounded-xl grid-cols-3 gap-3">
          {cards.map((card, index) => (
            <DashboardCard key={index} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserDashboard;
