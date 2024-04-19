import React from 'react';
import { AiOutlineFileDone } from 'react-icons/ai';
import { CiEdit } from 'react-icons/ci';
import { MdOutlineDelete } from 'react-icons/md';

const UserSingleDemoTableRow = () => {
    return (
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
    );
};

export default UserSingleDemoTableRow;