import React from "react";
import { useSelector } from "react-redux";
import SectionTitle from "../../shared/SectionTitle";
import { FaUserCircle } from "react-icons/fa"; // Import user icon
import { toBengaliNumber } from "bengali-number";

const AllUsers = () => {
  const { blockAndUnions } = useSelector((state) => state.dae);

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="সকল ব্লক, ইউনিয়ন এবং ইউজার তথ্য" />
        <div className="grid mt-10 grid-cols-1 gap-4 gap-y-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {blockAndUnions?.map((single, index) => (
            <div
              key={single?.unionB}
              className="relative bg-white border border-gray-200 rounded-lg shadow-lg"
            >
              {/* Icon Container */}
              <div className="absolute z-40 top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 theme-bg p-4 rounded-full border-4 border-white shadow-md">
                <FaUserCircle className="text-white text-4xl" />
              </div>

              {/* Serial Number */}
              <div className="absolute top-4 right-4 bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded-full">
                {toBengaliNumber(index + 1)}
              </div>

              <div className="pt-16 pb-6 px-6 text-center">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  ব্লকঃ {single?.blockB} <br /> ইউনিয়নঃ {single?.unionB}
                </h2>
                <div>
                  <p className="text-base font-medium text-gray-700">
                    উপঃ কৃষি কর্মকর্তাঃ {single?.SAAO?.name}
                  </p>
                  <p className="text-sm text-gray-600 blur">
                    মোবাইলঃ {single?.SAAO?.mobile}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllUsers;
