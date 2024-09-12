import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaUsers, FaEdit, FaTrash } from 'react-icons/fa';
import ImageGallery from 'react-image-gallery';
import { toBengaliNumber } from 'bengali-number';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { deleteADistribution } from '../../../../../services/userServices';
import { daeAction } from '../../../../store/projectSlice';

const DistributionCard = ({ distribution }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const handleDeleteDistribution = async () => {
        if (window.confirm(`আপনি কি ${distribution.projectInfo?.short} প্রকল্পের ${distribution.time?.season}/${distribution.time?.fiscalYear} মৌসুমের উপকরণ বিতরণ তথ্য মুছে ফেলতে চান?`)) {
            try {
                setLoading(true);
                const result = await deleteADistribution(distribution._id);
                if (result.status === 200) {
                    toast.success("উপকরণ বিতরণ তথ্য সফলভাবে মুছে ফেলা হয়েছে");
                    dispatch(daeAction.setRefetch(`distributions${Date.now()}`));
                }
            } catch (err) {
                toast.error("উপকরণ বিতরণ তথ্য মুছে ফেলতে সমস্যা হচ্ছে।");
            } finally {
                setLoading(false);
            }
        }
    };

    const imagesArr = distribution.images?.map(image => ({ original: image, thumbnail: image })) || [];

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
            <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">{distribution.materialName}</h2>
                <p className="text-sm text-gray-600 mb-4">{distribution.projectInfo?.short}</p>

                <div className="flex items-center mb-4 text-sm text-gray-700">
                    <FaCalendarAlt className="text-blue-600 mr-2" />
                    <span>
                        {toBengaliNumber(new Date(distribution.time?.date).toLocaleDateString("bn-BD", {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        }))}
                    </span>
                </div>

                <div className="flex items-center mb-4 text-sm text-gray-700">
                    <FaUsers className="text-green-600 mr-2" />
                    <span>
                        অতিথিঃ {toBengaliNumber(distribution.presentGuests)} জন
                    </span>
                </div>

                {imagesArr.length > 0 && (
                    <div className="mb-4">
                        <ImageGallery
                            items={imagesArr}
                            showFullscreenButton={false}
                            showPlayButton={false}
                            showNav={true}
                            showThumbnails={false}
                            showBullets={true} // Added bullets for image control
                            autoPlay={true}
                        />
                    </div>
                )}

                <p className="text-sm text-gray-500 italic">{distribution.comment}</p>
            </div>

            <div className="bg-blue-100 px-6 py-4 flex justify-between items-center">
                <span className="text-sm text-gray-700">
                    {distribution.time?.season} | {distribution.time?.fiscalYear}
                </span>
                <div className="flex space-x-4">
                    <Link to={`editDistribution?id=${distribution._id}`} className="text-blue-600 hover:text-blue-700" title="Edit Distribution">
                        <FaEdit size={20} />
                    </Link>
                    <button onClick={handleDeleteDistribution} disabled={loading} className="text-red-600 hover:text-red-700" title="Delete Distribution">
                        <FaTrash size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DistributionCard;
