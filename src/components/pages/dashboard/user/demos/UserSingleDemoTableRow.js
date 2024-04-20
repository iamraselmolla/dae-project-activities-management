import React, { useEffect } from 'react';
import { AiOutlineFileDone } from 'react-icons/ai';
import { CiEdit } from 'react-icons/ci';
import { MdOutlineDelete } from 'react-icons/md';
import { toBengaliNumber } from "bengali-number";
import ImageGallery from "react-image-gallery";
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
    const imagesArr = [];
    useEffect(() => {
        if (demoImages?.length > 0) {
            for (const image of demoImages) {
                imagesArr.push({ original: image, thumbnail: image });
            }
        }
    }, [demoImages, username]);
    return (
        <tr className="divide-x divide-gray-200 dark:divide-gray-700">
            <td className="dark:text-gray-200 font-medium p-2 text-center text-gray-800 text-sm whitespace-nowrap">
                {toBengaliNumber(index + 1)}
            </td>
            <td className="dark:text-gray-200 font-medium p-2 text-center text-gray-800 text-sm whitespace-nowrap">
                {projectInfo?.short}
            </td>
            <td className="dark:text-gray-200 font-medium p-2 text-center text-gray-800 text-sm whitespace-nowrap">
                প্রযুক্তিঃ {demoInfo?.tech} <br />
                ফসলঃ {demoInfo?.crop} <br />
                জাতঃ {demoInfo?.variety} <br />
            </td>
            <td className="dark:text-gray-200 font-medium p-2 text-center text-gray-800 text-sm whitespace-nowrap">
                {demoTime?.season} <br />
                {demoTime?.fiscalYear}
            </td>
            <td className="dark:text-gray-200 font-medium p-2 text-center text-gray-800 text-sm whitespace-nowrap">
                {farmersInfo?.name}, <br />
                {farmersInfo?.fatherOrHusbandName}
            </td>
            <td className="dark:text-gray-200 font-medium p-2 text-center text-gray-800 text-sm whitespace-nowrap">
                {address?.village}
            </td>
            <td className="dark:text-gray-200 font-medium p-2 text-center text-gray-800 text-sm whitespace-nowrap">
                {numbersInfo?.mobile}, {numbersInfo?.NID}<br />
                {numbersInfo?.agriCard}, {numbersInfo?.BID}
            </td>
            <td className="dark:text-gray-200 font-medium p-2 text-center text-gray-800 text-sm whitespace-nowrap">
                রোপণঃ {formatDateToday(demoDate?.bopon)} <br />
                বপণঃ {formatDateToday(demoDate?.ropon)} <br />
                কর্তনঃ {formatDateToday(demoDate?.korton?.startDate)} - <br /> {formatDateToday(demoDate?.korton?.endDate)}
            </td>
            <td className="dark:text-gray-200 font-medium p-2 text-center text-gray-800 text-sm whitespace-nowrap">
                ফলন/হেঃ {toBengaliNumber(production?.productionPerHector)} <br />
                উৎপাদনঃ {toBengaliNumber(production?.totalProduction)} <br />
                কন্ট্রোল প্লটঃ {toBengaliNumber(production?.sidePlotProduction)} <br />
            </td>
            <td className="text-center text-balance dashboard-image-control text-sm font-medium text-gray-800 dark:text-gray-200 p-2">
                {demoImages[0].image ? <ImageGallery
                    showFullscreenButton={true}
                    showPlayButton={false}
                    showNav={false}
                    showThumbnails={false}
                    autoPlay={true}
                    items={imagesArr}
                /> : 'No IMG'}
            </td>
            <td className="text-center text-balance dashboard-image-control text-sm font-medium text-gray-800 dark:text-gray-200 p-2 whitespace-nowrap">
                কৃষকঃ  {comment?.farmersReview} <br />
                {comment?.overallComment && 'অন্যান্যঃ ' + comment?.overallComment}
            </td>
            <td className="dark:text-gray-200 font-medium p-2 text-center text-gray-800 text-sm whitespace-nowrap">
                {SAAO?.name} <br />
                {toBengaliNumber(SAAO?.mobile)}
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
        </tr >
    );
};

export default UserSingleDemoTableRow;