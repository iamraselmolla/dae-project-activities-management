import React from "react";
import("../../../css/banner.css");

const Banner = () => {
  return (
    <section>
      <div className="container px-4 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 items-center">
          <div className="">
            <h3 className="px-3 mb-10 inline-block bg-blue-500 py-1 rounded-xl">
              প্রকল্প কার্যক্রম ম্যানেজমেন্ট
            </h3>
            <h1 className="text-4xl banner_heading font-extrabold mb-8">
              মালামাল বিতরণ, প্রদর্শনী, প্রশিক্ষণ, মাঠদিবস
            </h1>
            <p className="font-bold">
              সংশ্লিষ্ট উপসহকারী কৃষি কর্মকর্তা, উপসহকারী উদ্ভিদ সংরক্ষণ
              কর্মকর্তা, সহকারী কৃষি সম্প্রসারণ কর্মকর্তা, কৃষি সম্প্রসারণ
              কর্মকর্তা, অতিরিক্ত কৃষি কর্মকর্তা এবং উপজেলা কৃষি অফিসার কর্তৃক
              প্রকল্পের যাবতীয় কার্যক্রম যেমন প্রদর্শনী, প্রশিক্ষণ, মাঠদিবস,
              মালামাল বিতরণ সংরক্ষণ, পর্যবেক্ষণ ও প্রদান করা হবে।
            </p>
            <div className="mt-8 flex">
              <button className="btn text-xl font-extrabold border-black bg-transparent hover:bg-black hover:text-white mr-5 px-16">
                প্রদর্শনী
              </button>
              <button className="btn text-xl font-extrabold border-3 border-black bg-transparent hover:bg-black hover:text-white px-16">
                মিডিয়া ভিডিও
              </button>
            </div>
          </div>
          <div className="flex justify-center">
            <img src="images/banner.png" alt=" Banner Image" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
