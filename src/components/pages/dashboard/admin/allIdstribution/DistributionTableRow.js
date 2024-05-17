import React, { useEffect } from 'react';
import ImageGallery from "react-image-gallery";
import TableDivision from '../../../../shared/TableDivision';
import { tableDivsionClass } from '../../../../shared/MessageConst';
import { BsTrashFill } from 'react-icons/bs';
import { toBengaliNumber } from 'bengali-number';
import toast from 'react-hot-toast';
import { deleteADistribution } from '../../../../../services/userServices';
import { daeAction } from '../../../../store/projectSlice';
import { useDispatch } from 'react-redux';

const DistributionTableRow = ({ distribution, index }) => {
    const { projectInfo, time, materialName, presentGuests, images, comment, _id: id } = distribution;
    const imagesArr = [];
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    const dispatch = useDispatch()

    useEffect(() => {
        if (images?.length > 0) {
            for (const image of images) {
                imagesArr.push({ original: image, thumbnail: image });
            }
        }
    }, [images, distribution]);

    const handleDeleteDistribution = async (id) => {
        if (!id) {
            toast.error("উপকরণ বিতরণ তথ্যের ডাটাবেইজ আইডি পাওয়া যায়নি। দয়া করে সংশ্লিষ্ট ব্যক্তিকে অবহিত করুন।")
            return;
        }
        if (window.confirm(`আপনি কি ${projectInfo?.short} প্রকল্পের ${time?.season}/${time?.fiscalYear} মৌসুমের ${new Date(time?.date).toLocaleString('bn-BD', options)} দিনের উপকরণ বিতরণের তথ্য মুছে ফেলতে চান?`)) {
            const result = await deleteADistribution(id)
            if (result.status === 200) {
                toast.success(result?.data?.message)
                dispatch(daeAction.setRefetch())
            }
        }
    }
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
                <BsTrashFill onClick={() => handleDeleteDistribution(id)} cursor='pointer' size={30} color='red' />
            </td>
        </tr>
    );
};

export default DistributionTableRow;
