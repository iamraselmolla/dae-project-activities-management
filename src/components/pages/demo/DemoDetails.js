import React, { useEffect, useState } from "react";
import { FaBirthdayCake } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { getSingleDemoById } from "../../../services/userServices";
import toast from "react-hot-toast";
import Loader from "../../shared/Loader";
import NoContentFound from "../../shared/NoContentFound";
import { CiCalendarDate } from "react-icons/ci";
import { BsFillCloudSunFill } from "react-icons/bs";
import { GrTechnology } from "react-icons/gr";
import { FaBowlRice } from "react-icons/fa6";

function DemoDetails() {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [demoData, setDemoData] = useState(null);
  const [fetchEnd, setFetchEnd] = useState(false);
  useEffect(() => {
    if (id) {
      const fetchDemoData = async () => {
        try {
          const result = await getSingleDemoById(id);
          if (result?.status === 200) {
            setDemoData(result?.data?.data);
            setLoading(false);
            setFetchEnd(true);
          }
        } catch (err) {
          toast.error(
            "প্রদর্শনীটির তথ্য পেতে সমস্যা হচ্ছে । দয়া করে সংশ্লিষ্ট কর্তৃপক্ষকে অবহিত করুন।"
          );
          setFetchEnd(true);
        }
      };
      fetchDemoData();
    }
  }, [id]);

  const CardWrapper = ({ children, title }) => {
    return (
      <div className="col-span-1 sm:col-span-3 grid grid-cols-1 sm:grid-cols-2 bg-white rounded-xl p-4 gap-4">
        <h2
          id="Unbounded"
          className="col-span-1 sm:col-span-2 text-ter text-2xl "
        >
          {title}
        </h2>
        {children}
      </div>
    );
  };
  return (
    <div className="bg-slate-100 text-black mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      {!loading && fetchEnd && demoData && (
        <div className="py-20" id="screenshot-element">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="col-span-1 bg-white  rounded-xl overflow-hidden">
              <img
                src={
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAA2FBMVEX////x7+Lf3dA7g4JNo6Tq6uo+PkBNTlDBwcAyMjeamppJSkzKyb/39edhYWE2NjnTpUeampZqamtEUFE/RUmgn5o5PkKQkItbW1pycXNDREb2ulDttVFXpqbu8OA5hIA9dnXYuHb215z179rRoTwzeHWizMbn8eg9j47Mzcinp6PS0tIAAACHh4K2t7AeHSH358P126vizJ/xx3b2tkDOp1PlyZXv5MjvvF7TrmTs2bDwy4XG0MWtv7adt7Fol5J9pJ/Q49e+2M15s6+SvrtWjIlCbW1JZGXWYqPUAAAEI0lEQVR4nO3bbVObTBiG4dKNiSklxEfbqjFEDQSftkatWm0lEEhS//8/KkveILyEezqBpb1Op+Po9IPH3LsL+bBv3iCEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhP6R/v/8gdwBsQ/7hVD2WnLD/5IbhOS6Sqyuyl8KsDQDhnx6ROhUbVJS67yvu9e0uEWWWwe0VfaJ0HVLDTjqri17KrccDyWFlERreMw1N7sezX6dW95T/7q3xIbHPqb5uQjMAZFCx7z9xDHvCsAcD6mDoWOGjWIwcou8yuiY9/6uAQYYYIABBhhggAEGGGBExWiS1L+9u/t2+1R5DKfc3XceHnT98Xs/+Dn4V0mMb7k863Q6Z+22rl88VR1z1+nMMT7nImGpVQnz9LzGtPVv2sZcqoW57IQxP/hCq+4yuw9j2u34OqsQpv8cweg/K405+4swUnQy7WpjXiKYx0rvGek2cprxl4AKY/ovD+uHJh9M7ueMNbLt0UgkjCY93S8x+mN8x6RjbIcZhjEbW+JguOby+aFzpuvti1tl/pscGMnuGYxnzATCBPvm8uX+x/ef8f2SipEstsywxcL4O6ffT/vUloixZmytEQ2zWnP5MJbDQo0loTDaxvctGMsxwhjDEwmTZMjCjCMWxhyRMJnFLTZjvahmJCYmPqSYZcRiOeJhNE1LAMUsszgmMhoxMLmWmZVkYY4lGkaTFNP1XDMT4xhJGGYLh1G8SbfbnbiR/xOhSCmW8GjEwChet8brRjQRyziZEnmpEQKjDGqLJmYKxu6lYRizRMKYk1otSRM+yFjsCZMwmtIxmuR2a6GmWgIm+SBbaSxhMF4t2iCO4W+XGcvMGAuCMQcbllrXkxZPzxUmdfMvNZ4IGMWdblr4kbYxmW0WxmYiYLxJ3LI+BJYH2VbL8gwoE2N63SSLr1GCdbY+yLZXNia+XdZHmrKajLUdws8Gu1yMkrjE5l0NlAXGTXmJieWWhvEXkXuVbvHzFI1jzFnWmRyezri8ySibT5ckTa6DbNWoJIyWsV2W+Qd00sfk9MYlYZKeLrEmrjQKLDk5vVEpGDdj64eaDjLfyGI5xWK0YOunPV1iXZEs/q4pfDLmNK+FjHGGrWInY+ZbYmRMsLHGRU6mr7i5x+KfZ1e5T7JF50cFXmzY/nSJYoiWXpEYc0qx0PcMOz8sDEPZLqJjbKpFXEzjcEa1iIxhfxGmcU61kE8z9qug06whv2Z/gPnTyfjPJOOwqNuADfnXTjF8MB+LwHxpBjebX2ddUrSX5vNXbqnf7PzmeX1+jVw+JHX0kVJ93s3erjH7TdLl+cUV+tM6OXXnq8zvXeOUnkq7Qx9coz/ZvcWfzfUJuf+onVwPi7D47RVQQRSEEEIIIYQQQgghhBBCCCGEEEIIIYQQQggh9C/1G8tw8kjtcM/VAAAAAElFTkSuQmCC"
                }
                className="h-[100%] m-auto"
                alt="User Image"
              />
            </div>
            {/* Top Card */}
            <div className="col-span-1 sm:col-span-2 bg-white rounded-xl shadow-xl p-4 flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <h3 className="text-black text-2xl font-bold">
                  {demoData?.projectInfo?.full} ({demoData?.projectInfo?.short})
                </h3>
              </div>
              <div className="flex gap-4">
                <CiCalendarDate sx={{ color: "#f72151" }} fontSize="medium" />
                <h3>অর্থবছরঃ {demoData?.demoTime?.fiscalYear}</h3>
              </div>
              <div className="flex gap-4">
                <BsFillCloudSunFill
                  sx={{ color: "#f72151" }}
                  fontSize="medium"
                />
                <h3>মৌসুমঃ {demoData?.demoTime?.season}</h3>
              </div>
              <div className="flex gap-4">
                <GrTechnology sx={{ color: "#f72151" }} fontSize="medium" />
                <h3>প্রযুক্তিঃ {demoData?.demoInfo?.tech}</h3>
              </div>
              <div className="flex gap-4">
                <FaBowlRice sx={{ color: "#f72151" }} fontSize="medium" />
                <h3>ফসলঃ {demoData?.demoInfo?.crop}</h3>
              </div>
              <div className="flex gap-4">
                <FaBowlRice sx={{ color: "#f72151" }} fontSize="medium" />
                <h3>জাতঃ {demoData?.demoInfo?.variety}</h3>
              </div>
            </div>

            {/* Basic Details */}
            <CardWrapper title="প্রদর্শনীপ্রাপ্ত কৃষকের তথ্য">
              <h3>
                নাম:{" "}
                <span className="font-semibold">
                  {demoData?.farmersInfo?.name}
                </span>
              </h3>
              <h3>
                পিতা/স্বামীর নাম:
                <span className="font-semibold">
                  {demoData?.farmersInfo?.fatherOrhusbandName}
                </span>
              </h3>
              <h3>
                গ্রাম:{" "}
                <span className="font-semibold">
                  {demoData?.address?.village}
                </span>
              </h3>
              <h3>
                ব্লক:{" "}
                <span className="font-semibold">
                  {demoData?.address?.block}
                </span>
              </h3>
              <h3>
                ইউনিয়ন:{" "}
                <span className="font-semibold">
                  {demoData?.address?.union}
                </span>
              </h3>
              <h3>
                মোবাইল নং:{" "}
                <span className="font-semibold">
                  {demoData?.numbersInfo?.mobile}
                </span>
              </h3>
              <h3>
                জাতীয় পরিচয়পত্র নং:{" "}
                <span className="font-semibold">
                  {demoData?.numbersInfo?.NID}
                </span>
              </h3>
              <h3>
                BID নং:{" "}
                <span className="font-semibold">
                  {demoData?.numbersInfo?.BID}
                </span>
              </h3>
              <h3>
                কৃষি কার্ড নং:{" "}
                <span className="font-semibold">
                  {demoData?.numbersInfo?.agri}
                </span>
              </h3>
            </CardWrapper>

            <CardWrapper title="সময়">
              <h3>
                Birth Hour: <span className="font-semibold">-</span>
              </h3>
              <h3>
                Birth Minute: <span className="font-semibold">-</span>
              </h3>
              <h3>
                Birth Place: <span className="font-semibold">-</span>
              </h3>
              <h3>
                Gotra: <span className="font-semibold">-</span>
              </h3>
              <h3>
                Star: <span className="font-semibold">-</span>
              </h3>
              <h3>
                Raasi / Moon sign: <span className="font-semibold">-</span>
              </h3>
              <h3>
                Manglik: <span className="font-semibold">-</span>
              </h3>
            </CardWrapper>
          </div>
          <div>
            <h2 className="col-span-1 mt-5 sm:col-span-2 text-ter text-2xl">
              Professional Details
            </h2>
            <h3 className="col-span-1 sm:col-span-2  text-xl ">Education: </h3>
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-center  text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr className="text-xl">
                    <th scope="col" className="px-6 py-3">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Institue
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Completion
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Mapping over education data */}
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      Bachelor's Degree
                    </th>
                    <td className="px-6 py-4">Example University</td>
                    <td className="px-6 py-4">June 2012</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {!fetchEnd && loading && (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      )}
      {!loading && fetchEnd && !demoData && (
        <NoContentFound text={"প্রদর্শনী খুজে পাওয়া যায়নি।"} />
      )}
    </div>
  );
}

export default DemoDetails;
