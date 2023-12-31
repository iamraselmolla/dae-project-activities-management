import React from 'react';
import { FaMobileAlt } from 'react-icons/fa';
import { MdLocationPin } from 'react-icons/md';
import { BsFillCloudSunFill } from 'react-icons/bs';
import ImageGallery from "react-image-gallery";
import { Link } from 'react-router-dom';


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
                <h2 className="text-xl font-extrabold">
                    মোঃ শাহাজাহান মিয়া
                </h2>
                <div>
                    <div className="flex items-center gap-2">
                        <FaMobileAlt /> <p>01944835365</p>
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
                    
                    <div className=' mt-3 mb-4'>
                        <Link className='px-3 py-2 rounded-md transition-colors block border-2 border-black hover:bg-black hover:text-white text-black font-bold w-100 text-center' to="/">বিস্তারিত দেখুন</Link>
                    </div>                </div>
            </div>
        </div>
    );
};

export default SingleDemo;