import React, { useContext, useEffect } from "react";
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

  const imagesArr = [];
  useEffect(() => {
    if (images?.length > 0) {
      for (const image of images) {
        imagesArr.push({ original: image, thumbnail: image });
      }
    }
  }, [images, data]);

  return (
    <div
      className={`rounded-lg border relative shadow-lg bg-white`}
    >
      <div className="relative w-full">
        <ImageGallery
          autoPlay={true}
          items={imagesArr}
          showFullscreenButton={true}
          showPlayButton={false}
          showBullets={true}
          showThumbnails={false}
          additionalClass="w-full"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{subject}</h2>
        <div className="text-base text-gray-700 mb-2">
          <BsCalendarDate className="inline-block mr-1" size={18} />
          {toBengaliNumber(new Date(date?.startDate).toLocaleDateString("bn-BD"))}
        </div>
        <div className="flex items-center gap-2 mb-2">
          <BsFillPeopleFill size={20} />
          <p className="text-base font-medium">{guests}</p>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <GiFarmer size={20} />
          <p className="text-base font-medium">
            {toBengaliNumber(farmers?.male + farmers?.female)} জন (পুরুষ
            {toBengaliNumber(farmers?.male)} জন, মহিলা
            {toBengaliNumber(farmers?.female)} জন)
          </p>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <BsFillCloudSunFill size={20} />
          <p className="text-base font-medium">
            {season}/{fiscalYear}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <img src="images/project.png" alt="Project Icon" className="w-6 h-6 mr-2" />
          <p className="text-base font-medium">{projectInfo?.details}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleTraining;
