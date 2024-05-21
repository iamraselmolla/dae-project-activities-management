import React, { useEffect, useState } from "react";
import { MdLocationPin } from "react-icons/md";
import { BsFillCloudSunFill } from "react-icons/bs";
import ImageGallery from "react-image-gallery";
import { GrTechnology } from "react-icons/gr";
import { toBengaliNumber } from "bengali-number";
import { FaPeopleGroup } from "react-icons/fa6";

const SingleSchool = ({ data }) => {
  const [allImages, setAllImages] = useState([])
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

  const imagesArr = []

  if (images.length > 0) {
    for (const image of images) {
      imagesArr.push({ original: image, thumbnail: image });
    }
  }

  return (
    <div className="rounded-lg bg-white shadow-blue relative shadow-xl">
      <div className="relative">
        <ImageGallery autoPlay={true} items={imagesArr} />

        <div className="flex items-center absolute top-3 right-0">
          <p className="px-2 py-1 bg-black text-white rounded-l-md ">
            {projectInfo.short}
          </p>
        </div>
      </div>
      <div className="content-part px-3 py-2">
        <h2 className="text-xl font-extrabold">{schoolInfo.schoolName}</h2>
        <div>
          <div className="flex items-center gap-2">
            <div><MdLocationPin /></div>
            <p>
              গ্রামঃ {location.place}, ব্লকঃ {location.block}, ইউনিয়নঃ{" "}
              {location.union}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div> <BsFillCloudSunFill /></div>
            <p>{time.season}/ {new Date(time.date.startDate).toLocaleDateString("bn-BD", {
              day: "numeric",
              month: "numeric",
              year: "numeric",
            })}</p>
          </div>
          <div className="flex items-center gap-2">
            <div><GrTechnology /></div> <p>{projectInfo.details}</p>
          </div>
          <div className="flex items-center gap-2">
            <div><FaPeopleGroup /></div> <p>{higherPerson}</p>
          </div>
          <div className="mt-2">
            <p>মন্তব্য: {comment}</p>
          </div>
          <div className="mt-2">
            <p>সহায়তাকারী: {assistantOfficers}</p>
          </div>
          <h2 className="text-xl mt-4 font-extrabold">
            উপসহকারী কৃষি কর্মকর্তার তথ্য
          </h2>
          <div className="mt-2">নামঃ {SAAO?.name}</div>
          <div className="mt-1">মোবাইলঃ {toBengaliNumber(SAAO?.mobile)}</div>

        </div>
      </div>
    </div >
  );
};

export default SingleSchool;
