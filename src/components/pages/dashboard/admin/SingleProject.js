import React, { useState } from 'react';
import Title from '../../../shared/Title';
import { toBengaliNumber } from "bengali-number";
import { MdOutlineDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { IoMdRemoveCircleOutline } from 'react-icons/io';
import { CiCirclePlus } from "react-icons/ci";



const SingleProject = ({ data, index }) => {
    const [allCrops, setAllCrops] = useState(data?.crops);
    const [crop, setCrop] = useState('')
    const handleCropUpdate = (cropIndex) => {
        const result = allCrops.splice(cropIndex, 1);
        setAllCrops([...allCrops])
    }
    const handleCropAdding = () => {
        setAllCrops([...allCrops, crop])
    }
    return (
        <div className="collapse">
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">
                <Title title={data?.name?.details} />
            </div>
            <div className="collapse-content flex flex-col gap-2">
                <h2 className="text-xl flex gap-5 font-bold items-center">
                    <span>প্রকল্পের পুরো নামঃ {data?.name?.details}</span> <span className="ml-3">
                        <Link to={`/dashboard/addproject?id=${data?._id}`}>
                            <CiEdit size={40} color='green' cursor={'pointer'} />
                        </Link>
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
                        প্রকল্প শুরুর তারিখঃ {toBengaliNumber(new Date(data?.time?.start).toLocaleDateString())}
                    </p>
                    <p className="font-bold">
                        প্রকল্প শেষের সম্ভাব্য তারিখঃ {toBengaliNumber(new Date(data?.time?.end).toLocaleDateString())}
                    </p>
                    <p className="font-bold">
                        প্রকল্পের ই-মেইলঃ {data?.email}
                    </p>
                </div>
                <div className="overflow-x-auto">
                    {data?.crops?.length > 0 && allCrops?.length > 0 && <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>ক্রমিক নং</th>
                                <th>প্রযুক্তির নাম</th>
                                <th> একশন</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.crops?.length > 0 & allCrops?.length > 0 ? allCrops?.map((singleCrop, cropIndex) => <tr>
                                <th>{toBengaliNumber(cropIndex + 1)}</th>
                                <td>{singleCrop}</td>
                                <td>
                                    <IoMdRemoveCircleOutline onClick={() => handleCropUpdate(cropIndex)} className="cursor-pointer" size={25} color="red" />
                                </td>
                            </tr>) : <span className='font-bold text-red-600 block mb-4'>
                                কোনো প্রুযুক্তি যুক্ত করা হয়নি। দয়া করে প্রকল্পের প্রযুক্তিগুলো যুক্ত করুন
                            </span>
                            }



                        </tbody>
                    </table>}
                    <label className="font-extrabold mb-1 block">
                        প্রদর্শনীর ধরণ বা প্রযুক্তি যুক্ত করুন
                    </label>
                    <div className='relative mx-1'>
                        <input
                            type="text"
                            onChange={(e) => setCrop(e.target.value)}
                            className="input input-bordered relative w-full"
                            value={crop}
                        />
                        <CiCirclePlus onClick={handleCropAdding} className='absolute cursor-pointer right-0 top-0' size={50} color='green' />
                    </div>
                    <button
                        type="button"
                        className="btn mt-2 w-full font-extrabold text-white btn-info"
                    // onClick={handleAddCrop}
                    >
                        প্রদর্শনীর ধরণ বা প্রযুক্তি যুক্ত করুন
                    </button>
                </div>


            </div>

        </div>
    );
};

export default SingleProject;