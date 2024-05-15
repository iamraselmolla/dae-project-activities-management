import React from "react";
import { toBengaliNumber } from "bengali-number";
import ImageGallery from "react-image-gallery";

const MotivationalTourTableRow = ({ data, index }) => {
  const { projectInfo, place, time, farmers, officers, comment, images } = data;
  const { startDate, endDate } = time.date;
  const { fiscalYear, season } = time;

  const imagesArr = images?.map((url) => ({
    original: url,
    thumbnail: url,
  }));
  return (
    <tr className="divide-x divide-gray-200 dark:divide-gray-700">
      <td className="py-4 px-2 text-center">{toBengaliNumber(index + 1)}</td>
      <td className="py-4 px-2 text-center">{projectInfo?.short}</td>
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
      <td className="py-4 px-2 text-center">{officers}</td>
      <td className="py-4 px-2 text-center">{comment}</td>
      <td className="py-4 px-2 text-center">
        <ImageGallery autoPlay={true} items={imagesArr} />
      </td>
      <td className="py-4 px-2 text-center">
        <button className="text-red-600 hover:text-red-900">মুছে ফেলুন</button>
      </td>
    </tr>
  );
};

export default MotivationalTourTableRow;
