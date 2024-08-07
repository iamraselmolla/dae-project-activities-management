import React from "react";
import { Link } from "react-router-dom";
import("../../../css/banner.css");

const Banner = () => {
  return (
    <section>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 items-center">
          <div className="">
            <h3 className="px-6 mb-10 inline-block theme-bg text-white py-2 rounded-xl">
              প্রকল্প কার্যক্রম ম্যানেজমেন্ট
            </h3>
            <h1 className="text-4xl banner_heading font-extrabold mb-8">
              উপকরণ বিতরণ, প্রদর্শনী, প্রশিক্ষণ, মাঠদিবস
            </h1>
            <p className="font-bold">
              সংশ্লিষ্ট উপসহকারী কৃষি কর্মকর্তা, উপসহকারী উদ্ভিদ সংরক্ষণ
              কর্মকর্তা, সহকারী কৃষি সম্প্রসারণ কর্মকর্তা, কৃষি সম্প্রসারণ
              কর্মকর্তা, অতিরিক্ত কৃষি কর্মকর্তা এবং উপজেলা কৃষি অফিসার কর্তৃক
              প্রকল্পের যাবতীয় কার্যক্রম যেমন  প্রদর্শনী, প্রশিক্ষণ, মাঠদিবস,
              উপকরণ বিতরণ সংরক্ষণ, পর্যবেক্ষণ ও প্রদান করা হবে।
            </p>
            <div className="mt-8 flex md:justify-start justify-center">
              <Link to="/all-projects">
                <button className="btn lg:text-xl text-md font-extrabold text-white  theme-bg hover:bg-black hover:text-white mr-5 lg:px-16 md:px-10 px-6">
                  সকল প্রকল্প
                </button>
              </Link>
              <Link to={'/all-users'}>
                <button className="btn lg:text-xl text-md font-extrabold text-white  theme-bg hover:bg-black hover:text-white mr-5 lg:px-16 md:px-10 px-6">
                  সকল ইউজার
                </button>
              </Link>
            </div>
          </div>
          <div className="flex md:pt-10 lg:pt-0 pt-10 justify-center">
            <img src="images/banner.png" alt=" Banner Image" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
