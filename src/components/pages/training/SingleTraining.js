import React, { useEffect } from "react";
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

const SingleTraining = ({ data }) => {
  const { projectInfo, fiscalYear, season, subject, guests, farmers, date, images } = data;

  const imagesArr = [];
  useEffect(() => {
    if (images?.length > 0) {
      for (const image of images) {
        imagesArr.push({ original: image, thumbnail: image })
      }
    }
  }, [images])

  return (
    <div className="rounded-lg border relative shadow-xl">
      <div className="relative">
        <ImageGallery autoPlay={true} items={imagesArr} />
        <div className="flex items-center absolute top-3">
          <p className="px-2 py-1 bg-black text-white rounded-r-md ">
            {projectInfo?.short}
          </p>
        </div>
        <div className="flex items-center absolute top-3 right-0">
          <p className="px-2 py-1 flex gap-2 items-center bg-black text-white rounded-l-md ">
            <BsCalendarDate /> <div>{toBengaliNumber(date.startDate)}</div>
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
            <GiFarmer /> <p> {toBengaliNumber(farmers?.male + farmers?.female)} জন (পুরুষ {toBengaliNumber(farmers?.male)} জন, মহিলা {toBengaliNumber(farmers?.female)} জন)</p>
          </div>
          <div className="flex items-center gap-2">
            <BsFillCloudSunFill /> <p>{season}/{fiscalYear}</p>
          </div>
          <div className="flex items-center gap-2">
            <img src="images/project.png" alt="Project Icon" /> <p>{projectInfo?.details}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleTraining;
