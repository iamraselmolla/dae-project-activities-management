import React, { useContext, useEffect, useState } from "react";
import { MdOutlineDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { AuthContext } from "../../../../AuthContext/AuthProvider";
import { deleteAFieldDay, getUserAllFieldDay } from "../../../../../services/userServices";
import toast from "react-hot-toast";
import FieldDayTD from "./FieldDayTD";
import { toBengaliNumber } from "bengali-number";
import ImageGallery from "react-image-gallery";
import { Link } from "react-router-dom";
import NoContentFound from "../../../../shared/NoContentFound";
import AddModuleButton from "../../../../shared/AddModuleButton";
import { useSelector } from "react-redux";

const UserFieldDays = () => {
  const { fieldDays: allFieldDays } = useSelector(state => state.dae)

  const handleFieldDayDelete = async (fieldDayData) => {
    if (window.confirm(`আপনি কি ${fieldDayData?.projectInfo?.short} প্রকল্পের ${fieldDayData?.subject} বিষয়ক ${toBengaliNumber(new Date(fieldDayData?.date).toLocaleDateString())} তারিখের মাঠ দিবসের তথ্যটি মুছে ফেলতে চান?`)) {
      if (!fieldDayData) {
        toast.error("মাঠ দিবসের তথ্য যথাযথভাবে পাওয়া যাচ্ছে না। দয়া করে সংশ্লিষ্ট কর্তৃপক্ষকে জানান।")
      } else {
        try {
          const result = await deleteAFieldDay(fieldDayData?._id)
          if (result.status === 200) {
            toast.success(result?.data?.message)
          }
        } catch (err) {
          toast.error("মাঠ দিবসের তথ্য মুছে ফেলতে সমস্যা হচ্ছে।")
        }
      }
    }

  }
  return (
    <div className="flex flex-col">
      <div className="mt-10 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <AddModuleButton link={"addFieldDay"} btnText={'মাঠদিবস যুক্ত করুন'} />
          <div className="border rounded-lg shadow overflow-hidden dark:border-gray-700 dark:shadow-gray-900">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr className="divide-x font-extrabold divide-gray-200 dark:divide-gray-700">
                  <th
                    scope="col"
                    className=" py-4 font-extrabold px-2  text-black text-center uppercase"
                  >
                    ক্রমিক নং
                  </th>
                  <th
                    scope="col"
                    className=" py-4 font-extrabold px-2  text-black text-center uppercase"
                  >
                    প্রকল্পের নাম
                  </th>
                  <th
                    scope="col"
                    className=" py-4 font-extrabold px-2  text-black text-center uppercase"
                  >
                    বিষয়
                  </th>
                  <th
                    scope="col"
                    className=" py-4 font-extrabold px-2  text-black text-center uppercase"
                  >
                    অর্থবছর ও মৌসুম
                  </th>
                  <th
                    scope="col"
                    className=" py-4 font-extrabold px-2  text-black text-center uppercase"
                  >
                    তারিখ ও বার
                  </th>
                  <th
                    scope="col"
                    className=" py-4 font-extrabold px-2  text-black text-center uppercase"
                  >
                    কৃষক/কৃষাণীর সংখ্যা
                  </th>
                  <th
                    scope="col"
                    className=" py-4 font-extrabold px-2  text-black text-center uppercase"
                  >
                    স্থান
                  </th>
                  <th
                    scope="col"
                    className=" py-4 font-extrabold px-2  text-black text-center uppercase"
                  >
                    উপস্থিত কর্মকর্তাগণ
                  </th>
                  <th
                    scope="col"
                    className=" py-4 font-extrabold px-2  text-black text-center uppercase"
                  >
                    ছবিসমূহ
                  </th>
                  <th
                    scope="col"
                    className=" py-4 font-extrabold px-2  text-black text-center uppercase"
                  >
                    SAAO-এর নাম ও মোবাইল নং
                  </th>
                  <th
                    scope="col"
                    className=" py-4 font-extrabold px-2  text-black text-center uppercase"
                  >
                    একশন
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {allFieldDays?.length > 0 && allFieldDays?.map((singleFieldDay, index) =>
                  <> <tr className="divide-x divide-gray-200 dark:divide-gray-700">
                    <FieldDayTD text={toBengaliNumber(index + 1)} />
                    <FieldDayTD text={singleFieldDay?.projectInfo?.short} />
                    <FieldDayTD text={singleFieldDay?.subject} />
                    <FieldDayTD text={
                      singleFieldDay?.season +
                      `\n` +
                      singleFieldDay?.fiscalYear}
                    />
                    <FieldDayTD text={toBengaliNumber(
                      new Date(singleFieldDay?.date).toLocaleDateString("bn-BD", {
                        weekday: "long", // Specify to include the full day name
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    )} />
                    <FieldDayTD text={`কৃষকঃ ${toBengaliNumber(singleFieldDay?.farmers?.male)}জন, \n কৃষাণীঃ ${toBengaliNumber(singleFieldDay?.farmers?.female)}, \n মোটঃ ${toBengaliNumber(singleFieldDay?.farmers.male + singleFieldDay?.farmers?.female)}`} />
                    <FieldDayTD text={singleFieldDay?.address?.village} />
                    <FieldDayTD text={singleFieldDay?.guests} />
                    <td className="text-center dashboard-image-control text-balance text-sm font-medium text-gray-800 dark:text-gray-200">
                      <ImageGallery
                        showFullscreenButton={true}
                        showPlayButton={false}
                        showNav={false}
                        showThumbnails={false}
                        autoPlay={true}
                        items={singleFieldDay?.images?.length > 0 && singleFieldDay?.images?.map(singleImage => ({
                          original: singleImage,
                          thumbnail: singleImage
                        }))}
                      />
                    </td>

                    <FieldDayTD text={singleFieldDay?.SAAO?.name + "\n" + toBengaliNumber(singleFieldDay?.SAAO?.mobile)} />

                    <td className="p-3 flex gap-2 text-center whitespace-nowrap text-sm font-medium">

                      <div className="cursor-pointer">
                        <Link to={`/addFieldDay?id=${singleFieldDay?._id}`}><CiEdit size={35} color="black" /></Link>
                      </div>
                      <div className="cursor-pointer">
                        <MdOutlineDelete onClick={() => handleFieldDayDelete(singleFieldDay)} size={35} color="red" />
                      </div>
                    </td>
                  </tr></>)}

              </tbody>
            </table>
            {allFieldDays?.length < 1 &&
              <NoContentFound text={'কোনো মাঠ দিবসের তথ্য পাওয়া যায়নি। দয়া করে মাঠ দিবসের তথ্য যুক্ত করুন'} />
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserFieldDays;
