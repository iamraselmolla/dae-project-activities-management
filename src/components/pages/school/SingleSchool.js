import React, { useEffect, useState } from "react";
import { MdLocationPin } from "react-icons/md";
import { BsFillCloudSunFill, BsCalendarDate } from "react-icons/bs";
import { GrTechnology } from "react-icons/gr";
import { FaPeopleGroup } from "react-icons/fa6";
import ImageGallery from "react-image-gallery";
import { toBengaliNumber } from "bengali-number";
import "react-image-gallery/styles/css/image-gallery.css";

const SingleSchool = ({ data }) => {
  const {
    projectInfo,
    location,
    time,
    schoolInfo,
    SAAO,
    assistantOfficers,
    higherPerson,
    comment,
    images,
  } = data;

  const [imagesArr, setImagesArr] = useState([]);

  useEffect(() => {
    if (images?.length > 0) {
      setImagesArr(images.map((img) => ({ original: img, thumbnail: img })));
    }
  }, [images]);

  return (
    <div className="bg-white shadow-lg transition-transform duration-500 linear transform hover:scale-105 rounded-lg overflow-hidden">
      <div className="relative">
        <ImageGallery
          autoPlay
          items={imagesArr}
          showThumbnails={false}
        />
        <div className="absolute top-2 left-2 theme-bg text-white px-3 py-1 rounded-full">
          {projectInfo.short}
        </div>
        <div className="absolute top-2 right-2 theme-bg text-white px-3 py-1 rounded-full">
          {time.season}
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2 text-gray-800">{schoolInfo.schoolName}</h2>
        <div className="flex items-center gap-2 mb-2">
          <MdLocationPin className="text-red-500 text-xl" />
          <p className="text-gray-700">
            গ্রামঃ {location.place}, ব্লকঃ {location.block}, ইউনিয়নঃ {location.union}
          </p>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <BsFillCloudSunFill className="text-yellow-500 text-xl" />
          <p className="text-gray-700">
            {time.season} / {new Date(time.date.startDate).toLocaleDateString('bn-BD', { day: 'numeric', month: 'numeric', year: 'numeric' })}
          </p>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <GrTechnology className="text-blue-500 text-xl" />
          <p className="text-gray-700">{projectInfo.details}</p>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <FaPeopleGroup className="text-green-500 text-xl" />
          <p className="text-gray-700">{higherPerson}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg mt-4 text-gray-700">
          <p>মন্তব্য: {comment}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg mt-4 text-gray-700">
          <p>সহায়তাকারী: {assistantOfficers}</p>
        </div>
        <h2 className="text-xl font-bold mt-4 mb-2 text-gray-800">
          উপসহকারী কৃষি কর্মকর্তার তথ্য
        </h2>
        <div className="text-gray-700">
          <div className="mb-1">নামঃ {SAAO?.name}</div>
          <div>মোবাইলঃ {toBengaliNumber(SAAO?.mobile)}</div>
        </div>
      </div>
    </div>
  );
};

export default SingleSchool;
