import React, { useContext, useEffect, useState } from "react";
import { makeSureOnline } from "../../../../shared/MessageConst";
import { deleteGroupInfoById } from "../../../../../services/userServices";
import toast from "react-hot-toast";
import UserSingleGroupTable from "./UserSingleGroupTable";
import NoContentFound from "../../../../shared/NoContentFound";
import AddModuleButton from "../../../../shared/AddModuleButton";
import { useDispatch, useSelector } from "react-redux";
import SectionTitle from "../../../../shared/SectionTitle";
import { toBengaliNumber } from "bengali-number";
import { daeAction } from "../../../../store/projectSlice";

const UserDaeMeetings = () => {
  const {
    daeMeetings: allGroupsMeeting,
  } = useSelector((state) => state.dae);
  const dispatch = useDispatch()

  const handleGroupDeleting = (id) => {
    if (!id) return;
    const deleteGroup = async () => {
      try {
        if (window.confirm("আপনি কি গ্রুপের তথ্যটি মুছে ফেলতে চান?")) {
          const result = await deleteGroupInfoById(id);
          if (result?.status === 200) {
            toast.success(result?.data?.message);
            dispatch(daeAction.setRefetch('meetings'));
          }
        }
      } catch (err) {
        toast.error(
          "গ্রুপ মিটিং মুছে ফেলতে সমস্যা হচ্ছে। দয়া করে সংশ্লিষ্ট ব্যক্তিকে জানান।"
        );
      }
    };
    if (navigator.onLine) {
      deleteGroup();
    } else {
      makeSureOnline();
    }
  };

  return (
    <div className="flex flex-col">
      <div className="mt-10 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <AddModuleButton
            link={"add-dae-group-meeting"}
            btnText={"কৃষক গ্রুপ সভা যুক্ত করুন"}
          />
          <SectionTitle title={`কৃষক গ্রুপ সভা (${toBengaliNumber(allGroupsMeeting?.length || 0)})`} />
          <div className="border rounded-lg shadow overflow-hidden dark:border-gray-700 dark:shadow-gray-900">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr className="divide-x font-extrabold divide-gray-200 dark:divide-gray-700">
                  <th
                    scope="col"
                    className="py-4 font-extrabold px-2  text-black text-center uppercase"
                  >
                    ক্রমিক নং
                  </th>
                  <th
                    scope="col"
                    className="py-4 font-extrabold px-2  text-black text-center uppercase"
                  >
                    গ্রুপের নাম
                  </th>
                  <th
                    scope="col"
                    className="py-4 font-extrabold px-2  text-black text-center uppercase"
                  >
                    স্থান ও মোবাইল নং
                  </th>
                  <th
                    scope="col"
                    className="py-4 font-extrabold px-2  text-black text-center uppercase"
                  >
                    গ্রাম
                  </th>
                  <th
                    scope="col"
                    className="py-4 font-extrabold px-2  text-black text-center uppercase"
                  >
                    তারিখ
                  </th>
                  <th
                    scope="col"
                    className="py-4 font-extrabold px-2  text-black text-center uppercase"
                  >
                    আলোচ্য বিষয়
                  </th>
                  <th
                    scope="col"
                    className="py-4 font-extrabold px-2  text-black text-center uppercase"
                  >
                    ছবিসমূহ
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
                {allGroupsMeeting?.length > 0 &&
                  allGroupsMeeting?.map((singleGroup, index) => (
                    <UserSingleGroupTable
                      key={singleGroup?._id}
                      handleGroupDeleting={handleGroupDeleting}
                      singleGroup={singleGroup}
                      index={index}
                    />
                  ))}
              </tbody>
            </table>
            {allGroupsMeeting?.length < 1 && (
              <NoContentFound
                text={" কোনো ডিএই কৃষক গ্রুপ সভা খুজে পাওয়া যায়নি!"}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDaeMeetings;
