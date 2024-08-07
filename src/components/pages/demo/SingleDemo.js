import React, { useState } from "react";
import { FaMobileAlt } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { BsFillCloudSunFill } from "react-icons/bs";
import ImageGallery from "react-image-gallery";
import { Link } from "react-router-dom";
import "./demo.css";
import { GrTechnology } from "react-icons/gr";
import { CiCalendarDate } from "react-icons/ci";
const SingleDemo = ({ data }) => {
  const {
    projectInfo,
    demoTime,
    farmersInfo,
    address,
    numbersInfo,
    demoInfo,
    demoDate,
    demoImages,
    completed
  } = data;

  const imagesArr = []
  if (demoImages?.length > 0) {
    for (const image of demoImages) {
      image.image?.map((single) =>
        imagesArr.push({ original: single, thumbnail: single })
      );
    }
  } else {
    imagesArr.push(
      { original: "images/pi/pi2.jpg", thumbnail: "images/pi/pi2.jpg" },
      { original: "images/pi/pi2.jpg", thumbnail: "images/pi/pi2.jpg" }
    );
  }


  return (
    <div className={`rounded-lg bg-white shadow-blue relative shadow-xl ${completed ? "border-8 border-green-500 scale-90" : ""}`}>

      <div className="relative">

        <ImageGallery autoPlay={true} items={imagesArr} />
        <div className="flex items-center absolute top-3">
          <p className="px-2 py-1 theme-bg text-white rounded-r-md ">
            {projectInfo?.short}
          </p>
        </div>
        <div className="flex items-center absolute top-3 right-0">
          <p className="px-2 py-1 theme-bg text-white rounded-l-md ">
            {demoInfo?.crop}
          </p>
        </div>
      </div>

      <div className="content-part px-3 py-2">
        <h2 className="text-xl font-extrabold">{farmersInfo?.name}</h2>
        <div>
          <div className="flex items-center gap-2">
            <FaMobileAlt /> <p>{numbersInfo?.mobile}</p>
          </div>
          <div className="flex items-center gap-2">
            <MdLocationPin />
            <p>
              গ্রামঃ {address?.village}, ব্লকঃ {address?.block}, ইউনিয়নঃ
              {address?.union}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <BsFillCloudSunFill />
            <p>
              {demoTime?.season}/{demoTime?.fiscalYear}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <CiCalendarDate />
            <p>
              {new Date(demoDate?.ropon).toLocaleString("bn-BD", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <GrTechnology /> <p>{demoInfo?.tech}</p>
          </div>
          <div className="font-extrabold mt-3">
            <p>প্রকল্পের নামঃ {projectInfo?.full}</p>
          </div>

          <div className="mt-3 mb-4">
            <Link
              className="px-3 py-2 rounded-md transition-colors block border-2 hover:text-black theme-bg text-white hover:bg-transparent  font-bold w-100 text-center"
              to={`/demo/${data?._id}`}
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
