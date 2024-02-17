import React from "react";
import SingleDemo from "./SingleDemo";
import { Link } from "react-router-dom";

const Demo = () => {
  return (
    <section className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div className="text-right font-extrabold">
        <Link to="/addDemo">
          <button className="btn btn-outline btn-accent mb-5 border-2 px-5 py-22">
            <div className="flex justify-center items-center gap-2 text-lg">
              <span className="relative flex h-8 w-8">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-8 w-8 bg-sky-500"></span>
              </span>
              <div>প্রদর্শনী যুক্ত করুন</div>
            </div>
          </button>
        </Link>
      </div>
      <div className="container px-4 md:px-0 grid md:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-6">
        <SingleDemo />
        <SingleDemo />
        <SingleDemo />
        <SingleDemo />
        <SingleDemo />
        <SingleDemo />
        <SingleDemo />
        <SingleDemo />
        <SingleDemo />
        <SingleDemo />
        <SingleDemo />
        <SingleDemo />
      </div>
    </section>
  );
};

export default Demo;
