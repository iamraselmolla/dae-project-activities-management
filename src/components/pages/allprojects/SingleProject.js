import React, { useState } from "react";
import { GiGrainBundle } from "react-icons/gi";
import { IoTimer } from "react-icons/io5";
import { FaCheckCircle, FaHourglassStart } from "react-icons/fa";
import { toBengaliNumber } from "bengali-number";

const SingleProject = ({ single }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [crops, setCrops] = useState([]);
  const modalId = `modal_${single?.name?.details.replace(/\s+/g, '_')}`;

  const openModal = () => {
    setCrops(single?.crops);
    setModalIsOpen(true);
    document.getElementById(modalId).showModal();
  };

  const closeModal = () => {
    setModalIsOpen(false);
    document.getElementById(modalId).close();
  };

  return (
    <div className={`relative bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 border ${single?.end ? "border-green-500" : "border-gray-300"}`}>
      {/* Status Indicator Box */}
      <div className="flex justify-center items-center p-4">
        <div className={`flex items-center justify-center w-16 h-16 rounded-full ${single?.end ? "bg-green-500" : "bg-blue-500"} text-white`}>
          {!single?.end ? (
            <FaHourglassStart size={24} />
          ) : (
            <FaCheckCircle size={24} />
          )}
        </div>
      </div>

      <div className="p-6">
        {/* Project Details */}
        <h2 className="text-xl font-semibold mb-4">{single?.name?.details} ({single?.name?.short})</h2>
        <div className="flex flex-col gap-4">
          {/* Crops Info */}
          <div className="flex items-center gap-4 cursor-pointer" onClick={openModal}>
            <GiGrainBundle className="text-green-500 text-2xl" />
            <span className="text-lg font-bold">{toBengaliNumber(single?.crops?.length)} Crops</span>
          </div>
          {/* Time Info */}
          <div className="flex items-center gap-4">
            <IoTimer className="text-orange-500 text-2xl" />
            <span>{new Date(single?.time?.start).toLocaleDateString("bn-BD")} - {new Date(single?.time?.end).toLocaleDateString("bn-BD")}</span>
          </div>
        </div>
      </div>

      {/* Modal for Crops */}
      <dialog id={modalId} className="modal">
        <div className="modal-box relative max-w-lg">
          <button onClick={closeModal} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          <h3 className="text-lg font-semibold mb-4">প্রযুক্তি</h3>
          <div className="py-4 space-y-2">
            {crops?.map((crop, index) => (
              <div key={index} className="flex items-start">
                <span className="text-lg font-medium">{toBengaliNumber(index + 1)}.</span> <span className="ml-2">{crop}</span>
              </div>
            ))}
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default SingleProject;
