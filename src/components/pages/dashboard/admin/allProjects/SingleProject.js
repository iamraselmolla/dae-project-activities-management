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
import { FaEnvelope, FaUser, FaUsers, FaUserTie } from "react-icons/fa6";

const SingleProject = ({ data, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [allCrops, setAllCrops] = useState(data?.crops);
  const [crop, setCrop] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleCropUpdate = (cropIndex) => {
    let allCropsData = [...allCrops];
    allCropsData.splice(cropIndex, 1);
    setAllCrops(allCropsData);
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
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden mb-6 transition-all duration-300 ease-in-out hover:shadow-xl ${data?.end ? 'border-l-8 border-green-500' : 'border border-gray-200'}`}>
      <div className={`${data?.end ? 'bg-green-100' : 'bg-blue-50'} text-gray-800 p-4 cursor-pointer`} onClick={() => setIsExpanded(!isExpanded)}>
        <h2 className="text-xl font-bold flex justify-between items-center">
          <span className="flex items-center">
            {data?.end ? (
              <FaCheckCircle className="text-green-500 mr-2" />
            ) : (
              <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
            )}
            {data?.name?.details}
          </span>
          {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
        </h2>
        <p className="text-sm opacity-75">{data?.name?.short}</p>
      </div>
      {isExpanded && (
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-semibold flex items-center mb-4">
                <FaUserTie className="mr-2 text-blue-600 text-3xl" /> প্রকল্প পরিচালক
              </h3>
              <p className="text-gray-700 text-lg">{data?.projectDetails?.PD}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-semibold flex items-center mb-4">
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
                <span key={index} className="bg-white px-3 py-2 rounded-full text-sm font-medium text-gray-700 shadow-sm border border-gray-200 flex items-center transition-all duration-200 hover:shadow-md hover:border-green-300">
                  <FaSeedling className="mr-2 text-green-500" />
                  {crop}
                  <FaTimes className="ml-2 cursor-pointer text-red-500 hover:text-red-700" onClick={() => handleCropUpdate(index)} />
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="নতুন প্রযুক্তি যুক্ত করুন"
                className="input input-bordered w-full bg-white"
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
              />
              <button className="btn bg-green-500 text-white hover:bg-green-600" onClick={handleCropAdding} disabled={!crop.trim()}>
                <FaPlusCircle className="mr-2" /> যুক্ত করুন
              </button>
            </div>
            <button
              className="btn theme-bg text-white hover:bg-blue-600 w-full mt-4"
              onClick={handleAddCrop}
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "প্রদর্শনীর ধরণ বা প্রযুক্তি সংরক্ষণ করুন"
              )}
            </button>
          </div>

          <div className="flex flex-wrap gap-4 justify-end">
            {!data?.end && (
              <Link to={`/dashboard/addproject?id=${data?._id}`}>
                <button className="btn btn-outline border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-300">
                  <FaEdit className="mr-2" /> এডিট করুন
                </button>
              </Link>
            )}
            <button className="btn bg-red-500 text-white hover:bg-red-600 transition-colors duration-300" onClick={() => handleProjectDeleting(data?._id)}>
              <FaTrashAlt className="mr-2" /> প্রকল্প মুছে দিন
            </button>
            {!data?.end && (
              <button className="btn bg-green-500 text-white hover:bg-green-600 transition-colors duration-300" onClick={() => handleProjectCompletion(data?._id)}>
                <FaCheckCircle className="mr-2" /> সমাপ্ত ঘোষণা করুন
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProject;