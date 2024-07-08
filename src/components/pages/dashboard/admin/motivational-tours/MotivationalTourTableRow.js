import React, { useState } from "react";
import { toBengaliNumber } from "bengali-number";
import ImageGallery from "react-image-gallery";
import { deleteATour } from "../../../../../services/userServices";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { daeAction } from "../../../../store/projectSlice";
import { BsTrashFill } from "react-icons/bs";
import { createRandomNumber } from "../../../../utilis/createRandomNumber";
import DeletingLoader from "../../../../shared/DeletingLoader";


const MotivationalTourTableRow = ({ data, index }) => {
  const { projectInfo, place, time, farmers, comment, images } = data;
  const { startDate, endDate } = time.date;
  const { fiscalYear, season } = time;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const imagesArr = images?.map((url) => ({
    original: url,
    thumbnail: url,
  }));

  const handleDeleteTour = async () => {
    if (window.confirm(`আপনি কি ${projectInfo?.short} প্রকল্পের ${season}/${fiscalYear} মৌসুমের ${place} নামক জায়গার উদ্বুদ্ধকরণ ভ্রমণটির তথ্য মুছে ফেলতে চান?`)) {
      try {
        setLoading(true)
        const result = await deleteATour(data?._id);
        if (result.status === 200) {
          toast.success(result.data?.message)
          dispatch(daeAction.setRefetch(`tours${createRandomNumber()}`))
        }
      }
      catch (err) {
        toast.error(err.message)
      } finally {
        setLoading(false)
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
      <td className="py-4 px-2 flex justify-center items-center">
        <BsTrashFill cursor={"pointer"} onClick={handleDeleteTour} size={40} color="red" />

      </td>
      {loading && <DeletingLoader />}
    </tr>
  );
};

export default MotivationalTourTableRow;
