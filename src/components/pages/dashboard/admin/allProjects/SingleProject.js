import React, { useState } from "react";
import { toBengaliNumber } from "bengali-number";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { daeAction } from "../../../../store/projectSlice";
import { createRandomNumber } from "../../../../utilis/createRandomNumber";
import { deleteAProject, markProjectComplete, updateProjectCrops } from "../../../../../services/userServices";
import { makeSureOnline } from "../../../../shared/MessageConst";

import { FaEdit, FaTrashAlt, FaCheckCircle, FaSeedling, FaChevronDown, FaChevronUp, FaPlusCircle, FaTimes } from "react-icons/fa";

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
    <div className="card bg-base-100 shadow-xl mb-4">
      <div className="card-body">
        <h2 className="card-title flex justify-between cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
          {data?.name?.details}
          {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
        </h2>
        {isExpanded && (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">প্রকল্পের সংক্ষেপ নামঃ</h3>
              <p>{data?.name?.short}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">প্রকল্প পরিচালকের নামঃ</h3>
                <p>{data?.projectDetails?.PD}</p>
              </div>
              <div>
                <h3 className="font-semibold">মনিটরিং অফিসারদের নামঃ</h3>
                <p>{data?.projectDetails?.monitoringOfficers}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h3 className="font-semibold">প্রকল্প শুরুর তারিখঃ</h3>
                <p>{toBengaliNumber(new Date(data?.time?.start).toLocaleDateString())}</p>
              </div>
              <div>
                <h3 className="font-semibold">প্রকল্প শেষের সম্ভাব্য তারিখঃ</h3>
                <p>{toBengaliNumber(new Date(data?.time?.end).toLocaleDateString())}</p>
              </div>
              <div>
                <h3 className="font-semibold">প্রকল্পের ই-মেইলঃ</h3>
                <p>{data?.email}</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">প্রদর্শনীর ধরণ / প্রযুক্তি:</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {allCrops.map((crop, index) => (
                  <span key={index} className="badge badge-secondary gap-1">
                    <FaSeedling className="inline-block" />
                    {crop}
                    <FaTimes className="inline-block cursor-pointer" onClick={() => handleCropUpdate(index)} />
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="নতুন প্রযুক্তি যুক্ত করুন"
                  className="input input-bordered w-full"
                  value={crop}
                  onChange={(e) => setCrop(e.target.value)}
                />
                <button className="btn btn-primary" onClick={handleCropAdding} disabled={!crop.trim()}>
                  <FaPlusCircle className="mr-2" /> যুক্ত করুন
                </button>
              </div>
              <button
                className="btn btn-primary w-full mt-2"
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
            <div className="flex flex-wrap gap-2">
              {!data?.end && (
                <Link to={`/dashboard/addproject?id=${data?._id}`}>
                  <button className="btn btn-outline">
                    <FaEdit className="mr-2" /> এডিট করুন
                  </button>
                </Link>
              )}
              <button className="btn btn-error" onClick={() => handleProjectDeleting(data?._id)}>
                <FaTrashAlt className="mr-2" /> প্রকল্প মুছে দিন
              </button>
              {!data?.end && (
                <button className="btn btn-success" onClick={() => handleProjectCompletion(data?._id)}>
                  <FaCheckCircle className="mr-2" /> সমাপ্ত ঘোষণা করুন
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleProject;