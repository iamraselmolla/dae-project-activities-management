import React, { useEffect, useState } from "react";
import { FaMobileAlt } from "react-icons/fa";
import { BsFillCloudSunFill } from "react-icons/bs";
import ImageGallery from "react-image-gallery";
import { CiCalendarDate } from "react-icons/ci";
import { MdAgriculture } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";



const SingleDistribution = ({ data }) => {
    const [allImages, setImages] = useState([]);
    const {
        projectInfo,
        time,
        materialName,
        presentGuests,
        images,
        comment,
    } = data;

    useEffect(() => {
        if (images?.length > 0) {
            setImages(images.map(image => ({ original: image, thumbnail: image })));
        } else {
            setImages([
                { original: "images/default.jpg", thumbnail: "images/default.jpg" },
            ]);
        }
    }, [images]);

    return (
        <div className="rounded-lg bg-white shadow-blue relative shadow-xl">
            <div className="relative">
                <ImageGallery autoPlay={true} items={allImages} />
                <div className="flex items-center absolute top-3">
                    <p className="px-2 py-1 bg-black text-white rounded-r-md ">
                        {projectInfo?.short}
                    </p>
                </div>
            </div>

            <div className="content-part px-3 py-2">
                <h2 className="text-xl font-extrabold">{projectInfo?.details}</h2>
                <div>

                    <div className="flex items-center gap-2">
                        <BsFillCloudSunFill />
                        <p>{time?.season}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <CiCalendarDate />
                        <p>
                            {new Date(time?.date).toLocaleDateString("bn-BD", {
                                day: "numeric",
                                month: "numeric",
                                year: "numeric",
                            })}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaPeopleGroup /> <p>{presentGuests}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <MdAgriculture /> <p>{materialName}</p>

                    </div>
                    <div className="font-extrabold mt-3">
                        <p>{comment}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleDistribution;
