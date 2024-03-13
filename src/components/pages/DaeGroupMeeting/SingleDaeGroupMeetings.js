import React from "react";
import { FaMobileAlt } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { BsFillCloudSunFill } from "react-icons/bs";
import ImageGallery from "react-image-gallery";
import { RiImageAddFill } from "react-icons/ri";

const SingleDemo = ({ data }) => {
  const {
    SAAO,
    mobile,
    name,
    Prototype,
    address,
    block,
    union,
    village,
    createdAt,
    discussion,
    groupInfo,
    images,
    presentOfficers,
    time,
    updatedAt,
    username,
  } = data;
  const imagesArr = [
    {
      original: "images/features/1.jpg",
      thumbnail: "images/features/1.jpg",
    },
    {
      original: "images/features/1.jpg",
      thumbnail: "images/features/1.jpg",
    },
    {
      original: "images/features/1.jpg",
      thumbnail: "images/features/1.jpg",
    },
    {
      original: "images/features/1.jpg",
      thumbnail: "images/features/1.jpg",
    },
    {
      original: "images/features/1.jpg",
      thumbnail: "images/features/1.jpg",
    },
    {
      original: "images/features/1.jpg",
      thumbnail: "images/features/1.jpg",
    },
    {
      original: "images/features/1.jpg",
      thumbnail: "images/features/1.jpg",
    },
  ];
  return (
    <div className="rounded-lg relative shadow-xl">
      <div className="relative">
        <ImageGallery autoPlay={true} items={imagesArr} />
      </div>

      <div className="content-part px-3 py-2   ">
        <h2 className="text-xl font-extrabold">{groupInfo?.name}</h2>
        <div>
          <div className="flex items-center gap-2">
            <FaMobileAlt /> <p>{groupInfo?.mobile}</p>
          </div>
          <div className="flex items-center gap-2">
            <MdLocationPin />{" "}
            <p>
              স্থানঃ {groupInfo?.place}, গ্রামঃ {address?.village}, ব্লকঃ{" "}
              {address?.block}, ইউনিয়নঃ {address?.union}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <BsFillCloudSunFill /> <p>খরিপ-১/২০২৩-২৪</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleDemo;
