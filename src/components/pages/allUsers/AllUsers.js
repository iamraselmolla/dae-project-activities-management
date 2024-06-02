import React from "react";
import { useSelector } from "react-redux";

const AllUsers = () => {
  const { blockAndUnions } = useSelector((state) => state.dae);

  return (
    <section className="py-20">
      <div className="container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {blockAndUnions?.map((single) => (
            <div className="px-4 relative py-5 pt-12 mb-10 rounded-xl bg-white">
              {single?.SAAO?.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllUsers;
