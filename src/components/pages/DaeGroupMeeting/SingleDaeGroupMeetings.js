import React, { useEffect } from "react";
import { FaMobileAlt } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { BsFillCloudSunFill } from "react-icons/bs";
import ImageGallery from "react-image-gallery";
import { toBengaliNumber } from "bengali-number";
import { CiCalendarDate } from "react-icons/ci";


const SingleDemo = ({ data }) => {
  const {
    address,
    createdAt,
    discussion,
    groupInfo,
    images,
    time,
    updatedAt,
    username,
    SAAO
  } = data;

  const imagesArr = [];
  useEffect(() => {
    if (images?.length > 0) {
      for (const image of images) {
        imagesArr.push({ original: image, thumbnail: image })
      }
    }
  }, [images])

  // console.log(imagesArr)
  return (
    <div className="rounded-lg border relative shadow-xl">
      <div className="relative">
        <ImageGallery autoPlay={true} items={imagesArr} />
      </div>

      <div className="content-part px-3 py-2   ">
        <h2 className="text-xl mb-3 font-extrabold">{groupInfo?.name}</h2>
        <div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-4">
              <FaMobileAlt /> <p>{toBengaliNumber(groupInfo?.mobile)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div><CiCalendarDate /></div> <p>{toBengaliNumber(time?.date?.startDate)}, {time?.day}</p>
          </div>
          <div className="flex items-center gap-2">
            <div>
              <MdLocationPin />
            </div>
            <p>
              স্থানঃ {groupInfo?.place}, গ্রামঃ {address?.village}, ব্লকঃ
              {address?.block}, ইউনিয়নঃ {address?.union}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div><BsFillCloudSunFill /></div> <p>খরিপ-১/২০২৩-২৪</p>
          </div>

          <div className="mt-3">
            আলোচ্য বিষয়ঃ {discussion}
          </div>
          <h2 className="text-xl mt-4 font-extrabold">
            উপসহকারী কৃষি কর্মকর্তার তথ্য
          </h2>
          <div className="mt-2">
            নামঃ {SAAO.name}
          </div>
          <div className="mt-1">
            মোবাইলঃ {toBengaliNumber(SAAO.mobile)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleDemo;
