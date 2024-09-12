import React, { useContext, useEffect, useState } from "react";
import { GiFarmer } from "react-icons/gi";
import { BsCalendarDate, BsFillPeopleFill, BsFillCloudSunFill } from "react-icons/bs";
import ImageGallery from "react-image-gallery";
import { toBengaliNumber } from "bengali-number";
import { AuthContext } from "../../AuthContext/AuthProvider";
import 'react-image-gallery/styles/css/image-gallery.css'; // Ensure to import ImageGallery CSS

const SingleTraining = ({ data }) => {
  const { role } = useContext(AuthContext);
  const {
    projectInfo,
    fiscalYear,
    season,
    subject,
    guests,
    farmers,
    date,
    images
  } = data;

  const [imagesArr, setImagesArr] = useState([]);

  useEffect(() => {
    if (images?.length > 0) {
      setImagesArr(images.map(image => ({ original: image, thumbnail: image })));
    }
  }, [images]);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-500 hover:scale-105">
      <div className="relative">
        <ImageGallery
          autoPlay
          items={imagesArr}
          showFullscreenButton
          showPlayButton={false}
          showBullets
          showThumbnails={false}
          additionalClass="w-full"
          lazyLoad
        />
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-2">{subject}</h2>
        <div className="flex items-center text-gray-700 mb-3">
          <BsCalendarDate className="mr-2 text-blue-600" size={20} />
          {toBengaliNumber(new Date(date?.startDate).toLocaleDateString("bn-BD"))}
        </div>
        <div className="flex items-center text-gray-700 mb-3">
          <BsFillPeopleFill className="mr-2 text-green-600" size={20} />
          {toBengaliNumber(guests)} জন
        </div>
        <div className="flex items-center text-gray-700 mb-3">
          <GiFarmer className="mr-2 text-orange-600" size={20} />
          {toBengaliNumber(farmers?.male + farmers?.female)} জন (পুরুষ {toBengaliNumber(farmers?.male)} জন, মহিলা {toBengaliNumber(farmers?.female)} জন)
        </div>
        <div className="flex items-center text-gray-700 mb-3">
          <BsFillCloudSunFill className="mr-2 text-yellow-500" size={20} />
          {season}/{fiscalYear}
        </div>
        <div className="flex items-center text-gray-700">
          <img src="images/project.png" alt="Project Icon" className="w-6 h-6 mr-2" />
          <p>{projectInfo?.details}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleTraining;
