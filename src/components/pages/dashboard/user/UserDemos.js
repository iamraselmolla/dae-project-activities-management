import React from "react";
import { AiOutlineFileDone } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";

const UserDemos = () => {
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
                    প্রকল্পের নাম
                  </th>
                  <th
                    scope="col"
                    className="py-4 font-extrabold px-2  text-black text-center uppercase"
                  >
                    প্রযুক্তি ও ফসলের নাম
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
                    গ্রাম, ব্লক ও ইউনিয়ন
                  </th>
                  <th
                    scope="col"
                    className="py-4 font-extrabold px-2  text-black text-center uppercase"
                  >
                    মোবাইল নং, এনআইডি নং, কৃষি কার্ড নং, বিআইডি নং
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
                <tr className="divide-x divide-gray-200 dark:divide-gray-700">
                  <td className="p-3 text-center whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                    John Brown
                  </td>
                  <td className="p-3 text-center whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                    John Brown
                  </td>
                  <td className="p-3 text-center whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                    45
                  </td>
                  <td className="p-3 text-center whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                    45
                  </td>
                  <td className="p-3 text-center whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                    45
                  </td>
                  <td className="p-3 text-center whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                    45
                  </td>
                  <td className="p-3 text-center whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                    45
                  </td>
                  <td className="p-3 text-center whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                    New York No. 1 Lake Park
                  </td>

                  <td className="p-3 flex gap-2 text-center whitespace-nowrap text-sm font-medium">
                    <div className="cursor-pointer">
                      <AiOutlineFileDone size={35} color="green" />
                    </div>
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

export default UserDemos;
