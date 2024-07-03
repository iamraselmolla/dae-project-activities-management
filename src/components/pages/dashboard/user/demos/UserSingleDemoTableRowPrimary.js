import React, { useEffect } from "react";
import { AiOutlineFileDone } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import { toBengaliNumber } from "bengali-number";
import ImageGallery from "react-image-gallery";
import { Link } from "react-router-dom";
import AddImageModal from "../../../../shared/AddImageModal";

const UserSingleDemoTableRowPrimary = ({
  data,
  index,
  handleDemoDeleting,
  handleOpenModal,
}) => {
  const {
    _id,
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
    demoImages
  } = data;

  const imagesArr = [];
  useEffect(() => {
    if (demoImages?.length > 0) {
      for (const image of demoImages) {
        image.image?.map((single) =>
          imagesArr.push({ original: single, thumbnail: single })
        );
      }
    }
  }, [data]);

  const handleModaOpen = (dataValues) => {
    document.getElementById("my_modal_1")?.showModal();
  };

  return (
    <>
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
          {numbersInfo?.mobile}, {numbersInfo?.NID}
          <br />
          {numbersInfo?.agriCard}, {numbersInfo?.BID}
        </td>
        <td className="dark:text-gray-200 font-medium p-2 text-center text-gray-800 text-sm whitespace-nowrap">
          রোপণঃ {new Date(demoDate?.bopon).toLocaleString('bn-BD', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          })} <br />
          বপণঃ {new Date(demoDate?.ropon).toLocaleString('bn-BD', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          })} <br />
        </td>

        <td className="text-center flex-col flex justify-center items-center text-balance dashboard-image-control text-sm font-medium text-gray-800 dark:text-gray-200 p-2">
          {demoImages?.length > 0 && (
            <ImageGallery
              showFullscreenButton={true}
              showPlayButton={false}
              showNav={false}
              showThumbnails={false}
              autoPlay={true}
              items={imagesArr}
            />
          )}

          <span
            onClick={() => handleModaOpen(data)}
            className="text-2xl w-8 h-8 rounded cursor-pointer bg-green-600 flex justify-center items-center"
          >
            +
          </span>
        </td>

        <td className="dark:text-gray-200 font-medium p-2 text-center text-gray-800 text-sm whitespace-nowrap">
          {SAAO?.name} <br />
          {toBengaliNumber(SAAO?.mobile)}
        </td>

        <td className="p-3 flex justify-center items-center  gap-1 text-center whitespace-nowrap text-sm font-medium">
          {!data?.completed && (
            <>
              <div className="cursor-pointer">
                <Link to={`/addDemo?id=${_id}`}>
                  <CiEdit size={35} color="black" />
                </Link>
              </div>
              <div className="cursor-pointer">
                <AiOutlineFileDone
                  onClick={() => handleOpenModal(data)}
                  size={35}
                  color="green"
                />
              </div>
            </>
          )}
          <div className="cursor-pointer">
            <MdOutlineDelete
              onClick={() =>
                handleDemoDeleting(
                  _id,
                  projectInfo?.short,
                  demoTime,
                  demoInfo,
                  farmersInfo
                )
              }
              size={35}
              color="red"
            />
          </div>
        </td>
      </tr>
      <AddImageModal data={data} />
    </>
  );
};

export default UserSingleDemoTableRowPrimary;
