import React from "react";
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

  // Prepare image gallery items
  const imagesArr = demoImages?.length
    ? demoImages.flatMap(image => image.image?.map(single => ({ original: single, thumbnail: single })))
    : [
      { original: "images/pi/pi2.jpg", thumbnail: "images/pi/pi2.jpg" },
      { original: "images/pi/pi2.jpg", thumbnail: "images/pi/pi2.jpg" }
    ];

  return (
    <div className={`bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 ease-in-out ${completed ? "border-4 border-green-500 transform scale-95" : ""}`}>
      <div className="relative">
        <ImageGallery autoPlay={true} items={imagesArr} showPlayButton={false} showFullscreenButton={false} />
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="bg-teal-500 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase shadow-md">{projectInfo?.short}</span>
        </div>
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase shadow-md">{demoInfo?.crop}</span>
        </div>
      </div>

      <div className="p-4">
        <h2 className="text-2xl font-extrabold mb-2">{farmersInfo?.name}</h2>
        <div className="space-y-2 text-gray-700">
          <div className="flex items-center gap-2">
            <FaMobileAlt className="text-teal-600" /> <span>{numbersInfo?.mobile}</span>
          </div>
          <div className="flex items-center gap-2">
            <MdLocationPin className="text-red-600" />
            <span>
              গ্রামঃ {address?.village}, ব্লকঃ {address?.block}, ইউনিয়নঃ {address?.union}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <BsFillCloudSunFill className="text-yellow-500" />
            <span>
              {demoTime?.season}/{demoTime?.fiscalYear}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CiCalendarDate className="text-blue-600" />
            <span>
              {new Date(demoDate?.ropon).toLocaleDateString("bn-BD", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <GrTechnology className="text-purple-600" /> <span>{demoInfo?.tech}</span>
          </div>
        </div>
        <div className="mt-4 text-gray-800 font-semibold">
          <p>প্রকল্পের নামঃ {projectInfo?.full}</p>
        </div>
        <div className="mt-4">
          <Link
            className="block text-center bg-teal-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-teal-700 transition-colors"
            to={`/demo/${data?._id}`}
          >
            বিস্তারিত দেখুন
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleDemo;
