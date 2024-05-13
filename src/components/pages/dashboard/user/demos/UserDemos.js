import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { makeSureOnline } from "../../../../shared/MessageConst";
import { deleteUserDemo } from "../../../../../services/userServices";
import UserSingleDemoTableRow from "./UserSingleDemoTableRow";
import MarkDemoCompleteModal from "../../../../shared/MarkDemoCompleteModal";
import SectionTitle from "../../../../shared/SectionTitle";
import NoContentFound from "../../../../shared/NoContentFound";
import AddModuleButton from "../../../../shared/AddModuleButton";
import { useDispatch, useSelector } from "react-redux";
import { daeAction } from "../../../../store/projectSlice";

const UserDemos = () => {
  const {
    demos: userDemos,
    modalData,
    endFetch,
  } = useSelector((state) => state.dae);
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal = (data) => {
    dispatch(daeAction.setModalData(data));
    setShowModal(true);
    document.getElementById("my_modal_33")?.showModal();
  };
  const dispatch = useDispatch();
  const handleDemoDeleting = async (
    id,
    project,
    date,
    demoInfo,
    farmersInfo
  ) => {
    if (!id) {
      return toast.error(
        "প্রদর্শনীর id পাওয়া যায়নি। দয়া করে সংশ্লিষ্ট ব্যক্তিকে অবহিত করুন"
      );
    }
    if (navigator.onLine) {
      if (
        window.confirm(
          `আপনি কি ${project} প্রকল্পের ${date?.season}/${date.fiscalYear} মৌসুমের ${demoInfo?.tech} প্রযুক্তির ${demoInfo?.crop} প্রদর্শনীপ্রাপ্ত ${farmersInfo?.name} কৃষকের তথ্য মুছে ফেলতে চান ?`
        )
      ) {
        try {
          const result = await deleteUserDemo(id);
          if (result?.status === 200) {
            toast.success(result?.data?.message);
            dispatch(daeAction.setRefetch());
          }
        } catch (err) {
          toast.error();
          console.log(err);
        }
      }
    } else {
      makeSureOnline();
    }
  };

  const completedDemos = userDemos?.filter((demo) => demo?.completed);
  const incompleteDemos = userDemos?.filter((demo) => !demo?.completed);
  return (
    <>
      <div className="flex py-10 flex-col">
        <div className="mt-4 overflow-x-scroll">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <AddModuleButton
              link={"addDemo"}
              btnText={"প্রদর্শনী যুক্ত করুন"}
            />
            <div>
              <SectionTitle title={"চলমান প্রদর্শনী"} />
              <div className="border rounded-lg shadow overflow-hidden dark:border-gray-700 dark:shadow-gray-900">
                {incompleteDemos?.length > 0 && (
                  <table className="min-w-full bg-white  divide-y divide-gray-200 dark:divide-gray-700">
                    <thead>
                      <tr className="divide-x font-extrabold divide-gray-200 dark:divide-gray-700">
                        <th
                          scope="col"
                          className="py-4 font-extrabold px-2  text-black text-center uppercase"
                        >
                          ক্র: নং:
                        </th>
                        <th
                          scope="col"
                          className="py-4 font-extrabold px-2  text-black text-center uppercase"
                        >
                          প্রকল্প
                        </th>
                        <th
                          scope="col"
                          className="py-4 font-extrabold px-2  text-black text-center uppercase"
                        >
                          প্রদর্শনী সম্পর্কিত
                        </th>
                        <th
                          scope="col"
                          className="py-4 font-extrabold px-2  text-black text-center uppercase"
                        >
                          অর্থবছর ও মৌসুম
                        </th>
                        <th
                          scope="col"
                          className="py-4 font-extrabold px-2  text-black text-center uppercase"
                        >
                          কৃষকের নাম ও পিতার নাম
                        </th>
                        <th
                          scope="col"
                          className="py-4 font-extrabold px-2  text-black text-center uppercase"
                        >
                          ঠিকানা
                        </th>
                        <th
                          scope="col"
                          className="py-4 whitespace-nowrap font-extrabold px-2  text-black text-center uppercase"
                        >
                          মোবাইল, এনআইডি,
                          <br /> কৃষি কার্ড, বিআইডি
                        </th>
                        <th
                          scope="col"
                          className="py-4 font-extrabold px-2  text-black text-center uppercase"
                        >
                          বপন, রোপন ও কর্তন
                        </th>
                        <th
                          scope="col"
                          className="py-4 font-extrabold px-2  text-black text-center uppercase"
                        >
                          উৎপাদন সংক্রান্ত
                        </th>
                        <th
                          scope="col"
                          className="py-4 font-extrabold px-2  text-black text-center uppercase"
                        >
                          ভিজিট সংক্রান্ত
                        </th>
                        <th
                          scope="col"
                          className="py-4 font-extrabold px-2  text-black text-center uppercase"
                        >
                          মন্তব্য
                        </th>
                        <th
                          scope="col"
                          className=" py-4 font-extrabold px-2  text-black text-center uppercase"
                        >
                          SAAO-এর নাম ও মোবাইল নং
                        </th>
                        <th
                          scope="col"
                          className="py-4 font-extrabold px-2  text-black text-center uppercase"
                        >
                          একশন
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {endFetch &&
                        incompleteDemos?.length > 0 &&
                        incompleteDemos?.map((single, index) => (
                          <UserSingleDemoTableRow
                            handleDemoDeleting={handleDemoDeleting}
                            data={single}
                            index={index}
                            key={single?._id}
                            handleOpenModal={handleOpenModal}
                          />
                        ))}
                    </tbody>
                  </table>
                )}
                {endFetch && incompleteDemos?.length < 1 && (
                  <NoContentFound
                    text={"কোনো চলমান প্রদর্শনীর তথ্য পাওয়া যায়নি!!"}
                  />
                )}
              </div>
            </div>

            <div className="mt-20">
              <SectionTitle title={"চূড়ান্ত প্রদর্শনী"} />
              <div className="border rounded-lg shadow overflow-hidden dark:border-gray-700 dark:shadow-gray-900">
                {completedDemos?.length > 0 && (
                  <table className="min-w-full bg-white divide-y divide-gray-200 dark:divide-gray-700">
                    <thead>
                      <tr className="divide-x font-extrabold divide-gray-200 dark:divide-gray-700">
                        <th
                          scope="col"
                          className="py-4 font-extrabold px-2  text-black text-center uppercase"
                        >
                          ক্র: নং:
                        </th>
                        <th
                          scope="col"
                          className="py-4 font-extrabold px-2  text-black text-center uppercase"
                        >
                          প্রকল্প
                        </th>
                        <th
                          scope="col"
                          className="py-4 font-extrabold px-2  text-black text-center uppercase"
                        >
                          প্রদর্শনী সম্পর্কিত
                        </th>
                        <th
                          scope="col"
                          className="py-4 font-extrabold px-2  text-black text-center uppercase"
                        >
                          অর্থবছর ও মৌসুম
                        </th>
                        <th
                          scope="col"
                          className="py-4 font-extrabold px-2  text-black text-center uppercase"
                        >
                          কৃষকের নাম ও পিতার নাম
                        </th>
                        <th
                          scope="col"
                          className="py-4 font-extrabold px-2  text-black text-center uppercase"
                        >
                          ঠিকানা
                        </th>
                        <th
                          scope="col"
                          className="py-4 whitespace-nowrap font-extrabold px-2  text-black text-center uppercase"
                        >
                          মোবাইল, এনআইডি,
                          <br /> কৃষি কার্ড, বিআইডি
                        </th>
                        <th
                          scope="col"
                          className="py-4 font-extrabold px-2  text-black text-center uppercase"
                        >
                          বপন, রোপন ও কর্তন
                        </th>
                        <th
                          scope="col"
                          className="py-4 font-extrabold px-2  text-black text-center uppercase"
                        >
                          উৎপাদন সংক্রান্ত
                        </th>
                        <th
                          scope="col"
                          className="py-4 font-extrabold px-2  text-black text-center uppercase"
                        >
                          ভিজিট সংক্রান্ত
                        </th>
                        <th
                          scope="col"
                          className="py-4 font-extrabold px-2  text-black text-center uppercase"
                        >
                          মন্তব্য
                        </th>
                        <th
                          scope="col"
                          className=" py-4 font-extrabold px-2  text-black text-center uppercase"
                        >
                          SAAO-এর নাম ও মোবাইল নং
                        </th>
                        <th
                          scope="col"
                          className="py-4 font-extrabold px-2  text-black text-center uppercase"
                        >
                          একশন
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {endFetch &&
                        completedDemos?.length > 0 &&
                        completedDemos?.map((single, index) => (
                          <UserSingleDemoTableRow
                            handleDemoDeleting={handleDemoDeleting}
                            data={single}
                            index={index}
                            key={single?._id}
                            handleOpenModal={handleOpenModal}
                          />
                        ))}
                    </tbody>
                  </table>
                )}
                {endFetch && completedDemos?.length < 1 && (
                  <NoContentFound
                    text={"কোনো চূড়ান্ত প্রদর্শনীর তথ্য পাওয়া যায়নি!!"}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {<MarkDemoCompleteModal data={modalData} onClose={handleCloseModal} />}
    </>
  );
};

export default UserDemos;
