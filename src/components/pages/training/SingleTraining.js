import React from "react";
import { GiFarmer } from "react-icons/gi";
import {
  BsCalendarDate,
  BsFillPeopleFill,
  BsFillCloudSunFill,
} from "react-icons/bs";
import { MdLocationPin } from "react-icons/md";
import ImageGallery from "react-image-gallery";
import { Link } from "react-router-dom";

const SingleTraining = ({ data }) => {
    const {}
  const images = [
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
    <div className="rounded-lg shadow-xl">
      <div className="relative">
        <ImageGallery autoPlay={true} items={images} />
        <div className="flex items-center absolute top-3">
          <p className="px-2 py-1 bg-black text-white rounded-r-md ">
            {}
          </p>
        </div>
        <div className="flex items-center absolute top-3 right-0">
          <p className="px-2 py-1 flex gap-2 items-center bg-black text-white rounded-l-md ">
            <BsCalendarDate /> <div>০২/০২/২০২৩</div>
          </p>
        </div>
      </div>
      <div className="content-part px-3 py-2   ">
        <h2 className="text-md font-extrabold">নিরাপদ সবজি উৎপাদন কলাকৌশল</h2>
        <div className="flex items-center gap-2">
          <BsFillPeopleFill /> <p>উপপরিচালক, জেলা প্রশিক্ষণ অফিসার</p>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <GiFarmer /> <p> ৭০ জন (পুরুষ ৩০ জন, মহিলা ৪০ জন)</p>
          </div>
          <div className="flex items-center gap-2">
            <BsFillCloudSunFill /> <p>খরিপ-১/২০২৩-২৪</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleTraining;
