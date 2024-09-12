import React, { useState } from "react";
import { toBengaliNumber } from "bengali-number";
import ImageGallery from "react-image-gallery";
import { deleteADistribution } from "../../../../../services/userServices";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { daeAction } from "../../../../store/projectSlice";
import { AiOutlineDelete } from "react-icons/ai"; // Modern icon
import { FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaCommentAlt } from "react-icons/fa"; // Modern icons
import DeletingLoader from "../../../../shared/DeletingLoader";
import { createRandomNumber } from "../../../../utilis/createRandomNumber";

const DistributionCard = ({ data }) => {
    const { projectInfo, place, time, farmers, comment, images } = data;
    const { startDate, endDate } = time.date;
    const { fiscalYear, season } = time;
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const imagesArr = images?.map((url) => ({
        original: url,
        thumbnail: url,
    }));

    const handleDeleteDistribution = async () => {
        if (
            window.confirm(
                `আপনি কি ${projectInfo?.short} প্রকল্পের ${season}/${fiscalYear} মৌসুমের ${place} নামক জায়গার বিতরণটির তথ্য মুছে ফেলতে চান?`
            )
        ) {
            try {
                setLoading(true);
                const result = await deleteADistribution(data?._id);
                if (result.status === 200) {
                    toast.success(result.data?.message);
                    dispatch(daeAction.setRefetch(`distributions${createRandomNumber()}`));
                }
            } catch (err) {
                toast.error(err.message);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="p-6 mb-8 bg-gradient-to-r from-white to-gray-100 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-gray-900">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                        {projectInfo?.short}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        ({season} / {fiscalYear})
                    </p>
                </div>
                <button
                    onClick={handleDeleteDistribution}
                    className="p-2 rounded-full text-red-600 hover:bg-red-100 hover:text-red-800 dark:hover:bg-red-700 dark:hover:text-red-400 transition-colors duration-200"
                >
                    <AiOutlineDelete size={20} />
                </button>
            </div>

            <div className="mt-4 space-y-3 text-gray-700 dark:text-gray-300">
                <div className="flex items-center">
                    <FaMapMarkerAlt className="text-blue-500 dark:text-blue-400 mr-2" />
                    <span className="font-medium">Place:</span> {place}
                </div>
                <div className="flex items-center">
                    <FaCalendarAlt className="text-green-500 dark:text-green-400 mr-2" />
                    <span className="font-medium">Date:</span>{" "}
                    {toBengaliNumber(
                        new Date(startDate).toLocaleDateString("bn-BD", {
                            day: "numeric",
                            month: "numeric",
                            year: "numeric",
                        })
                    )}{" "}
                    -{" "}
                    {toBengaliNumber(
                        new Date(endDate).toLocaleDateString("bn-BD", {
                            day: "numeric",
                            month: "numeric",
                            year: "numeric",
                        })
                    )}
                </div>
                <div className="flex items-center">
                    <FaUsers className="text-purple-500 dark:text-purple-400 mr-2" />
                    <span className="font-medium">Farmers:</span>{" "}
                    {toBengaliNumber(farmers)}
                </div>
                <div className="flex items-center">
                    <FaCommentAlt className="text-yellow-500 dark:text-yellow-400 mr-2" />
                    <span className="font-medium">Comment:</span> {comment}
                </div>
            </div>

            <div className="mt-6">
                <ImageGallery
                    autoPlay={true}
                    items={imagesArr}
                    showThumbnails={true}
                    thumbnailPosition="bottom" // Thumbnails below the main image
                    showPlayButton={false} // Hide play button if not needed
                    showFullscreenButton={false} // Hide fullscreen button if not needed
                />
            </div>

            {loading && <DeletingLoader />}
        </div>
    );
};

export default DistributionCard;
