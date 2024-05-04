import React, { useContext, useEffect, useState } from "react";
import { FaMobileAlt } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { BsFillCloudSunFill } from "react-icons/bs";
import ImageGallery from "react-image-gallery";
import { Link } from "react-router-dom";
import { RiImageAddFill } from "react-icons/ri";
import "./demo.css";
import { GrTechnology } from "react-icons/gr";
import { CiCalendarDate } from "react-icons/ci";

import { AuthContext } from "../../AuthContext/AuthProvider";
import formatDateToday from "../../utilis/formatDate";
import AddImageModal from "../../shared/AddImageModal";

const SingleDemo = ({ data }) => {
  const { username: demoUser } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const {
    projectInfo,
    demoTime,
    farmersInfo,
    address,
    numbersInfo,
    demoInfo,
    demoDate,
    demoImages,
    username,
  } = data;

  const imagesArr = [];
  useEffect(() => {
    if (demoImages?.length > 0) {
      for (const image of demoImages) {
        image.image?.map(single => imagesArr.push({ original: single, thumbnail: single }))
      }
    } else {
      imagesArr.push({ original: 'images/pi/pi2.jpg', thumbnail: 'images/pi/pi2.jpg' }, { original: 'images/pi/pi2.jpg', thumbnail: 'images/pi/pi2.jpg' })
    }
  }, [demoImages, showModal]);

  return (
    <div className="rounded-lg relative shadow-xl">
      <div className="relative">
        <ImageGallery autoPlay={true} items={imagesArr} />
        <div className="flex items-center absolute top-3">
          <p className="px-2 py-1 bg-black text-white rounded-r-md ">
            {projectInfo?.short}
          </p>
        </div>
        <div className="flex items-center absolute top-3 right-0">
          <p className="px-2 py-1 bg-black text-white rounded-l-md ">
            {demoInfo?.crop}
          </p>
        </div>
      </div>
      {data?.username === demoUser && (
        <div className="add-image cursor-pointer bg-black flex h-12 absolute items-center justify-center opacity-50 rounded-full text-3xl text-white w-12">
          <RiImageAddFill onClick={handleModalOpen} />
        </div>
      )}

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
              {formatDateToday(demoDate?.ropon)}
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
              className="px-3 py-2 rounded-md transition-colors block border-2 border-black hover:bg-black hover:text-white text-black font-bold w-100 text-center"
              to="/"
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
