import React, { useState } from "react";
import Title from "../../../../shared/Title";
import { toBengaliNumber } from "bengali-number";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { CiCirclePlus } from "react-icons/ci";
import toast from "react-hot-toast";
import { FiCheckCircle } from "react-icons/fi";
import { createRandomNumber } from "../../../../utilis/createRandomNumber";

import {
  deleteAProject,
  markProjectComplete,
  updateProjectCrops,
} from "../../../../../services/userServices";
import { RiDeleteBin5Line } from "react-icons/ri";
import { makeSureOnline } from "../../../../shared/MessageConst";
import { useDispatch } from "react-redux";
import { daeAction } from "../../../../store/projectSlice";

const SingleProject = ({ data, index }) => {
  const [allCrops, setAllCrops] = useState(data?.crops);
  const [crop, setCrop] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
  const handleCropUpdate = (cropIndex) => {
    let allCropsData = [...allCrops];
    const result = allCropsData.splice(cropIndex, 1);
    setAllCrops([...allCropsData]);
  };
  const handleCropAdding = () => {
    setAllCrops([...allCrops, crop]);
    setCrop("");
  };
  // প্রকল্পের প্রদর্শনীর ধরণ / প্রযুক্তি যুক্ত অথবা মুছুন
  const handleAddCrop = () => {
    setLoading(true);
    const addCropsToTheProject = async () => {
      try {
        if (allCrops?.length < 1) {
          toast.error("কমপক্ষে একটি প্রদর্শনীর ধরণ / প্রযুক্তি যুক্ত করুন");
          return;
        }
        const updatedDoc = { id: data?._id, crops: allCrops };
        const result = await updateProjectCrops(updatedDoc);
        if (result?.status === 200) {
          toast.success(result?.data?.message);
          setLoading(false);
          dispatch(daeAction.setRefetch(`adminFetch${createRandomNumber()}`))
        }
      } catch (err) {
        setLoading(false);
        toast.error(
          "কোনো সমস্যা হয়েছে। দয়া করে পুনরায় চেষ্টা করুন অথবা সংশ্লিষ্ট ব্যক্তিকে অবহিত করুন"
        );
      }
    };
    if (navigator.onLine) {
      addCropsToTheProject();
    } else {
      makeSureOnline();
    }
  };
  // প্রকল্প মুছুন

  const handleProjectDeleting = (projectId) => {
    const handleDelete = async () => {
      try {
        if (
          window.confirm(
            `আপনি কি ${data?.name?.details} নামের প্রকল্পটি মুছে দিতে চান?`
          )
        ) {
          if (!projectId) {
            return toast.error(
              "কিছু সমস্যা হয়েছে। পুনরায় রিলোড করুন অথবা সংশ্লিষ্ট ব্যক্তিকে অবহিত করুন"
            );
          }
          const result = await deleteAProject(projectId); // Assuming deleteProject is a function that handles the deletion
          if (result?.status === 200) {
            toast.success("প্রকল্পটি মুছে দেয়া হয়েছে");
            dispatch(daeAction.setRefetch(`adminFetch${createRandomNumber()}`))
          }
        } else {
          toast.error("প্রকল্প মুছে ফেলা সম্ভব হয়নি। আবার চেষ্টা করুন");
        }
      } catch (err) {
        toast.error("প্রকল্প মুছে ফেলা সম্ভব হয়নি। আবার চেষ্টা করুন");
      }
    };

    if (navigator.onLine) {
      handleDelete();
    } else {
      makeSureOnline();
    }
  };

  // Handle Project completion
  const handleProjectCompletion = async (id) => {

    if (!id) {
      return toast.error("প্রকল্পের তথ্য পেতে সমস্যা হচ্ছে।");
    }
    try {
      if (
        window.confirm(
          `আপনি কি ${data?.name?.details}-কে সম্পন্ন হিসেবে চিহ্নিত করতে চান?`
        )
      ) {
        const result = await markProjectComplete(id);
        if (result?.status === 200) {
          toast.success(result?.data?.message);
          dispatch(daeAction.setRefetch(`adminFetch${createRandomNumber}`))
        }
      }
    } catch (err) {
      toast.error(
        "প্রকল্প সম্পন্ন করতে অসুবিধার সৃষ্টি হচ্ছে। দয়া করে সংশ্লিষ্ট কর্তৃপক্ষকে অবহিত করুন।"
      );
    }
  };
  return (
    <div className="collapse">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium">
        <Title end={data?.end} title={data?.name?.details} />
      </div>
      <div className="collapse-content bg-white flex flex-col gap-2">
        <h2 className="text-xl  pt-8 pb-5 font-bold items-center">
          প্রকল্পের পুরো নামঃ {data?.name?.details}



        </h2>
        <h2 className="text-xl font-bold">
          প্রকল্পের সংক্ষেপ নামঃ {data?.name?.short}
        </h2>
        <div className="flex gap-10">
          <p className="font-bold">
            প্রকল্প পরিচালকের নামঃ {data?.projectDetails?.PD},
          </p>
          <p className="font-bold">
            মনিটরিং অফিসারদের নামঃ {data?.projectDetails?.monitoringOfficers}
          </p>
        </div>
        <div className="flex gap-6">
          <p className="font-bold">
            প্রকল্প শুরুর তারিখঃ
            {toBengaliNumber(new Date(data?.time?.start).toLocaleDateString())}
          </p>
          <p className="font-bold">
            প্রকল্প শেষের সম্ভাব্য তারিখঃ
            {toBengaliNumber(new Date(data?.time?.end).toLocaleDateString())}
          </p>
          <p className="font-bold">প্রকল্পের ই-মেইলঃ {data?.email}</p>
        </div>
        <div className="overflow-x-auto">
          {data?.crops?.length > 0 && allCrops?.length > 0 && (
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>ক্রমিক নং</th>
                  <th>প্রযুক্তির নাম</th>
                  <th> একশন</th>
                </tr>
              </thead>
              <tbody>
                {(data?.crops?.length > 0) & (allCrops?.length > 0) ? (
                  allCrops?.map((singleCrop, cropIndex) => (
                    <tr key={cropIndex}>
                      <th>{toBengaliNumber(cropIndex + 1)}</th>
                      <td>{singleCrop}</td>
                      <td>
                        <IoMdRemoveCircleOutline
                          onClick={() => handleCropUpdate(cropIndex)}
                          className="cursor-pointer"
                          size={25}
                          color="red"
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <span className="font-bold text-red-600 block mb-4">
                    কোনো প্রুযুক্তি যুক্ত করা হয়নি। দয়া করে প্রকল্পের
                    প্রযুক্তিগুলো যুক্ত করুন
                  </span>
                )}
              </tbody>
            </table>
          )}
          <label className="font-extrabold mb-1 block">
            প্রদর্শনীর ধরণ বা প্রযুক্তি যুক্ত করুন
          </label>
          <div className="relative mx-1">
            <input
              type="text"
              onChange={(e) => setCrop(e.target.value)}
              className="input input-bordered relative w-full"
              value={crop}
            />
            <CiCirclePlus
              onClick={handleCropAdding}
              className="absolute cursor-pointer right-0 top-0"
              size={50}
              color="green"
            />
          </div>
          {!loading ? (
            <>
              <button
                type="button"
                className="btn mt-2 w-full font-extrabold text-white theme-bg"
                onClick={handleAddCrop}
              >
                প্রদর্শনীর ধরণ বা প্রযুক্তি যুক্ত করুন
              </button>
            </>
          ) : (
            <div className="flex mt-4 justify-center items-center">
              <span className="loading bg-green-500 loading-bars loading-lg"></span>
            </div>
          )}
        </div>
        {/* Acion Buttons */}
        <div className="mt-8 flex gap-1">
          {!data?.end &&
            <Link
              className="flex justify-center items-center"
              to={`/dashboard/addproject?id=${data?._id}`}
            >
              <button className="btn btn-info text-white font-extrabold">
                <CiEdit size={20} cursor={"pointer"} /> এডিট করুন
              </button>
            </Link>
          }


          <button
            onClick={() => handleProjectDeleting(data?._id)}
            className="btn bg-red-500  text-white font-extrabold"
          >
            <RiDeleteBin5Line size={20} cursor={"pointer"} /> প্রকল্প মুছে
            দিন
          </button>
          {!data?.end &&
            <button
              onClick={() => handleProjectCompletion(data?._id)}
              className="btn btn-success text-white font-extrabold "
            >
              <FiCheckCircle size={20} cursor={"pointer"} /> সমাপ্ত ঘোষণা করুন
            </button>
          }
        </div>
      </div>
    </div>
  );
};

export default SingleProject;
