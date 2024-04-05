import React, { useContext, useEffect, useState } from "react";
import { AiOutlineFileDone } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { AuthContext } from "../../../AuthContext/AuthProvider";
import { getUserAllFieldDay } from "../../../../services/userServices";
import toast from "react-hot-toast";
import { makeSureOnline } from "../../../shared/MessageConst";

const UserFieldDays = () => {
  const [allFieldDays, setAllFieldDays] = useState([])
  const { user } = useContext(AuthContext)
  useEffect(() => {
    const getFieldDays = async () => {
      try {
        const result = await getUserAllFieldDay()
        if (result?.status === 200) {
          setAllFieldDays(result?.data?.data)
          console.log(result)
        }
      } catch (err) {
        toast.error("মাঠ দিবসের তথ্য আনতে অসুবিধা হচ্ছে। দয়া করে সংশ্লিষ্টকে জানান")
      }
    }
    if (navigator.onLine) {
      getFieldDays()
    } else {
      toast.error(makeSureOnline)
    }
  }, [user])

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
                    className=" py-4 font-extrabold px-2  text-black text-center uppercase"
                  >
                    ক্রমিক নং
                  </th>
                  <th
                    scope="col"
                    className=" py-4 font-extrabold px-2  text-black text-center uppercase"
                  >
                    প্রকল্পের নাম
                  </th>
                  <th
                    scope="col"
                    className=" py-4 font-extrabold px-2  text-black text-center uppercase"
                  >
                    বিষয়
                  </th>
                  <th
                    scope="col"
                    className=" py-4 font-extrabold px-2  text-black text-center uppercase"
                  >
                    অর্থবছর ও মৌসুম
                  </th>
                  <th
                    scope="col"
                    className=" py-4 font-extrabold px-2  text-black text-center uppercase"
                  >
                    তারিখ ও বার
                  </th>
                  <th
                    scope="col"
                    className=" py-4 font-extrabold px-2  text-black text-center uppercase"
                  >
                    কৃষক/কৃষাণীর সংখ্যা
                  </th>
                  <th
                    scope="col"
                    className=" py-4 font-extrabold px-2  text-black text-center uppercase"
                  >
                    স্থান, ব্লক ও ইউনিয়ন
                  </th>
                  <th
                    scope="col"
                    className=" py-4 font-extrabold px-2  text-black text-center uppercase"
                  >
                    উপস্থিত কর্মকর্তাগণ
                  </th>
                  <th
                    scope="col"
                    className=" py-4 font-extrabold px-2  text-black text-center uppercase"
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
                    className=" py-4 font-extrabold px-2  text-black text-center uppercase"
                  >
                    একশন
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr className="divide-x divide-gray-200 dark:divide-gray-700">
                  <td className="p-3 text-center whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                    John Brown
                  </td>
                  <td className="p-3 text-center whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                    John Brown
                  </td>
                  <td className="p-3 text-center whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                    John Brown
                  </td>
                  <td className="p-3 text-center whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                    45
                  </td>
                  <td className="p-3 text-center whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                    45
                  </td>
                  <td className="p-3 text-center whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                    45
                  </td>
                  <td className="p-3 text-center whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                    45
                  </td>
                  <td className="p-3 text-center whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                    45
                  </td>
                  <td className="p-3 text-center whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                    45
                  </td>
                  <td className="p-3 text-center whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                    New York
                  </td>
                  <td className="p-3 flex gap-2 text-center whitespace-nowrap text-sm font-medium">

                    <div className="cursor-pointer">
                      <MdOutlineDelete size={35} color="red" />
                    </div>
                    <div className="cursor-pointer">
                      <CiEdit size={35} color="black" />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserFieldDays;
