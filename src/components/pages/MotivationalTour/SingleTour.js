import React, { useContext } from "react";
import { GiFarmer } from "react-icons/gi";
import {
  BsCalendarDate,
  BsFillPeopleFill,
  BsFillCloudSunFill,
} from "react-icons/bs";
import ImageGallery from "react-image-gallery";
import { toBengaliNumber } from "bengali-number";
import { AuthContext } from "../../AuthContext/AuthProvider";

const SingleTour = ({ tour }) => {
  const { projectInfo, place, time, farmers, officers, comment, images } = tour;
  const { startDate, endDate } = time.date;
  const { fiscalYear, season } = time;
  const { role } = useContext(AuthContext);

  const imagesArr = images.map((url) => ({
    original: url,
    thumbnail: url,
  }));

  return (
    <div className={`rounded-lg bg-white border relative shadow-xl`}>
      <div className="relative">
        <ImageGallery autoPlay={true} items={imagesArr} />
        <div className="flex items-center absolute top-3">
          <p className="px-2 py-1 bg-black text-white rounded-r-md ">
            {projectInfo?.short}
          </p>
        </div>
      </div>
      <div className="content-part px-3 py-2">
        <h2 className="text-md font-extrabold">{place}</h2>
        <div className="flex items-center gap-2">
          <BsFillPeopleFill /> <p>{officers}</p>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <GiFarmer />
            <p>{toBengaliNumber(farmers)}</p>
          </div>
          <div className="flex items-center gap-2">
            <BsFillCloudSunFill />
            <p>
              {season}/{fiscalYear}
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <BsCalendarDate />
            <div>
              {toBengaliNumber(
                new Date(startDate).toLocaleString("bn-BD", {
                  day: "numeric",
                  month: "numeric",
                  year: "numeric",
                })
              )}{" "}
              - {toBengaliNumber(new Date(endDate).toLocaleDateString())}
            </div>
          </div>
          <div className="flex items-center mt-3 gap-2">
            <img src="images/project.png" alt="Project Icon" />
            <p>{projectInfo?.details}</p>
          </div>
        </div>
      </div>
      <div className="px-3 py-2">
        <p>{comment}</p>
      </div>
    </div>
  );
};

export default SingleTour;
