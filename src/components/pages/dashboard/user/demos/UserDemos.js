import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../AuthContext/AuthProvider";
import toast from "react-hot-toast";
import { makeSureOnline } from "../../../../shared/MessageConst";
import { getUserDemos } from "../../../../../services/userServices";
import UserSingleDemoTableRow from "./UserSingleDemoTableRow";
import Loader from "../../../../shared/Loader";

const UserDemos = () => {
  const { user } = useContext(AuthContext)
  const [userDemos, setUserDemos] = useState([]);
  const [loading, setLoading] = useState(false)
  const [fetchEnd, setFetchEnd] = useState(false)
  useEffect(() => {
    const fetchUserDemos = async () => {
      setLoading(true)
      try {
        setLoading(true)
        const result = await getUserDemos();
        if (result?.status === 200) {
          setUserDemos(result?.data?.data);
          setLoading(false)
          setFetchEnd(true)
        }
      }
      catch (err) {
        toast.error("ইউজারের যুক্ত করা প্রদর্শনীর তথ্য আনতে সমস্যা হচ্ছে। দয়া করে সংশ্লিষ্ট কর্তৃপক্ষকে অবহিত করুন।")
        setLoading(false)
        setFetchEnd(true)
      }

    }
    if (navigator.onLine) {
      fetchUserDemos()
    }
    else {
      makeSureOnline()
    }
  }, [user])
  return (
    <div className="flex flex-col">
      <div className="mt-10 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="border rounded-lg shadow overflow-hidden dark:border-gray-700 dark:shadow-gray-900">
            {!loading && fetchEnd && userDemos?.length > 0 &&
              < table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
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
                      className="py-4 font-extrabold px-2  text-black text-center uppercase"
                    >
                      মোবাইল নং, এনআইডি নং, কৃষি কার্ড নং, বিআইডি নং
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
                  {!loading && fetchEnd && userDemos?.length > 0 && userDemos?.map((single, index) => <UserSingleDemoTableRow data={single} index={index} />)}
                </tbody>
              </table>
            }
            {!loading && fetchEnd && userDemos?.length < 1 && <h2 className="text-red-600 text-center text-2xl  font-extrabold">
              কোনো প্রদর্শনীর তথ্য পাওয়া যায়নি!!
            </h2>}
            {loading && !fetchEnd &&
              <div className="fixed daeLoader">
                <Loader />
                <h2 className="text-green-600 mt-3 text-4xl">
                  তথ্য আনা হচ্ছে। দয়া করে অপেক্ষা করুন
                </h2>
              </div>}

          </div>
        </div>
      </div>
    </div >
  );
};

export default UserDemos;
