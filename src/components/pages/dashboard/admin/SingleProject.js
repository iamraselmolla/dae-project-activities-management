import React, { useState } from "react";
import Title from "../../../shared/Title";
import { toBengaliNumber } from "bengali-number";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { CiCirclePlus } from "react-icons/ci";
import toast from "react-hot-toast";
import { deleteAProject, updateProjectCrops } from "../../../../services/userServices";
import { RiDeleteBin5Line } from "react-icons/ri";
import { makeSureOnline } from "../../../shared/MessageConst";


const SingleProject = ({ data, index, setRefetch, refetch }) => {
    const [allCrops, setAllCrops] = useState(data?.crops);
    const [crop, setCrop] = useState("");
    const [loading, setLoading] = useState(false);
    const handleCropUpdate = (cropIndex) => {
        const result = allCrops.splice(cropIndex, 1);
        setAllCrops([...allCrops]);
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
                    setRefetch(!refetch);
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
                if (window.confirm(`আপনি কি ${data?.name?.details} নামের প্রকল্পটি মুছে দিতে চান?`)) {
                    if (!projectId) {
                        return toast.error("কিছু সমস্যা হয়েছে। পুনরায় রিলোড করুন অথবা সংশ্লিষ্ট ব্যক্তিকে অবহিত করুন")
                    }
                    const result = await deleteAProject(projectId); // Assuming deleteProject is a function that handles the deletion
                    if (result?.status === 200) {
                        toast.success("প্রকল্পটি মুছে দেয়া হয়েছে");
                        setRefetch(!refetch);
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
    return (
        <div className="collapse">
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">
                <Title title={data?.name?.details} />
            </div>
            <div className="collapse-content flex flex-col gap-2">
                <h2 className="text-xl flex gap-5 font-bold items-center">
                    <span>প্রকল্পের পুরো নামঃ {data?.name?.details}</span>{" "}
                    <span className="ml-3 flex gap-5">
                        <Link to={`/dashboard/addproject?id=${data?._id}`}>
                            <CiEdit size={40} color="green" cursor={"pointer"} />
                        </Link>

                        <RiDeleteBin5Line onClick={() => handleProjectDeleting(data?._id)} size={40} color="red" cursor={"pointer"} />
                    </span>
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
                        প্রকল্প শুরুর তারিখঃ{" "}
                        {toBengaliNumber(new Date(data?.time?.start).toLocaleDateString())}
                    </p>
                    <p className="font-bold">
                        প্রকল্প শেষের সম্ভাব্য তারিখঃ{" "}
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
                                        <tr>
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
                                className="btn mt-2 w-full font-extrabold text-white btn-info"
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
            </div>
        </div>
    );
};

export default SingleProject;
