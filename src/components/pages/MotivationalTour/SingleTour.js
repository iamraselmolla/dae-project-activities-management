import React from "react";
import { GiFarmer } from "react-icons/gi";
import { BsCalendarDate, BsFillCloudSunFill } from "react-icons/bs";
import ImageGallery from "react-image-gallery";
import { toBengaliNumber } from "bengali-number";
import "react-image-gallery/styles/css/image-gallery.css";

const formatDateToBengali = (dateString) => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('bn-BD', options);
};

const SingleTour = ({ tour }) => {
  const { projectInfo, place, time, farmers, comment, images } = tour;
  const { startDate, endDate } = time.date;
  const { fiscalYear, season } = time;

  const imagesArr = images.map((url) => ({
    original: url,
    thumbnail: url,
  }));

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
      <div className="relative">
        <ImageGallery
          autoPlay
          items={imagesArr}
          showThumbnails={false}
          showPlayButton={false}
          showFullscreenButton={false}
        />
        <div className="absolute top-4 left-4 theme-bg text-white px-3 py-1 rounded-full">
          {projectInfo?.short}
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2 text-gray-800">{place}</h2>
        <div className="flex items-center text-gray-600 mb-2">
          <GiFarmer className="text-green-500 text-2xl mr-2" />
          <p>{toBengaliNumber(farmers)} জন</p>
        </div>
        <div className="flex items-center text-gray-600 mb-2">
          <BsFillCloudSunFill className="text-yellow-500 text-2xl mr-2" />
          <p>{season}/{fiscalYear}</p>
        </div>
        <div className="flex items-center text-gray-600 mb-2">
          <BsCalendarDate className="text-blue-500 text-2xl mr-2" />
          <p>
            {formatDateToBengali(startDate)} - {formatDateToBengali(endDate)}
          </p>
        </div>
        <div className="flex items-center text-gray-600 mb-4">
          <img src="images/project.png" alt="Project Icon" className="w-8 h-8 mr-2" />
          <p>{projectInfo?.details}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg mt-4 text-gray-700">
          <p>{comment}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleTour;
