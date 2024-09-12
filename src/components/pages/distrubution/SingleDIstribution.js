import React, { useEffect, useState } from "react";
import { BsFillCloudSunFill, BsCalendarDate } from "react-icons/bs";
import { MdAgriculture } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const SingleDistribution = ({ data }) => {
    const {
        projectInfo,
        time,
        materialName,
        presentGuests,
        images,
        comment,
    } = data;

    const [allImages, setImages] = useState([]);

    useEffect(() => {
        if (images?.length > 0) {
            setImages(images.map((image) => ({ original: image, thumbnail: image })));
        } else {
            setImages([
                { original: "images/default.jpg", thumbnail: "images/default.jpg" },
            ]);
        }
    }, [images]);

    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-transform duration-500 linear transform hover:scale-105">
            <div className="relative">
                <ImageGallery
                    autoPlay
                    items={allImages}
                    showFullscreenButton={false}
                    showPlayButton={false}
                    showBullets={true}
                    showThumbnails={false}
                    additionalClass="w-full"
                    lazyLoad
                />
                <div className="absolute top-2 left-2 theme-bg text-white px-3 py-1 rounded-full">
                    {projectInfo?.short}
                </div>
            </div>
            <div className="p-4">
                {/* Project Details Title */}
                <h2 className="text-xl font-bold text-gray-800 mb-4">{projectInfo?.details}</h2>

                <div className="flex items-center gap-2 mb-2">
                    <BsFillCloudSunFill className="text-xl text-blue-500" />
                    <p className="text-gray-700">{time?.season}</p>
                </div>
                <div className="flex items-center gap-2 mb-2">
                    <BsCalendarDate className="text-xl text-yellow-500" />
                    <p className="text-gray-700">
                        {new Date(time?.date).toLocaleDateString("bn-BD", {
                            day: "numeric",
                            month: "numeric",
                            year: "numeric",
                        })}
                    </p>
                </div>
                <div className="flex items-center gap-2 mb-2">
                    <FaPeopleGroup className="text-xl text-green-500" />
                    <p className="text-gray-700">{presentGuests}</p>
                </div>
                <div className="flex items-center gap-2 mb-2">
                    <MdAgriculture className="text-xl text-red-500" />
                    <p className="text-gray-700">{materialName}</p>
                </div>
                {comment && (
                    <div className="mt-4 bg-gray-50 p-4 rounded-lg text-gray-800">
                        <p className="font-medium">{comment}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SingleDistribution;
