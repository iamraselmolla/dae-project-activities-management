import React, { useState } from "react";
import { GiGrainBundle } from "react-icons/gi";
import { toBengaliNumber } from "bengali-number";
import { IoTimer } from "react-icons/io5";
import { BsPersonWorkspace } from "react-icons/bs";
import { LiaCheckSquareSolid } from "react-icons/lia";

const SingleProject = ({ single }) => {
  const [show, setShow] = useState(false);
  return (
    <div
      className={`px-4 relative py-5 pt-12 mb-10 rounded-xl bg-white ${single?.end ? "border-2 border-green-500" : ""
        }`}
    >
      <div
        className="absolute theme-bg flex h-16 items-center justify-center rounded-full text-white w-16"
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
        <div
          onClick={() => setShow(!show)}
          style={{ zIndex: "500" }}
          className="flex w-full relative gap-2"
        >
          <div className="flex gap-2 items-center cursor-pointer">
            <GiGrainBundle className="theme-color" size={25} />
            <div className="text-xl font-bold">
              {toBengaliNumber(single?.crops?.length)}
            </div>
          </div>
          <div className="bg-white transition-all border-2 border-black absolute top-3 mt-8 flex flex-col gap-1 px-5 rounded-sm">
            {show &&
              single?.crops?.map((singleItem, index) => (
                <div className="py-1 flex gap-1 bg-white">
                  {toBengaliNumber(index + 1)}. {singleItem}
                </div>
              ))}
          </div>
        </div>
        <div className="flex gap-1">
          <div className="flex gap-1 items-center">
            <IoTimer size={25} className="theme-color" />
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
