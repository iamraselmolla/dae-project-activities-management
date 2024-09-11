import React, { useState } from "react";
import { toBengaliNumber } from "bengali-number";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { daeAction } from "../../../../store/projectSlice";
import { createRandomNumber } from "../../../../utilis/createRandomNumber";
import { deleteAProject, markProjectComplete, updateProjectCrops } from "../../../../../services/userServices";
import { makeSureOnline } from "../../../../shared/MessageConst";
import { FaEdit, FaTrashAlt, FaCheckCircle, FaSeedling, FaChevronDown, FaChevronUp, FaPlusCircle, FaTimes, FaCalendarAlt } from "react-icons/fa";
import { FaEnvelope, FaUserTie, FaUsers } from "react-icons/fa6";

const SingleProject = ({ data, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [allCrops, setAllCrops] = useState(data?.crops);
  const [crop, setCrop] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleCropUpdate = (cropIndex) => {
    let updatedCrops = [...allCrops];
    updatedCrops.splice(cropIndex, 1);
    setAllCrops(updatedCrops);
  };

  const handleCropAdding = () => {
    if (crop.trim()) {
      setAllCrops([...allCrops, crop.trim()]);
      setCrop("");
    }
  };

  const handleAddCrop = async () => {
    setLoading(true);
    try {
      if (allCrops.length < 1) {
        toast.error("কমপক্ষে একটি প্রদর্শনীর ধরণ / প্রযুক্তি যুক্ত করুন");
        setLoading(false);
        return;
      }
      const updatedDoc = { id: data?._id, crops: allCrops };
      const result = await updateProjectCrops(updatedDoc);
      if (result?.status === 200) {
        toast.success(result?.data?.message);
        dispatch(daeAction.setRefetch(`adminFetch${createRandomNumber()}`));
      }
    } catch (err) {
      toast.error("কোনো সমস্যা হয়েছে। দয়া করে পুনরায় চেষ্টা করুন অথবা সংশ্লিষ্ট ব্যক্তিকে অবহিত করুন");
    }
    setLoading(false);
  };

  const handleProjectDeleting = async (projectId) => {
    if (!navigator.onLine) {
      return makeSureOnline();
    }
    if (!window.confirm(`আপনি কি ${data?.name?.details} নামের প্রকল্পটি মুছে দিতে চান?`)) {
      return;
    }
    try {
      const result = await deleteAProject(projectId);
      if (result?.status === 200) {
        toast.success("প্রকল্পটি মুছে দেয়া হয়েছে");
        dispatch(daeAction.setRefetch(`adminFetch${createRandomNumber()}`));
      }
    } catch (err) {
      toast.error("প্রকল্প মুছে ফেলা সম্ভব হয়নি। আবার চেষ্টা করুন");
    }
  };

  const handleProjectCompletion = async (id) => {
    if (!id) {
      return toast.error("প্রকল্পের তথ্য পেতে সমস্যা হচ্ছে।");
    }
    if (!window.confirm(`আপনি কি ${data?.name?.details}-কে সম্পন্ন হিসেবে চিহ্নিত করতে চান?`)) {
      return;
    }
    try {
      const result = await markProjectComplete(id);
      if (result?.status === 200) {
        toast.success(result?.data?.message);
        dispatch(daeAction.setRefetch(`adminFetch${createRandomNumber()}`));
      }
    } catch (err) {
      toast.error("প্রকল্প সম্পন্ন করতে অসুবিধার সৃষ্টি হচ্ছে। দয়া করে সংশ্লিষ্ট কর্তৃপক্ষকে অবহিত করুন।");
    }
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden mb-6 transition-all duration-300 ease-in-out hover:shadow-lg 
        ${data?.end ? "border-l-8 border-green-500" : "border border-gray-200"}`}
    >
      <div
        className={`${data?.end ? "bg-green-50" : "bg-blue-50"} text-gray-800 p-4 cursor-pointer flex justify-between items-center`}
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <div className="flex items-center">
          {data?.end ? (
            <FaCheckCircle className="text-green-500 mr-2" />
          ) : (
            <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
          )}
          <div>
            <h2 className="text-lg font-semibold">{data?.name?.details}</h2>
            <p className="text-sm text-gray-600">{data?.name?.short}</p>
          </div>
        </div>
        {isExpanded ? <FaChevronUp className="text-gray-600" /> : <FaChevronDown className="text-gray-600" />}
      </div>

      {isExpanded && (
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-semibold flex items-center mb-2">
                <FaUserTie className="mr-2 text-blue-600 text-3xl" /> প্রকল্প পরিচালক
              </h3>
              <p className="text-gray-700 text-lg">{data?.projectDetails?.PD}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-semibold flex items-center mb-2">
                <FaUsers className="mr-2 text-green-600 text-3xl" /> মনিটরিং অফিসার
              </h3>
              <p className="text-gray-700 text-lg">{data?.projectDetails?.monitoringOfficers}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center bg-gray-50 p-3 rounded-lg border border-blue-200">
              <FaCalendarAlt className="text-blue-500 mr-3 text-xl" />
              <div>
                <h3 className="font-semibold">শুরুর তারিখ</h3>
                <p>{toBengaliNumber(new Date(data?.time?.start).toLocaleDateString("bn-BD"))}</p>
              </div>
            </div>
            <div className="flex items-center bg-gray-50 p-3 rounded-lg border border-red-200">
              <FaCalendarAlt className="text-red-500 mr-3 text-xl" />
              <div>
                <h3 className="font-semibold">শেষের সম্ভাব্য তারিখ</h3>
                <p>{toBengaliNumber(new Date(data?.time?.end).toLocaleDateString("bn-BD"))}</p>
              </div>
            </div>
            <div className="flex items-center bg-gray-50 p-3 rounded-lg border border-purple-200">
              <FaEnvelope className="text-purple-500 mr-3 text-xl" />
              <div>
                <h3 className="font-semibold">ই-মেইল</h3>
                <p>{data?.email}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="font-semibold mb-4 flex items-center">
              <FaSeedling className="mr-2 text-green-500 text-2xl" />
              প্রদর্শনীর ধরণ / প্রযুক্তি
            </h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {allCrops.map((crop, index) => (
                <span
                  key={index}
                  className="bg-white px-3 py-2 rounded-full text-sm font-medium text-gray-700 shadow-sm border border-gray-200 flex items-center transition-all duration-200 hover:shadow-md hover:border-green-300"
                >
                  <FaSeedling className="mr-2 text-green-500" />
                  {crop}
                  <FaTimes className="ml-2 cursor-pointer text-red-500 hover:text-red-700" onClick={() => handleCropUpdate(index)} />
                </span>
              ))}
            </div>
            <div className="flex items-center">
              <input
                type="text"
                className="flex-1 p-2 rounded-l-lg border-t border-b border-l border-gray-300 focus:outline-none focus:ring focus:ring-blue-100"
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                placeholder="প্রদর্শনীর ধরণ / প্রযুক্তি যোগ করুন"
              />
              <button
                onClick={handleCropAdding}
                className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-r-lg shadow hover:bg-blue-700 transition-all duration-200"
              >
                <FaPlusCircle />
              </button>
              <button
                onClick={handleAddCrop}
                disabled={loading}
                className={`ml-2 px-4 py-2 rounded-lg shadow ${loading ? "bg-gray-300" : "bg-green-600"} text-white font-semibold hover:bg-green-700 transition-all duration-200`}
              >
                {loading ? "অপেক্ষা করুন..." : "সংরক্ষণ করুন"}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <button
                onClick={() => handleProjectCompletion(data?._id)}
                className={`flex items-center px-4 py-2 rounded-lg font-semibold shadow ${data?.end ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-green-600 text-white hover:bg-green-700"
                  } transition-all duration-200`}
                disabled={data?.end}
              >
                <FaCheckCircle className="mr-2" />
                সম্পন্ন করুন
              </button>
              <Link
                to={`/project/edit/${data?._id}`}
                className="flex items-center px-4 py-2 bg-yellow-600 text-white rounded-lg font-semibold shadow hover:bg-yellow-700 transition-all duration-200"
              >
                <FaEdit className="mr-2" />
                সম্পাদনা করুন
              </Link>
            </div>
            <button
              onClick={() => handleProjectDeleting(data?._id)}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg font-semibold shadow hover:bg-red-700 transition-all duration-200"
            >
              <FaTrashAlt className="mr-2" />
              মুছে ফেলুন
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProject;
