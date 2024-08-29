import React from "react";
import SingleMember from "./SingleMember";

function DevelopmentTeam() {
  const teamData = [
    {
      name: "শেখ সাখাওয়াত হোসেন",
      title: "Upazila Agriculture Officer",
      role: "Project Advisor",
      img: "images/uao.png",
      socialLinks: {
        facebook: "",
        github: "",
        linkedin: "",
        whatsapp: "+8801737939379",
        portfolio: "",
        gmail: "sakhoat.dae@gmailcom",
      },
    },
    {
      name: "মোঃ রাসেল মোল্লা",
      title: "Full Stack Developer",
      role: "Project Manager & Lead",
      img: "https://avatars.githubusercontent.com/u/108364128?v=4",
      socialLinks: {
        facebook: "iamraselmolla",
        github: "iamraselmolla",
        linkedin: "iamraselmolla",
        whatsapp: "+8801944835365",
        portfolio: "http://iamraselmolla.netlify.app/",
        gmail: "raselmolla6336@gmail.com",
      },
    },
    {
      name: "শেখ মুহম্মদ যোবায়ের হোসাইন",
      title: "Software Engineer",
      role: "Co-Ordinator & Team Lead",
      img: "https://avatars.githubusercontent.com/u/94280579?v=4",
      socialLinks: {
        facebook: "shaikhmohammad.zubayer",
        github: "s-m-zubayer",
        linkedin: "s-m-zubayer",
        whatsapp: "+8801304979278",
        portfolio: "",
        gmail: "smzubayer9004@gmail.com",
      },
    },
    {
      name: "হাবিবুল্লাহ হাওলাদার সুমন",
      title: "Software Engineer",
      role: "Database architect",
      img: "https://avatars.githubusercontent.com/u/81507608?v=4",
      socialLinks: {
        facebook: "habib9592",
        github: "",
        linkedin: "habibullah-hs",
        whatsapp: "",
        portfolio: "",
        gmail: "habibullah.diu@gmail.com",
      },
    },
  ];
  return (
    <section className={"mx-auto max-w-7xl px-2 sm:px-6 lg:px-8"}>
      <div className=" relative">
        <div className="text-center mb-8">
          <h2 className="text-xl theme-color font-extrabold mb-4">এই এপ্লিকেশন নির্মাণে পেছনে শ্রম ও মেধা যাদের!</h2>
          <h3 className="md:text-3xl text-2xl font-semibold mb-8"> নির্মাণের পেছনের কারিগরসমূহ এবং এই সফটওয়্যার নির্মাণে তাদের অবদান</h3>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 grid-cols-1 items-center mt-3 gap-8">
          {teamData.map((data, index) => <SingleMember data={data} key={data?.socialLinks?.gmail} />)}
        </div>
      </div>
    </section>
  );
}

export default DevelopmentTeam;
