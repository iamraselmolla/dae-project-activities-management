import React, { useEffect, useState } from "react";
import { BsFillPeopleFill, BsCalendarDate } from "react-icons/bs";
import { MdLocationPin } from "react-icons/md";
import { GiFarmer } from "react-icons/gi";
import ImageGallery from "react-image-gallery";
import { toBengaliNumber } from "bengali-number";
import "react-image-gallery/styles/css/image-gallery.css";

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
    subject
  } = data;

  const [imagesArr, setImagesArr] = useState([]);

  useEffect(() => {
    if (images?.length > 0) {
      setImagesArr(images.map(img => ({ original: img, thumbnail: img })));
    }
  }, [images]);

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="relative">
        <ImageGallery autoPlay items={imagesArr} showThumbnails={false} />
        <div className="absolute top-2 left-2 theme-bg text-white px-3 py-1 rounded-full">
          {projectInfo?.short}
        </div>
        <div className="absolute top-2 right-2 theme-bg text-white px-3 py-1 rounded-full">
          {subject}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <BsFillPeopleFill className="text-xl text-blue-500" />
          <p className="text-gray-700">{guests}</p>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <GiFarmer className="text-xl text-green-500" />
          <p className="text-gray-700">
            {toBengaliNumber(farmers?.male + farmers?.female)} জন (পুরুষ {toBengaliNumber(farmers?.male)} জন, মহিলা {toBengaliNumber(farmers?.female)} জন)
          </p>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <BsCalendarDate className="text-xl text-yellow-500" />
          <p className="text-gray-700">{season}/{fiscalYear}</p>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <MdLocationPin className="text-xl text-red-500" />
          <p className="text-gray-700">স্থানঃ গ্রামঃ {address?.village}, ব্লকঃ {address?.block}, ইউনিয়নঃ {address?.union}</p>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <img src="images/project.png" alt="Project Icon" className="w-6 h-6" />
          <p className="text-gray-700">{projectInfo?.details}</p>
        </div>
        <h2 className="text-xl font-bold mt-4 mb-2">উপসহকারী কৃষি কর্মকর্তার তথ্য</h2>
        <div className="text-gray-700">
          <div className="mb-1">নামঃ {SAAO.name}</div>
          <div>মোবাইলঃ {toBengaliNumber(SAAO?.mobile)}</div>
        </div>
      </div>
    </div>
  );
};

export default SingleFieldDay;
