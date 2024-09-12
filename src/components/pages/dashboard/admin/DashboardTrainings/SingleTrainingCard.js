import React, { useState } from 'react';
import { FaCalendarAlt, FaUsers, FaEdit, FaTrash } from 'react-icons/fa';
import { toBengaliNumber } from 'bengali-number';
import ImageGallery from 'react-image-gallery';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { daeAction } from '../../../../store/projectSlice';
import { deleteATraining } from '../../../../../services/userServices';
import toast from 'react-hot-toast';

const SingleTrainingCard = ({ training, index }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleTrainingDelete = async () => {
    if (window.confirm(`আপনি কি ${training.projectInfo?.short} প্রকল্পের ${toBengaliNumber(training.date?.startDate)} তারিখের ${training.subject} শিরোনামের প্রশিক্ষণ ডিলিট করতে চান?`)) {
      try {
        setLoading(true);
        const result = await deleteATraining(training._id);
        if (result.status === 200) {
          toast.success("প্রশিক্ষণ সফলভাবে মুছে দেয়া হয়েছে");
          dispatch(daeAction.setRefetch(`trainings${Date.now()}`));
        }
      } catch (err) {
        toast.error("প্রশিক্ষণ মুছতে সমস্যা হচ্ছে।");
      } finally {
        setLoading(false);
      }
    }
  };

  const imagesArr = training.images?.map(image => ({ original: image, thumbnail: image })) || [];

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">{training.subject}</h2>
        <p className="text-sm text-gray-600 mb-4">{training.projectInfo?.short}</p>

        <div className="flex items-center mb-4 text-sm text-gray-700">
          <FaCalendarAlt className="text-blue-600 mr-2" />
          <span>
            {toBengaliNumber(new Date(training.date?.startDate).toLocaleDateString("bn-BD", {
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
            কৃষকঃ {toBengaliNumber(training.farmers?.male)} জন,
            কৃষাণীঃ {toBengaliNumber(training.farmers?.female)} জন,
            মোটঃ {toBengaliNumber(training.farmers?.male + training.farmers?.female)} জন
          </span>
        </div>

        <p className="text-sm text-gray-700 mb-4">{training.guests}</p>

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

        <p className="text-sm text-gray-500 italic">{training.comment}</p>
      </div>

      <div className="bg-blue-100 px-6 py-4 flex justify-between items-center">
        <span className="text-sm text-gray-700">
          {training.fiscalYear} | {training.season}
        </span>
        <div className="flex space-x-4">
          <Link to={`addTraining?id=${training._id}`} className="text-blue-600 hover:text-blue-700" title="Edit Training">
            <FaEdit size={20} />
          </Link>
          <button onClick={handleTrainingDelete} disabled={loading} className="text-red-600 hover:text-red-700" title="Delete Training">
            <FaTrash size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleTrainingCard;
