import React, { useContext, useState } from "react";
import { FaMobileAlt } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { BsFillCloudSunFill } from "react-icons/bs";
import ImageGallery from "react-image-gallery";
import { Link } from "react-router-dom";
import { RiImageAddFill } from "react-icons/ri";
import "./demo.css";
import { GrTechnology } from "react-icons/gr";
import { AuthContext } from "../../AuthContext/AuthProvider";

const SingleDemo = ({ data }) => {
  const { setModalData, username: demoUser } = useContext(AuthContext);
  const {
    projectInfo,
    demoTime,
    farmersInfo,
    address,
    SAAO,
    numbersInfo,
    demoInfo,
    demoDate,
    production,
    comment,
    demoImages,
    username,
  } = data;
  const images = [
    {
      original: "images/features/1.jpg",
      thumbnail: "images/features/1.jpg",
    },
    {
      original: "images/features/1.jpg",
      thumbnail: "images/features/1.jpg",
    },
    {
      original: "images/features/1.jpg",
      thumbnail: "images/features/1.jpg",
    },
    {
      original: "images/features/1.jpg",
      thumbnail: "images/features/1.jpg",
    },
    {
      original: "images/features/1.jpg",
      thumbnail: "images/features/1.jpg",
    },
    {
      original: "images/features/1.jpg",
      thumbnail: "images/features/1.jpg",
    },
    {
      original: "images/features/1.jpg",
      thumbnail: "images/features/1.jpg",
    },
  ];
  const handleModaOpen = (dataValues) => {
    document.getElementById("my_modal_1")?.showModal();
    setModalData(dataValues);
  };
  return (
    <div className="rounded-lg relative shadow-xl">
      <div className="relative">
        <ImageGallery autoPlay={true} items={images} />
        <div className="flex items-center absolute top-3">
          <p className="px-2 py-1 bg-black text-white rounded-r-md ">
            {projectInfo?.short}
          </p>
        </div>
        <div className="flex items-center absolute top-3 right-0">
          <p className="px-2 py-1 bg-black text-white rounded-l-md ">
            {demoInfo?.crop}
          </p>
        </div>
      </div>
      {data?.username === demoUser && (
        <div className="add-image cursor-pointer bg-black flex h-12 absolute items-center justify-center opacity-50 rounded-full text-3xl text-white w-12">
          <RiImageAddFill onClick={() => handleModaOpen(data)} />
        </div>
      )}

      <div className="content-part px-3 py-2   ">
        <h2 className="text-xl font-extrabold">{farmersInfo?.name}</h2>
        <div>
          <div className="flex items-center gap-2">
            <FaMobileAlt /> <p>{numbersInfo?.mobile}</p>
          </div>
          <div className="flex items-center gap-2">
            <MdLocationPin />{" "}
            <p>
              গ্রামঃ {address?.village}, ব্লকঃ {address?.block}, ইউনিয়নঃ{" "}
              {address?.union}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <BsFillCloudSunFill />{" "}
            <p>
              {demoTime?.season}/{demoTime?.fiscalYear}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <GrTechnology /> <p>{demoInfo?.tech}</p>
          </div>
          <div className="font-extrabold mt-3">
            <p>প্রকল্পের নামঃ {projectInfo?.full}</p>
          </div>

          <div className=" mt-3 mb-4">
            <Link
              className="px-3 py-2 rounded-md transition-colors block border-2 border-black hover:bg-black hover:text-white text-black font-bold w-100 text-center"
              to="/"
            >
              বিস্তারিত দেখুন
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleDemo;
