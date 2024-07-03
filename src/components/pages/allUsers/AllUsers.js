import React from "react";
import { useSelector } from "react-redux";
import SectionTitle from "../../shared/SectionTitle";

const AllUsers = () => {
  const { blockAndUnions } = useSelector((state) => state.dae);

  return (
    <section className="py-20">
      <div className="container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <SectionTitle title={"সকল ব্লক, ইউনিয়ন এবং ইউজার তথ্য"} />
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4">
          {blockAndUnions?.map((single) => (
            <div
              key={single?.unionB}
              className="px-4 text-center relative py-3 rounded-xl bg-white"
            >
              <h2 className="font-bold">
                ব্লকঃ {single?.blockB} <br /> ইউনিয়নঃ {single?.unionB}
              </h2>
              <div>
                <h4>উপঃ কৃষি কর্মকর্তাঃ {single?.SAAO?.name}</h4>
                <h4>মোবাইলঃ {single?.SAAO?.mobile}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllUsers;
