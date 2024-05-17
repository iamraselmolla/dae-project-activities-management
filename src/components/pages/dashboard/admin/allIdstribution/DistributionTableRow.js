import React, { useEffect } from 'react';
import ImageGallery from "react-image-gallery";
import TableDivision from '../../../../shared/TableDivision';
import { tableDivsionClass } from '../../../../shared/MessageConst';
import { BsTrashFill } from 'react-icons/bs';
import { toBengaliNumber } from 'bengali-number';

const DistributionTableRow = ({ distribution, index }) => {
    const { projectInfo, time, materialName, presentGuests, images, comment } = distribution;
    const imagesArr = [];

    useEffect(() => {
        if (images?.length > 0) {
            for (const image of images) {
                imagesArr.push({ original: image, thumbnail: image });
            }
        }
    }, [images, distribution]);

    return (
        <tr className='divide-x font-extrabold divide-gray-200 dark:divide-gray-700'>
            <TableDivision text={toBengaliNumber(index + 1)} />
            <TableDivision text={projectInfo.short} />
            <TableDivision text={`${time.season} \n ${time.fiscalYear}`} />
            <td className={tableDivsionClass}>{new Date(time.date).toLocaleString('bn-BD', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            })}</td>
            <TableDivision text={materialName} />
            <TableDivision text={presentGuests} />
            <TableDivision text={comment} />
            <td className='dashboard-image-control'>
                {images?.length > 0 && (
                    <ImageGallery
                        showFullscreenButton={true}
                        showPlayButton={false}
                        showNav={false}
                        showThumbnails={false}
                        autoPlay={true}
                        items={imagesArr}
                    />
                )}
            </td>
            <td className={tableDivsionClass}>
                <BsTrashFill cursor='pointer' size={30} color='red' />
            </td>
        </tr>
    );
};

export default DistributionTableRow;
