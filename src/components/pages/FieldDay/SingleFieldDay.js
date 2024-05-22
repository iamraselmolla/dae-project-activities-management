import React, { useEffect } from "react";
import {
  BsFillPeopleFill,
  BsCalendarDate
} from "react-icons/bs";

import { MdLocationPin } from "react-icons/md";
import { GiFarmer } from "react-icons/gi";
import ImageGallery from "react-image-gallery";
import { toBengaliNumber } from "bengali-number";

const SingleFieldDay = ({ data }) => {
  const {
    projectInfo,
    farmers,
    address,
    SAAO,
    fiscalYear,
    season,
    guests,
    date,
    images,
    subject,
    comment,
  } = data;
  const imagesArr = [];
  useEffect(() => {
    if (images?.length > 0) {
      for (const image of images) {
        imagesArr.push({ original: image, thumbnail: image });
      }
    }
  }, [images]);
  return (
    <div className="rounded-lg bg-white shadow-xl">
      <div className="relative">
        <ImageGallery autoPlay={true} items={imagesArr} />
        <div className="flex items-center absolute top-3">
          <p className="px-2 py-1 bg-black text-white rounded-r-md ">
            {projectInfo?.short}
          </p>
        </div>
        <div className="flex items-center absolute top-3 right-0">
          <p className="px-2 py-1 bg-black text-white rounded-l-md ">
            {subject}
          </p>
        </div>
      </div>
      <div className="content-part px-3 py-2   ">
        <div>
          <div className="flex items-center gap-2">
            <BsFillPeopleFill /> <p>{guests}</p>
          </div>
          <div className="flex items-center gap-2">
            <GiFarmer />
            <p>
              {toBengaliNumber(farmers?.male + farmers?.female)} জন (পুরুষ
              {toBengaliNumber(farmers?.male)} জন, মহিলা
              {toBengaliNumber(farmers?.female)} জন)
            </p>
          </div>
          <div className="flex items-center gap-2">
            <BsCalendarDate />
            <p>
              {season}/{fiscalYear}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <MdLocationPin />
            <p>
              স্থানঃ গ্রামঃ {address?.village}, ব্লকঃ
              {address?.block}, ইউনিয়নঃ {address?.union}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <img src="images/project.png" alt="Project Icon" />
            <p>{projectInfo?.details}</p>
          </div>
          <h2 className="text-xl mt-4 font-extrabold">
            উপসহকারী কৃষি কর্মকর্তার তথ্য
          </h2>
          <div className="mt-2">নামঃ {SAAO.name}</div>
          <div className="mt-1">মোবাইলঃ {toBengaliNumber(SAAO?.mobile)}</div>
        </div>
      </div>
    </div>
  );
};

export default SingleFieldDay;
