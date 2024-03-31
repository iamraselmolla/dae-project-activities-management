import React, { useContext, useEffect } from 'react';
import { CiEdit } from 'react-icons/ci';
import { MdOutlineDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../../AuthContext/AuthProvider';
import toast from 'react-hot-toast';
import { deleteATraining } from '../../../../../services/userServices';
import { toBengaliNumber } from 'bengali-number';

const SingleTrainingRow = ({ data, setReload, reload }) => {
    const { user, role } = useContext(AuthContext)
    const {
        projectInfo,
        fiscalYear,
        season,
        subject,
        guests,
        farmers,
        date,
        images,
        _id

    } = data;

    const imagesArr = [];
    useEffect(() => {
        if (images?.length > 0) {
            for (const image of images) {
                imagesArr.push({ original: image, thumbnail: image });
            }
        }
    }, [images]);
    const handleTrainingDelete = async () => {
        if (!_id) {
            toast.error('দয়া করে লগিন করুন অথবা সংশ্লিষ্ট ব্যক্তিতে জানান যে লগিন থাকার পরেও ট্রেনিং ডিলেট করার জন্য লগিন করতে বলতেছে');
        }
        if (window.confirm(`আপনি কি ${projectInfo?.short} প্রকল্পের ${toBengaliNumber(date?.startDate)} তারিখের ${subject} শিরোনামের প্রশিক্ষণ ডিলিট করতে চান?`)) {
            const result = await deleteATraining(_id);
            if (result.status === 200) {
                toast.success("প্রশিক্ষণ সফলভাবে মুছে দেয়া হয়েছে");
                setReload(!reload)
            }
            else {
                toast.error("প্রশিক্ষণের তথ্য মুছতে গিয়ে সমস্যা হচ্ছে।")
            }
        }
    }
    return (
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            <tr className="divide-x divide-gray-200 dark:divide-gray-700">
                <td className="p-3 text-center whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">

                </td>
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
                        <Link to={`/addTraining?id=${_id}`}><MdOutlineDelete size={35} color="red" /></Link>

                    </div>
                    <div className="cursor-pointer">
                        <CiEdit onClick={handleTrainingDelete} size={35} color="black" />
                    </div>
                </td>
            </tr>
        </tbody>
    );
};

export default SingleTrainingRow;