import React, { useEffect, useState } from "react";
import { FaMobileAlt } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { BsFillCloudSunFill } from "react-icons/bs";
import { CiCalendarDate } from "react-icons/ci";
import ImageGallery from "react-image-gallery";
import { toBengaliNumber } from "bengali-number";
import "react-image-gallery/styles/css/image-gallery.css";

const formatDateToBengali = (dateString) => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('bn-BD', options);
};

const SingleDaeGroupMeeting = ({ data }) => {
  const {
    address,
    createdAt,
    discussion,
    groupInfo,
    images,
    time,
    SAAO,
  } = data;

  const [imagesArr, setImagesArr] = useState([]);
  const [isDiscussionOpen, setIsDiscussionOpen] = useState(false);

  useEffect(() => {
    if (images?.length > 0) {
      setImagesArr(images.map((image) => ({ original: image, thumbnail: image })));
    }
  }, [images]);

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105">
      <div className="relative">
        {imagesArr.length > 0 ? (
          <ImageGallery
            items={imagesArr}
            autoPlay
            showThumbnails={false}
            showPlayButton={false}
            showFullscreenButton={false}
          />
        ) : (
          <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No Images Available</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-3">{groupInfo?.name}</h2>
        <div className="flex items-center text-gray-600 mb-2">
          <FaMobileAlt className="text-blue-500 mr-2" />
          <p>{toBengaliNumber(groupInfo?.mobile)}</p>
        </div>
        <div className="flex items-center text-gray-600 mb-2">
          <CiCalendarDate className="text-yellow-500 mr-2" />
          <p>{formatDateToBengali(time?.date?.startDate)}, {time?.day}</p>
        </div>
        <div className="flex items-center text-gray-600 mb-2">
          <MdLocationPin className="text-red-500 mr-2" />
          <p>
            স্থানঃ {groupInfo?.place}, গ্রামঃ {address?.village}, ব্লকঃ {address?.block}, ইউনিয়নঃ {address?.union}
          </p>
        </div>
        <div className="flex items-center text-gray-600 mb-2">
          <BsFillCloudSunFill className="text-green-500 mr-2" />
          <p>মৌসুমঃ {time?.season} | অর্থবছরঃ {time?.fiscalYear}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg mt-4">
          <button
            onClick={() => setIsDiscussionOpen(!isDiscussionOpen)}
            className="flex items-center text-blue-500 hover:text-blue-700 mb-2 focus:outline-none"
          >
            <svg
              className={`w-5 h-5 mr-2 transition-transform ${isDiscussionOpen ? 'rotate-180' : 'rotate-0'}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
            <span>{isDiscussionOpen ? 'বন্ধ করুন' : 'আলোচ্য বিষয়গুলি দেখুন'}</span>
          </button>
          {isDiscussionOpen && (
            <p>{discussion}</p>
          )}
        </div>
        <h2 className="text-xl font-bold mt-6 mb-3">উপসহকারী কৃষি কর্মকর্তার তথ্য</h2>
        <div className="text-gray-700">
          <div className="mb-1">নামঃ {SAAO.name}</div>
          <div>মোবাইলঃ {toBengaliNumber(SAAO?.mobile)}</div>
        </div>
      </div>
    </div>
  );
};

export default SingleDaeGroupMeeting;
