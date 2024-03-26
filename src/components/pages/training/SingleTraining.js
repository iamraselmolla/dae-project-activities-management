import React, { useContext, useEffect } from "react";
import { GiFarmer } from "react-icons/gi";
import {
  BsCalendarDate,
  BsFillPeopleFill,
  BsFillCloudSunFill,
} from "react-icons/bs";
import { MdLocationPin } from "react-icons/md";
import ImageGallery from "react-image-gallery";
import { Link } from "react-router-dom";
import { toBengaliNumber } from "bengali-number";
import { AuthContext } from "../../AuthContext/AuthProvider";

const SingleTraining = ({ data }) => {
  const { user } = useContext(AuthContext)
  const {
    projectInfo,
    fiscalYear,
    season,
    subject,
    guests,
    farmers,
    date,
    images,
  } = data;

  const imagesArr = [];
  useEffect(() => {
    if (images?.length > 0) {
      for (const image of images) {
        imagesArr.push({ original: image, thumbnail: image });
      }
    }
  }, [images]);
  const handleTrainingDelete = () => {
    if (window.confirm(`আপনি কি ${projectInfo?.short} প্রকল্পের ${toBengaliNumber(date?.startDate)} তারিখের ${subject} শিরোনামের প্রশিক্ষণ ডিলিট করতে চান?`)) {

    }
  }

  return (
    <div className="rounded-lg border pb-12 relative shadow-xl">
      <div className="relative">
        <ImageGallery autoPlay={true} items={imagesArr} />
        <div className="flex items-center absolute top-3">
          <p className="px-2 py-1 bg-black text-white rounded-r-md ">
            {projectInfo?.short}
          </p>
        </div>
        <div className="flex items-center absolute top-3 right-0">
          <p className="px-2 py-1 flex gap-2 items-center bg-black text-white rounded-l-md ">
            <BsCalendarDate /> <div>{toBengaliNumber(date?.startDate)}</div>
          </p>
        </div>
      </div>
      <div className="content-part px-3 py-2   ">
        <h2 className="text-md font-extrabold">{subject}</h2>
        <div className="flex items-center gap-2">
          <BsFillPeopleFill /> <p>{guests}</p>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <GiFarmer />
            <p>

              {toBengaliNumber(farmers?.male + farmers?.female)} জন (পুরুষ
              {toBengaliNumber(farmers?.male)} জন, মহিলা
              {toBengaliNumber(farmers?.female)} জন)
            </p>
          </div>
          <div className="flex items-center gap-2">
            <BsFillCloudSunFill />
            <p>
              {season}/{fiscalYear}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <img src="images/project.png" alt="Project Icon" />
            <p>{projectInfo?.details}</p>
          </div>
          <div className="flex absolute bottom-0 left-0 mt-3 w-full">
            <button className="bg-green-400 flex justify-center items-center w-full py-2 px-4 text-white font-bold">এডিট করুন </button>
            <button onClick={handleTrainingDelete} className="bg-red-400 w-full justify-center items-center py-2 px-4 text-white font-bold">ডিলিট করুন</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleTraining;
