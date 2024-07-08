import React, { useContext, useEffect } from "react";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { deleteATraining } from "../../../../../services/userServices";
import { toBengaliNumber } from "bengali-number";
import TableDivision from "../../../../shared/TableDivision";
import ImageGallery from "react-image-gallery";
import { daeAction } from "../../../../store/projectSlice";
import { useDispatch } from "react-redux";
import { createRandomNumber } from "../../../../utilis/createRandomNumber";

const SingleTrainingRow = ({ index, data }) => {
  const {
    projectInfo,
    fiscalYear,
    season,
    subject,
    guests,
    farmers,
    date,
    images,
    comment,
    _id,
  } = data;

  const imagesArr = [];
  useEffect(() => {
    if (images?.length > 0) {
      for (const image of images) {
        imagesArr.push({ original: image, thumbnail: image });
      }
    }
  }, [images, data]);
  const dispatch = useDispatch();

  const handleTrainingDelete = async () => {
    if (!_id) {
      toast.error(
        "দয়া করে লগিন করুন অথবা সংশ্লিষ্ট ব্যক্তিতে জানান যে লগিন থাকার পরেও ট্রেনিং ডিলেট করার জন্য লগিন করতে বলতেছে"
      );
    }
    if (
      window.confirm(
        `আপনি কি ${projectInfo?.short} প্রকল্পের ${toBengaliNumber(
          date?.startDate
        )} তারিখের ${subject} শিরোনামের প্রশিক্ষণ ডিলিট করতে চান?`
      )
    ) {
      const result = await deleteATraining(_id);
      if (result.status === 200) {
        toast.success("প্রশিক্ষণ সফলভাবে মুছে দেয়া হয়েছে");
        dispatch(daeAction.setRefetch(`trainings${createRandomNumber()}`));
      } else {
        toast.error("প্রশিক্ষণের তথ্য মুছতে গিয়ে সমস্যা হচ্ছে।");
      }
    }
  };
  return (
    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
      <tr className="divide-x divide-gray-200 dark:divide-gray-700">
        <td className="p-3 text-center whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
          {toBengaliNumber(index + 1)}
        </td>
        <TableDivision text={projectInfo?.short} />
        <td className="text-center whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
          {fiscalYear} <br />
          {season}
        </td>

        <TableDivision text={subject} />

        <TableDivision
          text={toBengaliNumber(
            new Date(date?.startDate).toLocaleDateString("bn-BD", {
              weekday: "long", // Specify to include the full day name
              day: "numeric",
              month: "long",
              year: "numeric",
            })
          )}
        />
        <td className="text-center whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
          কৃষকঃ {toBengaliNumber(farmers?.male)} জন, <br />
          কৃষাণীঃ {toBengaliNumber(farmers?.female)} জন, <br />
          মোটঃ {toBengaliNumber(farmers?.male + farmers?.female)} জন
        </td>
        <td className="text-center text-balance text-sm font-medium text-gray-800 dark:text-gray-200">
          {guests}
        </td>

        {/* <TableDivision text={guests} /> */}
        <td className="p-3 text-center text-sm font-medium text-gray-800 dark:text-gray-200">
          <div className="flex dashboard-image-control flex-wrap gap-1">
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
          </div>
        </td>
        <TableDivision text={comment} />

        <td className="p-3 flex gap-2 text-center whitespace-nowrap text-sm font-medium">
          <div className="cursor-pointer">
            <Link to={`addTraining?id=${_id}`}>
              <CiEdit size={35} color="red" />
            </Link>
          </div>
          <div className="cursor-pointer">
            <MdOutlineDelete
              onClick={handleTrainingDelete}
              size={35}
              color="black"
            />
          </div>
        </td>
      </tr>
    </tbody>
  );
};

export default SingleTrainingRow;
