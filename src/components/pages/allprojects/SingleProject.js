import React from "react";
import { GiGrainBundle } from "react-icons/gi";
import { toBengaliNumber } from "bengali-number";
import { IoTimer } from "react-icons/io5";
import { BsPersonWorkspace } from "react-icons/bs";
import { LiaCheckSquareSolid } from "react-icons/lia";

const SingleProject = ({ single }) => {
  return (
    <div
      className={`px-3 relative py-5 pt-12 mb-10 rounded-xl bg-white ${
        single?.end ? "border-2 border-green-500" : ""
      }`}
    >
      <div
        className="absolute bg-[#14b8a6] flex h-16 items-center justify-center rounded-full text-white w-16"
        style={{
          left: "50%",
          transform: "translateX(-50%)",
          top: "-30px",
        }}
      >
        {!single?.end ? (
          <BsPersonWorkspace size={25} />
        ) : (
          <LiaCheckSquareSolid size={25} />
        )}
      </div>
      <h2 className="text-md font-bold">
        {single?.name?.details} ({single?.name?.short})
      </h2>
      <div className="mt-4 flex justify-between">
        <div className="flex gap-3">
          <div className="flex gap-1 items-center">
            <GiGrainBundle />
          </div>
          <div>{toBengaliNumber(single?.crops?.length)}</div>
        </div>
        <div className="flex ">
          <div className="flex gap-1 items-center">
            <IoTimer />
          </div>
          <div>
            {new Date(single?.time?.start).toLocaleDateString("bn-BD")} -{" "}
            {new Date(single?.time?.end).toLocaleDateString("bn-BD")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProject;
