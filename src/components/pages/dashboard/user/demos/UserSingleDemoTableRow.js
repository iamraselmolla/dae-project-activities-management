import React from 'react';
import { AiOutlineFileDone } from 'react-icons/ai';
import { CiEdit } from 'react-icons/ci';
import { MdOutlineDelete } from 'react-icons/md';
import { toBengaliNumber } from "bengali-number";
import formatDateToday from '../../../../utilis/formatDate';

const UserSingleDemoTableRow = ({ data, index }) => {
    const {
        projectInfo,
        demoTime,
        farmersInfo,
        address,
        SAAO,
        numbersInfo,
        demoInfo,
        demoDate,
        production,
        comment,
        demoImages,
        username
    } = data;
    return (
        <tr className="divide-x divide-gray-200 dark:divide-gray-700">
            <td className="text-center text-balance text-sm font-medium text-gray-800 dark:text-gray-200 p-2">
                {toBengaliNumber(index + 1)}
            </td>
            <td className="text-center text-balance text-sm font-medium text-gray-800 dark:text-gray-200 p-2">
                {projectInfo?.short}
            </td>
            <td className="text-center text-balance text-sm font-medium text-gray-800 dark:text-gray-200 p-2">
                প্রযুক্তিঃ {demoInfo?.tech} <br />
                ফসলঃ {demoInfo?.crop} <br />
                জাতঃ {demoInfo?.variety} <br />
            </td>
            <td className="text-center text-balance text-sm font-medium text-gray-800 dark:text-gray-200 p-2">
                {demoTime?.season} <br />
                {demoTime?.fiscalYear}
            </td>
            <td className="text-center text-balance text-sm font-medium text-gray-800 dark:text-gray-200 p-2">
                {farmersInfo?.name}, <br />
                {farmersInfo?.fatherOrHusbandName}
            </td>
            <td className="text-center text-balance text-sm font-medium text-gray-800 dark:text-gray-200 p-2">
                {address?.village}
            </td>
            <td className="text-center text-balance text-sm font-medium text-gray-800 dark:text-gray-200 p-2">
                {numbersInfo?.mobile} <br />
                {numbersInfo?.NID}<br />
                {numbersInfo?.agriCard}<br />
                {numbersInfo?.BID}
            </td>
            <td className="text-center text-balance text-sm font-medium text-gray-800 dark:text-gray-200 p-2">
                রোপণঃ {formatDateToday(demoDate?.bopon)} <br />
                বপণঃ {formatDateToday(demoDate?.ropon)} <br />
                কর্তনঃ {formatDateToday(demoDate?.korton?.startDate)} - {formatDateToday(demoDate?.korton?.endDate)}
            </td>
            <td className="text-center text-balance text-sm font-medium text-gray-800 dark:text-gray-200 p-2">
                45
            </td>
            <td className="text-center text-balance text-sm font-medium text-gray-800 dark:text-gray-200 p-2">
                45
            </td>
            <td className="text-center text-balance text-sm font-medium text-gray-800 dark:text-gray-200 p-2">
                45
            </td>
            <td className="text-center text-balance text-sm font-medium text-gray-800 dark:text-gray-200 p-2">
                New York No. 1 Lake Park
            </td>

            <td className="p-3 flex gap-1 text-center whitespace-nowrap text-sm font-medium">
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