import React from "react";
import { useSelector } from "react-redux";
import AddModuleButton from "../../../../shared/AddModuleButton";
import SectionTitle from "../../../../shared/SectionTitle";
import NoContentFound from "../../../../shared/NoContentFound";
import MotivationalTourTableRow from "./MotivationalTourTableRow";

function AllMotivationalTours() {
  const { tours } = useSelector((state) => state.dae);
  console.log(tours);
  return (
    <div className="flex py-4 flex-col">
      <div className="mt-4 overflow-x-scroll">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <AddModuleButton
            link={"addTour"}
            btnText={"মোটিভেশনাল ট্যুর যুক্ত করুন"}
          />
          <div>
            <SectionTitle title={"মোটিভেশনাল ট্যুর"} />
            <div className="border rounded-lg shadow overflow-hidden dark:border-gray-700 dark:shadow-gray-900">
              {tours?.length > 0 && (
                <table className="min-w-full bg-white divide-y divide-gray-200 dark:divide-gray-700">
                  <thead>
                    <tr className="divide-x font-extrabold divide-gray-200 dark:divide-gray-700">
                      <th className="py-4 font-extrabold px-2 text-black text-center uppercase">
                        ক্র: নং:
                      </th>
                      <th className="py-4 font-extrabold px-2 text-black text-center uppercase">
                        প্রকল্প
                      </th>
                      <th className="py-4 font-extrabold px-2 text-black text-center uppercase">
                        স্থান
                      </th>
                      <th className="py-4 font-extrabold px-2 text-black text-center uppercase">
                        তারিখ
                      </th>
                      <th className="py-4 font-extrabold px-2 text-black text-center uppercase">
                        কৃষকের সংখ্যা
                      </th>
                      <th className="py-4 font-extrabold px-2 text-black text-center uppercase">
                        অফিসার
                      </th>
                      <th className="py-4 font-extrabold px-2 text-black text-center uppercase">
                        মন্তব্য
                      </th>
                      <th className="py-4 font-extrabold px-2 text-black text-center uppercase">
                        ছবিসমূহ
                      </th>
                      <th className="py-4 font-extrabold px-2 text-black text-center uppercase">
                        একশন
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {tours?.length > 0 &&
                      tours?.map((tour, index) => (
                        <MotivationalTourTableRow
                          data={tour}
                          index={index}
                          key={tour?._id}
                        />
                      ))}
                  </tbody>
                </table>
              )}
              {tours?.length < 1 && (
                <NoContentFound text={"কোনো ট্যুরের তথ্য পাওয়া যায়নি!!"} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllMotivationalTours;
