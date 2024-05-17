import React from 'react';
import TableDivision from '../../../../shared/TableDivision';
import ImageGallery from "react-image-gallery";
import { toBengaliNumber } from 'bengali-number';
import { MdOutlineDelete } from 'react-icons/md';

const UserSchoolTableRow = ({ school, index, handleSchoolDeletion }) => {
    const imagesArr = []
    if (school?.images?.length > 0) {
        for (const image of school?.images) {
            imagesArr.push({ original: image, thumbnail: image });
        }
    }
    return (
        <tr key={school._id} className="divide-x divide-gray-200">
            <TableDivision text={toBengaliNumber(index + 1)} />
            <TableDivision text={school?.projectInfo?.short} />
            <TableDivision text={school.time.season + "/" + toBengaliNumber(school.time.fiscalYear)} />
            <TableDivision text={school.schoolInfo.pfsFbs + ", " + school.schoolInfo.schoolName + " " + school.schoolInfo.crop} />
            <TableDivision text={school.location?.place} />
            <TableDivision text={new Date(school.time?.date?.startDate).toLocaleString('bn-BD', {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            })} />
            <TableDivision text={school?.assistantOfficers} />
            <TableDivision text={school?.higherPerson} />
            <td className="px-3 dashboard-image-control py-2 whitespace-nowrap">
                <ImageGallery

                    autoPlay={true} items={imagesArr} />
            </td>
            <TableDivision text={school?.SAAO?.name + ", " + school?.SAAO?.mobile} />
            <TableDivision text={school?.comment} />
            <td className="px-3 py-2 whitespace-nowrap">
                <MdOutlineDelete
                    onClick={() => handleSchoolDeletion(school._id)}
                    size={40}
                    className="text-red-500 cursor-pointer"
                />
            </td>
        </tr>
    );
};

export default UserSchoolTableRow;