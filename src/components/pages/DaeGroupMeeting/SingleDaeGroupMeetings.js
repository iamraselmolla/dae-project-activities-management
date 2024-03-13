import React, { useState } from "react";
import { FaMobileAlt } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { BsFillCloudSunFill } from "react-icons/bs";
import ImageGallery from "react-image-gallery";
import { RiImageAddFill } from "react-icons/ri";

const SingleDemo = () => {
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
        <div className="rounded-lg relative shadow-xl">
            <div className="relative">
                <ImageGallery autoPlay={true} items={images} />
                <div className="flex items-center absolute top-3">
                    <p className="px-2 py-1 bg-black text-white rounded-r-md ">
                        জিকেবিএসপি
                    </p>
                </div>
                <div className="flex items-center absolute top-3 right-0">
                    <p className="px-2 py-1 bg-black text-white rounded-l-md ">মূগ</p>
                </div>
            </div>
            <div className="add-image cursor-pointer bg-black flex h-12 absolute items-center justify-center opacity-50 rounded-full text-3xl text-white w-12">
                <RiImageAddFill

                />
            </div>


            <div className="content-part px-3 py-2   ">
                <h2 className="text-xl font-extrabold">মোঃ শাহাজাহান মিয়া</h2>
                <div>
                    <div className="flex items-center gap-2">
                        <FaMobileAlt /> <p>01944835365</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <MdLocationPin /> <p>গ্রামঃ নলধা, ব্লকঃ নলধা, ইউনিয়নঃ নলধা</p>
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
