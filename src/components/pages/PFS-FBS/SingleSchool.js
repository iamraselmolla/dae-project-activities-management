import React, { useEffect, useState } from "react";
import { FaMobileAlt } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { BsFillCloudSunFill } from "react-icons/bs";
import ImageGallery from "react-image-gallery";
import { Link } from "react-router-dom";
import "./demo.css";
import { GrTechnology } from "react-icons/gr";
import { CiCalendarDate } from "react-icons/ci";

const SingleSchool = ({ data }) => {
  const [allImages, setImages] = useState([]);
  const {
    schoolInfo,
    address,
    contactInfo,
    facilities,
    schoolImages,
    username,
  } = data;

  useEffect(() => {
    if (schoolImages?.length > 0) {
      for (const image of schoolImages) {
        image.image?.map((single) =>
          setImages((prevImages) => [
            ...prevImages,
            { original: single, thumbnail: single },
          ])
        );
      }
    } else {
      setImages([
        { original: "images/default.jpg", thumbnail: "images/default.jpg" },
      ]);
    }
  }, [schoolImages]);

  return (
    <div className="rounded-lg bg-white shadow-blue relative shadow-xl">
      <div className="relative">
        <ImageGallery autoPlay={true} items={allImages} />
        <div className="flex items-center absolute top-3">
          <p className="px-2 py-1 bg-black text-white rounded-r-md ">
            {schoolInfo?.shortName}
          </p>
        </div>
        <div className="flex items-center absolute top-3 right-0">
          <p className="px-2 py-1 bg-black text-white rounded-l-md ">
            {facilities?.type}
          </p>
        </div>
      </div>

      <div className="content-part px-3 py-2">
        <h2 className="text-xl font-extrabold">{schoolInfo?.name}</h2>
        <div>
          <div className="flex items-center gap-2">
            <FaMobileAlt /> <p>{contactInfo?.mobile}</p>
          </div>
          <div className="flex items-center gap-2">
            <MdLocationPin />
            <p>
              গ্রামঃ {address?.village}, ব্লকঃ {address?.block}, ইউনিয়নঃ{" "}
              {address?.union}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <BsFillCloudSunFill />
            <p>{facilities?.season}</p>
          </div>
          <div className="flex items-center gap-2">
            <CiCalendarDate />
            <p>
              {new Date(schoolInfo?.established).toLocaleDateString("bn-BD", {
                day: "numeric",
                month: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <GrTechnology /> <p>{facilities?.tech}</p>
          </div>
          <div className="font-extrabold mt-3">
            <p>স্কুলের নামঃ {schoolInfo?.fullName}</p>
          </div>

          <div className="mt-3 mb-4">
            <Link
              className="px-3 py-2 rounded-md transition-colors block border-2 border-black hover:bg-black hover:text-white text-black font-bold w-100 text-center"
              to={`/school/${data?._id}`}
            >
              বিস্তারিত দেখুন
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleSchool;
