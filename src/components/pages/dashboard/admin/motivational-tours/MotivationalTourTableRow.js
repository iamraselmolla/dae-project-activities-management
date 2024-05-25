import React from "react";
import { toBengaliNumber } from "bengali-number";
import ImageGallery from "react-image-gallery";
import { deleteATour } from "../../../../../services/userServices";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { daeAction } from "../../../../store/projectSlice";
import { BsTrashFill } from "react-icons/bs";


const MotivationalTourTableRow = ({ data, index }) => {
  const { projectInfo, place, time, farmers, officers, comment, images } = data;
  const { startDate, endDate } = time.date;
  const { fiscalYear, season } = time;
  const dispatch = useDispatch()

  const imagesArr = images?.map((url) => ({
    original: url,
    thumbnail: url,
  }));

  const handleDeleteTour = async () => {
    if (window.confirm(`আপনি কি ${projectInfo?.short} প্রকল্পের ${season}/${fiscalYear} মৌসুমের ${place} নামক জায়গার উদ্বুদ্ধকরণ ভ্রমণটির তথ্য মুছে ফেলতে চান?`)) {
      const result = await deleteATour(data?._id);
      if (result.status === 200) {
        toast.success(result.data?.message)
        dispatch(daeAction.setRefetch())
      }
    }
  };
  return (
    <tr className="divide-x divide-gray-200 dark:divide-gray-700">
      <td className="py-4 px-2 text-center">{toBengaliNumber(index + 1)}</td>
      <td className="py-4 px-2 text-center">{projectInfo?.short}</td>
      <td className="py-4 px-2 text-center"> {season} <br /> {fiscalYear} </td>
      <td className="py-4 px-2 text-center">{place}</td>
      <td className="py-4 px-2 text-center">
        {toBengaliNumber(
          new Date(startDate).toLocaleDateString("bn-BD", {
            day: "numeric",
            month: "numeric",
            year: "numeric",
          })
        )}{" "}
        - <br />{" "}
        {toBengaliNumber(
          new Date(endDate).toLocaleDateString("bn-BD", {
            day: "numeric",
            month: "numeric",
            year: "numeric",
          })
        )}
      </td>
      <td className="py-4 px-2 text-center">{toBengaliNumber(farmers)}</td>
      <td className="py-4 px-2 text-center">{comment}</td>
      <td className="py-4 px-2 dashboard-image-control text-center">
        <ImageGallery autoPlay={true} items={imagesArr} />
      </td>
      <td className="py-4 px-2 text-center">
        <div onClick={handleDeleteTour} className="w-10 h-10 rounded-full border-4 border-red-700 flex justify-center items-center">
          <BsTrashFill size={40} color="red" />
        </div>
      </td>
    </tr>
  );
};

export default MotivationalTourTableRow;
