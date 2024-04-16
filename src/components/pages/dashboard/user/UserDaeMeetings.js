import React, { useContext, useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import { makeSureOnline } from "../../../shared/MessageConst";
import { AuthContext } from "../../../AuthContext/AuthProvider";
import {
  deleteGroupInfoById,
  getUserAllGroupMeeting,
} from "../../../../services/userServices";
import { toBengaliNumber } from "bengali-number";
import UserMeetingTableTD from "./UserMeetingTableTD";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const UserDaeMeetings = () => {
  const { user } = useContext(AuthContext);
  const [allGroupsMeeting, setAllGroupsMeeting] = useState([]);
  const [reload, setReload] = useState(false);

  const handleGroupDeleting = (id) => {
    if (!id) return;
    const deleteGroup = async () => {
      try {
        if (window.confirm("আপনি কি গ্রুপের তথ্যটি মুছে ফেলতে চান?")) {
          const result = await deleteGroupInfoById(id);
          if (result?.status === 200) {
            toast.success(result?.data?.message);
            setReload(!reload);
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
  useEffect(() => {
    const fetchUserAllGroups = async () => {
      const result = await getUserAllGroupMeeting();
      if (result?.status === 200) {
        setAllGroupsMeeting(result?.data?.data);
      }
    };
    if (navigator.onLine) {
      fetchUserAllGroups();
    } else {
      makeSureOnline();
    }
  }, [user, reload]);
  return (
    <div className="flex flex-col">
      <div className="mt-10 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
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
                    <tr className="divide-x divide-gray-200 dark:divide-gray-700">
                      <td className="p-3 text-center whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                        {toBengaliNumber(index + 1)}
                      </td>
                      <td className="p-3 text-center whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                        {singleGroup?.groupInfo?.name}
                      </td>
                      <UserMeetingTableTD
                        text={`${
                          singleGroup?.groupInfo?.place
                        } \n ${toBengaliNumber(
                          singleGroup?.groupInfo?.mobile
                        )}`}
                      />
                      <td className="p-3 text-center whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                        {singleGroup?.address?.village}
                      </td>
                      <UserMeetingTableTD
                        text={`${toBengaliNumber(
                          (singleGroup?.time?.date?.startDate)
                            .split("-")
                            .reverse()
                            .join("-")
                        )} \n ${singleGroup?.time?.day}`}
                      />
                      <td className="p-3 text-center whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                        {singleGroup?.discussion}
                      </td>
                      <td className="p-3 text-center whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                        45
                      </td>
                      <UserMeetingTableTD
                        text={`${singleGroup?.SAAO?.name} \n ${toBengaliNumber(
                          singleGroup?.SAAO?.mobile
                        )}`}
                      />

                      <td className="p-3 flex gap-2 text-center whitespace-nowrap text-sm font-medium">
                        <div className="cursor-pointer">
                          <Link
                            to={`/add-dae-group-meeting?id=${singleGroup?._id}`}
                          >
                            <CiEdit size={35} color="black" />
                          </Link>
                        </div>
                        <div className="cursor-pointer">
                          <MdOutlineDelete
                            onClick={() =>
                              handleGroupDeleting(singleGroup?._id)
                            }
                            size={35}
                            color="red"
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDaeMeetings;
