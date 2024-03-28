import React from "react";

const UserDemos = () => {
  return (
    <div className="flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="border rounded-lg shadow overflow-hidden dark:border-gray-700 dark:shadow-gray-900">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr className="divide-x font-extrabold divide-gray-200 dark:divide-gray-700">
                  <th
                    scope="col"
                    className="px-6 font-extrabold py-3 text-start  text-gray-500 uppercase"
                  >
                    ক্রমিক নং
                  </th>
                  <th
                    scope="col"
                    className="px-6 font-extrabold py-3 text-start  text-gray-500 uppercase"
                  >
                    প্রকল্পের নাম
                  </th>
                  <th
                    scope="col"
                    className="px-6 font-extrabold py-3 text-start  text-gray-500 uppercase"
                  >
                    প্রযুক্তি ও ফসলের নাম
                  </th>
                  <th
                    scope="col"
                    className="px-6 font-extrabold py-3 text-start  text-gray-500 uppercase"
                  >
                    অর্থবছর ও মৌসুম
                  </th>
                  <th
                    scope="col"
                    className="px-6 font-extrabold py-3 text-start  text-gray-500 uppercase"
                  >
                    কৃষকের নাম ও পিতার নাম
                  </th>
                  <th
                    scope="col"
                    className="px-6 font-extrabold py-3 text-start  text-gray-500 uppercase"
                  >
                    ঠিকানা
                  </th>
                  <th
                    scope="col"
                    className="px-6 font-extrabold py-3 text-start  text-gray-500 uppercase"
                  >
                    মোবাইল নং, এনআইডি নং, কৃষি কার্ড নং, বিআইডি নং
                  </th>
                  <th
                    scope="col"
                    className="px-6 font-extrabold py-3 text-start  text-gray-500 uppercase"
                  >
                    একশন
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr className="divide-x divide-gray-200 dark:divide-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                    John Brown
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                    John Brown
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                    45
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                    45
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                    45
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                    45
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                    New York No. 1 Lake Park
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                    <button
                      type="button"
                      className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    >
                      Delete
                    </button>
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
