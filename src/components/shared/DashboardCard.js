import { toBengaliNumber } from "bengali-number";
import React from "react";
import { GoProject } from "react-icons/go";

const DashboardCard = ({ icon, count, text, backgroundColor }) => {
  return (
    <div
      className={`h-40 rounded-xl ps-4 py-5`}
      style={{ background: backgroundColor }}
    >
      <div
        className="flex h-10 text-white w-10 rounded-full justify-center items-center"
        style={{ background: "#fa5a7d" }}
      >
        {icon}
      </div>
      <div className="text-xl mt-5 font-bold">{toBengaliNumber(count)}</div>
      <p className="font-semibold">{text}</p>
    </div>
  );
};

export default DashboardCard;
