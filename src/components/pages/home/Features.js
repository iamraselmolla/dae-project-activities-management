import React from "react";
import { Link } from "react-router-dom";
import SectionTitle from "../../shared/SectionTitle";

const Features = () => {
  const allFeatures = [
    {
      title: "প্রদর্শনী",
      des: "নতুন প্রদর্শনী তথ্য যুক্তকরণ, সম্পাদন, প্রদর্শনীর আপডেট তথ্য এবং বর্তমান অবস্থার চিত্র",
      img: "images/features/1.jpg",
      link: "/demos",
    },
    {
      title: "প্রশিক্ষণ",
      des: "প্রশিক্ষণের তথ্য, চিত্র, অতিথি, উপস্থিত কৃষক সংখ্যা (নারী ও পুরুষ সংখ্যা) এবং বিষয়বস্তু যুক্তকরণ",
      img: "images/features/2.jpg",
      link: "/trainings",
    },
    {
      title: "মাঠদিবস",
      des: "ফসল ভিত্তিক মাঠ দিবসের তথ্য, অতিথি, ছবি, উপস্থিত কৃষক সংখ্যা",
      img: "images/features/3.jpg",
      link: "/fielddays",
    },
    {
      title: "মালামাল বিতরণ",
      des: "প্রকল্পভিত্তিক বিনামূল্যে কৃষকদের মালামাল বিতরণ, উপস্থিত অতিথি, কৃষক সংখ্যা",
      img: "images/features/4.jpg",
      link: "/distributions",
    },
  ];
  return (
    <section className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <SectionTitle title="প্রকল্পের কার্যক্রম" />
      <div className="container px-5 md:px-0 grid gap-7 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 text-center">
        {allFeatures?.map((singleFeatures) => (
          <>
            <div
              key={singleFeatures.title}
              className="shadow-xl drop-shadow-lg shadow-slate-400 rounded-4"
            >
              <img src={singleFeatures.img} className="w-100" alt="" />
              <div className="px-4 py-4 bg-white text-black">
                <h2 className="text-3xl font-extrabold mb-3">
                  {singleFeatures.title}
                </h2>
                <p className="font-bold">{singleFeatures.des}</p>
                <div>
                  <Link
                    className="font-bold border-2 rounded-md border-black rounded-4 w-100 block hover:bg-black hover:text-white transition-all py-3 my-2"
                    to={singleFeatures.link}
                  >
                    সকল {singleFeatures.title} দেখুন
                  </Link>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </section>
  );
};

export default Features;
