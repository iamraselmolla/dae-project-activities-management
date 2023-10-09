import React from 'react';
import { BsCardImage } from 'react-icons/bs';
import ImageGallery from "react-image-gallery";


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
        <div className='rounded-lg border-3 border-black'>
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
            <div className="content-part px-3 py-2 border border-black border-t-0">
                <h2 className="text-xl font-extrabold">
                    মোঃ শাহাজাহান মিয়া
                </h2>
                <div>
                    <p>01944835365</p>
                    <p className="font-bold">
                        গ্রামঃ নলধা, ব্লকঃ নলধা, ইউনিয়নঃ নলধা
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SingleDemo;