import React, { useEffect } from "react";
import UserMeetingTableTD from "../UserMeetingTableTD";
import { toBengaliNumber } from "bengali-number";
import { MdOutlineDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import ImageGallery from "react-image-gallery";
import { Link } from "react-router-dom";

function UserSingleGroupTable({ singleGroup, index, handleGroupDeleting }) {
  const { images } = singleGroup;
  const imagesArr = [];
  useEffect(() => {
    if (images?.length > 0) {
      for (const image of images) {
        imagesArr.push({ original: image, thumbnail: image });
      }
    }
  }, [images]);

  return (
    <tr className="divide-x divide-gray-200 dark:divide-gray-700">
      <td className="p-3 text-center whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
        {toBengaliNumber(index + 1)}
      </td>
      <td className="p-3 text-center whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
        {singleGroup?.groupInfo?.name}
      </td>
      <UserMeetingTableTD
        text={`${singleGroup?.groupInfo?.place} \n ${toBengaliNumber(
          singleGroup?.groupInfo?.mobile
        )}`}
      />
      <td className="p-3 text-center whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
        {singleGroup?.address?.village}
      </td>
      <UserMeetingTableTD
        text={`${toBengaliNumber(
          (singleGroup?.time?.date?.startDate).split("-").reverse().join("-")
        )} \n ${singleGroup?.time?.day}`}
      />
      <td className="p-3 text-center whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
        {singleGroup?.discussion}
      </td>
      <td className="p-3 text-center dashboard-image-control whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
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
      <UserMeetingTableTD
        text={`${singleGroup?.SAAO?.name} \n ${toBengaliNumber(
          singleGroup?.SAAO?.mobile
        )}`}
      />

      <td className="p-3 flex gap-2 text-center whitespace-nowrap text-sm font-medium">
        <div className="cursor-pointer">
          <Link to={`/add-dae-group-meeting?id=${singleGroup?._id}`}>
            <CiEdit size={35} color="black" />
          </Link>
        </div>
        <div className="cursor-pointer">
          <MdOutlineDelete
            onClick={() => handleGroupDeleting(singleGroup?._id)}
            size={35}
            color="red"
          />
        </div>
      </td>
    </tr>
  );
}

export default UserSingleGroupTable;
