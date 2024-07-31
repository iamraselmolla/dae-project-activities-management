import React, { useState } from "react";
import { GiGrainBundle } from "react-icons/gi";
import { toBengaliNumber } from "bengali-number";
import { IoTimer } from "react-icons/io5";
import { BsPersonWorkspace } from "react-icons/bs";
import { LiaCheckSquareSolid } from "react-icons/lia";
import CropsModal from "../../shared/CropsModal";

const SingleProject = ({ single }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [crops, setCrops] = useState([]);

  const openModal = () => {
    setCrops(single?.crops);
    setModalIsOpen(true);
    document.getElementById('my_modal_3').showModal();
  };

  const closeModal = () => {
    setModalIsOpen(false);
    document.getElementById('my_modal_3').close();
  };

  return (
    <div
      className={`px-4 relative py-5 pt-12 mb-10 rounded-xl bg-white ${single?.end ? "border-2 border-green-500" : ""}`}
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
          onClick={openModal}
          style={{ zIndex: "500" }}
          className="flex w-full relative gap-2 cursor-pointer"
        >
          <div className="flex gap-2 items-center">
            <GiGrainBundle className="theme-color" size={25} />
            <div className="text-xl font-bold">
              {toBengaliNumber(single?.crops?.length)}
            </div>
          </div>
        </div>
        <div className="flex gap-1">
          <div className="flex gap-1 items-center">
            <IoTimer size={25} className="theme-color" />
          </div>
          <div>
            {new Date(single?.time?.start).toLocaleDateString("bn-BD")}
            {new Date(single?.time?.end).toLocaleDateString("bn-BD")}
          </div>
        </div>
      </div>

      <CropsModal isOpen={modalIsOpen} closeModal={closeModal} crops={crops} />
    </div>
  );
};

export default SingleProject;
