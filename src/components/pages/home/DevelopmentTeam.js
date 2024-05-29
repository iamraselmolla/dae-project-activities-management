import React from "react";
import SingleMember from "./SingleMember";

function DevelopmentTeam() {
  const teamData = [
    {
      name: "শেখ সাখাওয়াত হোসেন",
      title: "UAO & Project Advisor",
      role: "UAO & Project Advisor",
      img: "images/uao.png",
      socialLinks: {
        facebook: "",
        github: "",
        linkedin: "",
        whatsapp: "+",
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
        facebook: "iamraselmolla",
        github: "iamraselmolla",
        linkedin: "iamraselmolla",
        whatsapp: "+8801944835365",
        portfolio: "http://iamraselmolla.netlify.app/",
        gmail: "raselmolla6336@gmail.com",
      },
    },
    {
      name: "হাবিবুল্লাহ হাওলাদার সুমন",
      title: "Software Engineer",
      role: "Database architect",
      img: "https://media.licdn.com/dms/image/D5603AQG_zDgeX1-UKQ/profile-displayphoto-shrink_800_800/0/1711819018065?e=1722470400&v=beta&t=2wWdTSURK1XeH5lBlIBRUhWHIHQt2ZDpOPtlpMY4Z6E",
      socialLinks: {
        facebook: "",
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
      <div class=" relative">
        <div class="grid grid-cols-1 pb-4 text-center">
          <h3 class="mb-2 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold">
            ডেভেলপমেন্ট টিমের পরিচিতি
          </h3>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 grid-cols-1 items-center mt-8 gap-8">
          {teamData.map((data, index) => <SingleMember data={data} key={data?.socialLinks?.gmail} />)}
        </div>
      </div>
    </section>
  );
}

export default DevelopmentTeam;
