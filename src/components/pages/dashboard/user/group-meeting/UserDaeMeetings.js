import React, { useContext, useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import { makeSureOnline } from "../../../../shared/MessageConst";
import { AuthContext } from "../../../../AuthContext/AuthProvider";
import {
  deleteGroupInfoById,
  getUserAllGroupMeeting,
} from "../../../../../services/userServices";
import { toBengaliNumber } from "bengali-number";
import UserMeetingTableTD from "../UserMeetingTableTD";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../../../../shared/Loader";
import UserSingleGroupTable from "./UserSingleGroupTable";

const UserDaeMeetings = () => {
  const { user } = useContext(AuthContext);
  const [allGroupsMeeting, setAllGroupsMeeting] = useState([]);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchEnd, setFetchEnd] = useState(false);

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
    setLoading(true);
    try {
      const fetchUserAllGroups = async () => {
        const result = await getUserAllGroupMeeting();
        if (result?.status === 200) {
          setAllGroupsMeeting(result?.data?.data);
          setLoading(false);
          setFetchEnd(true);
        }
      };
      if (navigator.onLine) {
        fetchUserAllGroups();
      } else {
        makeSureOnline();
      }
    } catch (err) {
      toast.error("কৃষক গ্রুপের তথ্য আনতে সমস্যা হচ্ছে।");
      setFetchEnd(true);

      setLoading(false);
    } finally {
      setFetchEnd(true);
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
                {!loading &&
                  fetchEnd &&
                  allGroupsMeeting?.length > 0 &&
                  allGroupsMeeting?.map((singleGroup, index) => (
                    <UserSingleGroupTable
                      key={singleGroup?._id}
                      handleGroupDeleting={handleGroupDeleting}
                      singleGroup={singleGroup}
                      index={index}
                    />
                  ))}
                {fetchEnd && !loading && allGroupsMeeting?.length < 1 && (
                  <tr>
                    <td colSpan="10" className="p-3">
                      <span className="flex justify-center items-center">
                        <h2 className="text-red-600 text-2xl">
                          কোনো নোট খুজে পাওয়া যায়নি
                        </h2>
                      </span>
                    </td>
                  </tr>
                )}
                {loading && <Loader />}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDaeMeetings;
