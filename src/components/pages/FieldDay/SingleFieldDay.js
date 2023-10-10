import React from 'react';
import { BsFillPeopleFill,BsCalendarDate,BsFillCloudSunFill} from 'react-icons/bs';

import { MdLocationPin } from 'react-icons/md';
import { GiFarmer } from 'react-icons/gi';
import ImageGallery from "react-image-gallery";
import { Link } from 'react-router-dom';


const SingleFieldDay = () => {
    const images = [
        {
            original: "images/features/3.jpg",
            thumbnail: "images/features/3.jpg",
        },
        {
            original: "images/features/3.jpg",
            thumbnail: "images/features/3.jpg",
        },
        {
            original: "images/features/3.jpg",
            thumbnail: "images/features/3.jpg",
        },
        {
            original: "images/features/3.jpg",
            thumbnail: "images/features/3.jpg",
        },
        {
            original: "images/features/3.jpg",
            thumbnail: "images/features/3.jpg",
        },
        {
            original: "images/features/3.jpg",
            thumbnail: "images/features/3.jpg",
        },
        {
            original: "images/features/3.jpg",
            thumbnail: "images/features/3.jpg",
        },
    ];
    return (
        <div className='rounded-lg shadow-xl'>
            <div className='relative'>
                <ImageGallery autoPlay={true} items={images} />
                <div className='flex items-center absolute top-3'>
                    <p className='px-2 py-1 bg-black text-white rounded-r-md '>
                        জিকেবিএসপি
                    </p>

                </div>
                <div className='flex items-center absolute top-3 right-0'>
                    <p className='px-2 py-1 bg-black text-white rounded-l-md '>
                        মূগ
                    </p>

                </div>
            </div>
            <div className="content-part px-3 py-2   ">
                <div>
                    <div className="flex items-center gap-2">
                        <BsFillPeopleFill /> <p>উপপরিচালক, জেলা প্রশিক্ষণ অফিসার</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <GiFarmer /> <p> ৭০ জন (পুরুষ ৩০ জন, মহিলা ৪০ জন)</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <BsCalendarDate /> <p> ০২/০২/২০২৩ খ্রিঃ</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <MdLocationPin /> <p>
                            গ্রামঃ নলধা, ব্লকঃ নলধা, ইউনিয়নঃ নলধা
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <BsFillCloudSunFill /> <p>
                      খরিপ-১/২০২৩-২৪
                    </p>
                    </div>

                    
                                  </div>
            </div>
        </div>
    );
};

export default SingleFieldDay;