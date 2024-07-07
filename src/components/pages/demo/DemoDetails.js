import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleDemoById } from "../../../services/userServices";
import toast from "react-hot-toast";
import Loader from "../../shared/Loader";
import NoContentFound from "../../shared/NoContentFound";
import { CiCalendarDate } from "react-icons/ci";
import { BsFillCloudSunFill } from "react-icons/bs";
import { GrTechnology } from "react-icons/gr";
import { FaBowlRice } from "react-icons/fa6";
import { toBengaliNumber } from "bengali-number";
import { MdOutlinePlace } from "react-icons/md";
import { notGivenFinalReportMessage } from "../../shared/MessageConst";
import { AuthContext } from "../../AuthContext/AuthProvider";
import { FaPlus } from "react-icons/fa";
import AddImageModal from "../../shared/AddImageModal";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { useSelector } from "react-redux";


function DemoDetails() {
  const { user } = useContext(AuthContext)
  const { refetchDemoDetails } = useSelector(state => state.dae)
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [demoData, setDemoData] = useState(null);
  const [fetchEnd, setFetchEnd] = useState(false);
  const [modalData, setModalData] = useState(null)
  const handleModaOpen = (dataValues) => {
    document.getElementById("my_modal_1")?.showModal();
  };
  useEffect(() => {
    if (id) {
      const fetchDemoData = async () => {
        try {
          const result = await getSingleDemoById(id);
          if (result?.status === 200) {
            setDemoData(result?.data?.data);
            setLoading(false);
            setFetchEnd(true);
          }
        } catch (err) {
          toast.error(
            "প্রদর্শনীটির তথ্য পেতে সমস্যা হচ্ছে । দয়া করে সংশ্লিষ্ট কর্তৃপক্ষকে অবহিত করুন।"
          );
          setFetchEnd(true);
        }
      };
      fetchDemoData();
    }
  }, [id, refetchDemoDetails]);

  const CardWrapper = ({ children, title }) => {
    return (
      <div className="col-span-1 sm:col-span-3 grid grid-cols-1 sm:grid-cols-2 bg-white rounded-xl p-4 gap-4">
        <h2
          id="Unbounded"
          className="col-span-1 sm:col-span-2 font-bold text-ter text-2xl "
        >
          {title}
        </h2>
        {children}
      </div>
    );
  };
  return (
    <div className="bg-slate-100 text-black mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      {!loading && fetchEnd && demoData && (
        <div className="py-20">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="col-span-1 bg-white flex justify-center items-center  rounded-xl overflow-hidden">
              <img
                src={demoData?.demoImages[1]?.image[0] || '/images/pi/pi2.jpg'}
                className="h-[100%] m-auto max-h-64"
                alt="User Image"
              />
            </div>
            {/* Top Card */}
            <div className="col-span-1 sm:col-span-2 bg-white rounded-xl shadow-xl p-4 flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <h3 className="text-black text-2xl font-bold">
                  {demoData?.projectInfo?.full} ({demoData?.projectInfo?.short})
                </h3>
              </div>
              <div className="flex gap-4 items-center">
                <CiCalendarDate fontSize={25} />
                <h3>অর্থবছরঃ {demoData?.demoTime?.fiscalYear}</h3>
              </div>
              <div className="flex gap-4 items-center">
                <BsFillCloudSunFill

                  fontSize={25}
                />
                <h3>মৌসুমঃ {demoData?.demoTime?.season}</h3>
              </div>
              <div className="flex gap-4 items-center">
                <GrTechnology fontSize={25} />
                <h3>প্রযুক্তিঃ {demoData?.demoInfo?.tech}</h3>
              </div>
              <div className="flex gap-4 items-center">
                <FaBowlRice fontSize={25} />
                <h3>ফসলঃ {demoData?.demoInfo?.crop}</h3>
              </div>
              <div className="flex gap-4 items-center">
                <FaBowlRice fontSize={25} />
                <h3>জাতঃ {demoData?.demoInfo?.variety}</h3>
              </div>
              <div className="flex gap-4">
                <MdOutlinePlace fontSize={25} />
                <h3>প্রদর্শনীর আয়তনঃ {toBengaliNumber(demoData?.demoInfo?.area)} শতক</h3>
              </div>
            </div>

            {/* Basic Details */}
            <CardWrapper title="প্রদর্শনীপ্রাপ্ত কৃষকের তথ্য">
              <h3>
                নাম:
                <span className="font-semibold">
                  {demoData?.farmersInfo?.name}
                </span>
              </h3>
              <h3>
                পিতা/স্বামীর নাম:
                <span className="font-semibold">
                  {demoData?.farmersInfo?.fatherOrHusbandName}
                </span>
              </h3>
              <h3>
                গ্রাম:
                <span className="font-semibold">
                  {demoData?.address?.village}
                </span>
              </h3>
              <h3>
                ব্লক:
                <span className="font-semibold">
                  {demoData?.address?.block}
                </span>
              </h3>
              <h3>
                ইউনিয়ন:
                <span className="font-semibold">
                  {demoData?.address?.union}
                </span>
              </h3>
              <h3>
                মোবাইল নং:
                <span className="font-semibold">
                  {demoData?.numbersInfo?.mobile}
                </span>
              </h3>
              <h3>
                জাতীয় পরিচয়পত্র নং:
                <span className="font-semibold">
                  {demoData?.numbersInfo?.NID}
                </span>
              </h3>
              <h3>
                BID নং:
                <span className="font-semibold">
                  {demoData?.numbersInfo?.BID}
                </span>
              </h3>
              <h3>
                কৃষি কার্ড নং:
                <span className="font-semibold">
                  {demoData?.numbersInfo?.agri}
                </span>
              </h3>
            </CardWrapper>

            <CardWrapper title="প্রদর্শনীর সময় সম্পর্কিত তথ্য">
              <h3>
                বপণ:{" "}
                <span className="font-semibold">
                  {new Date(demoData?.demoDate?.bopon).toLocaleString('bn-BD', {
                    day: 'numeric',
                    month: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              </h3>
              <h3>
                রোপণ :{" "}
                <span className="font-semibold">
                  {new Date(demoData?.demoDate?.ropon).toLocaleString('bn-BD', {
                    day: 'numeric',
                    month: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              </h3>

              <h3>
                কর্তন:{" "}
                <span className="font-semibold">
                  {demoData?.demoDate?.korton?.startDate ? (
                    <>
                      {new Date(demoData?.demoDate?.korton?.startDate).toLocaleString('bn-BD', {
                        day: 'numeric',
                        month: 'numeric',
                        year: 'numeric'
                      })}
                      {" "}থেকে{" "}
                      {new Date(demoData?.demoDate?.korton?.endDate).toLocaleString('bn-BD', {
                        day: 'numeric',
                        month: 'numeric',
                        year: 'numeric'
                      })}
                    </>
                  ) : (
                    "এখনো চূড়ান্ত প্রতিবেদন দেওয়া হয়নি"
                  )}
                </span>
              </h3>
            </CardWrapper>
            <CardWrapper title="প্রদর্শনীর ফলন সম্পর্কিত তথ্য">
              <h3>
                প্রতি হেক্টরে ফলন:{" "}
                <span className="font-semibold">
                  {demoData?.production?.productionPerHector ?
                    toBengaliNumber(demoData?.production?.productionPerHector) + `মেঃটন` : notGivenFinalReportMessage
                  }
                </span>
              </h3>
              <h3>
                প্রদর্শনীতে ফলন :{" "}
                <span className="font-semibold">
                  {demoData?.production?.totalProduction ?
                    toBengaliNumber(demoData?.production?.totalProduction) + `মেঃটন` : notGivenFinalReportMessage
                  }
                </span>
              </h3>

              <h3>
                কন্ট্রোল প্লটে ফলন/হেঃ:{" "}
                <span className="font-semibold">
                  {demoData?.production?.sidePlotProduction ?
                    toBengaliNumber(demoData?.production?.sidePlotProduction) + `মেঃটন` : notGivenFinalReportMessage
                  }
                </span>
              </h3>
            </CardWrapper>
            <CardWrapper title="প্রদর্শনী সম্পর্কে মন্তব্য">
              <h3>
                কৃষকের মন্তব্য:{" "}
                <span className="font-semibold">
                  {demoData?.comment?.farmersReview}
                </span>
              </h3>
              <h3>
                অন্যান্য মন্তব্য:{" "}
                <span className="font-semibold">
                  {demoData?.comment?.overallComment}
                </span>
              </h3>
            </CardWrapper>
            <CardWrapper title="উপসহকারী কৃষি কর্মকর্তা সম্পর্কিত তথ্য">
              <h3>
                নাম:{" "}
                <span className="font-semibold">
                  {demoData?.SAAO?.name}
                </span>
              </h3>
              <h3>
                মোবাইল নং:{" "}
                <span className="font-semibold">
                  {demoData?.SAAO?.mobile}
                </span>
              </h3>
            </CardWrapper>

          </div>
          <div
            className="mt-5 bg-white  p-4 rounded-xl"
          >
            <h2
              className="col-span-1 mb-3 sm:col-span-2 font-bold text-2xl "
            >
              প্রদর্শনী পরিদর্শন সংক্রান্ত এবং কর্মকর্তাগণ দ্বারা পরিভ্রমণের বিস্তারিত
            </h2>
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-center  text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr className="text-lg">
                    <th scope="col" className="px-6 py-3">
                      ক্রমিক নং
                    </th>
                    <th scope="col" className="px-6 py-3">
                      পরিদর্শনের তারিখ
                    </th>
                    <th scope="col" className="px-6 py-3">
                      বর্তমান অবস্থা
                    </th>
                    <th scope="col" className="px-6 py-3">
                      উপস্থিত কর্মকর্তাগণ
                    </th>
                    <th scope="col" className="px-6 py-3">
                      ছবি
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Mapping over education data */}
                  {demoData?.demoImages?.length > 0 && demoData?.demoImages?.map((single, index) =>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4">{toBengaliNumber(index + 1)}</td>
                      <td className="px-6 py-4">{new Date(single?.date).toLocaleString('bn-BD', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      })}</td>
                      <td className="px-6 py-4">{single?.presentCondition}</td>
                      <td className="px-6 py-4">{single?.presentOfficer}</td>
                      <td className="px-6 py-4">
                        <PhotoProvider>
                          <div className="foo justify-center flex gap-3">
                            {single?.image?.map((item, index) => (
                              <PhotoView key={index} src={item}>
                                <img width={100} src={item} alt="" />
                              </PhotoView>
                            ))}
                          </div>
                        </PhotoProvider>
                      </td>
                    </tr>)}

                </tbody>
              </table>
              {
                user?.username === demoData?.username && <div onClick={(demoData) => handleModaOpen(demoData)} className="flex mt-4 items-center justify-center ">
                  <div className="rounded-full cursor-pointer text-white theme-bg w-20 h-20 flex items-center justify-center">
                    <FaPlus size={30} />
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      )}
      {!fetchEnd && loading && (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      )}
      {!loading && fetchEnd && !demoData && (
        <NoContentFound text={"প্রদর্শনী খুজে পাওয়া যায়নি।"} />
      )}
      {demoData && <AddImageModal data={demoData} />}
    </div>
  );
}

export default DemoDetails;
