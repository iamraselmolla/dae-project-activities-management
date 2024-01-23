import React from "react";
import SingleTraining from "./SingleTraining";
import { Link } from "react-router-dom";

const Training = () => {
  return (
    <section className="">
      <div className="container px-4 md:px-0 text-right font-extrabold">
        <Link to="/addTraining">
          <button className="btn btn-outline btn-accent mb-5 border-2 px-5 py-22">
            <div className="flex justify-center items-center gap-2 text-lg">
              <span className="relative flex h-8 w-8">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-8 w-8 bg-sky-500"></span>
              </span>
              <div>প্রশিক্ষণ যুক্ত করুন</div>
            </div>
          </button>
        </Link>
      </div>
      <div className="container px-4 md:px-0  grid md:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-6">
        <SingleTraining />
        <SingleTraining />
        <SingleTraining />
        <SingleTraining />
        <SingleTraining />
        <SingleTraining />
        <SingleTraining />
        <SingleTraining />
        <SingleTraining />
        <SingleTraining />
        <SingleTraining />
        <SingleTraining />
        <SingleTraining />
        <SingleTraining />
        <SingleTraining />
        <SingleTraining />
      </div>
    </section>
  );
};

export default Training;
