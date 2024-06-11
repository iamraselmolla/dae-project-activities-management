import React from "react";
import FooterMenuItem from "../shared/FooterMenuItem";

const Footer = () => {
  return (
    <footer className="theme-bg py-6">
      <div className="mx-auto flex items-center justify-around text-center max-w-7xl px-2 sm:px-6 lg:px-8">
        <div><img src="/images/logo.png" width={100} alt="" srcSet="" /></div>

        <div className="flex flex-col gap-4 justify-center">
          <FooterMenuItem link="" text="হোম" />
          <FooterMenuItem link="demos" text="প্রদর্শনী" />
        </div>
        <div className="flex flex-col gap-4 justify-center">
          <FooterMenuItem link="trainings" text="প্রশিক্ষণ" />
          <FooterMenuItem link="fielddays" text="মাঠদিবস" />
        </div>
        <div className="flex flex-col gap-4 justify-center">
          <FooterMenuItem link="distributions" text="উপকরণ বিতরণ" />
          <FooterMenuItem link="dae-group-meeting" text="ডিএই কৃষক গ্রুপ সভা" />
        </div>
        <div className="flex flex-col gap-4 justify-center">
          <FooterMenuItem link="motivational-tour" text="উদ্বুদ্ধকরণ ভ্রমণ" />
          <FooterMenuItem link="all-schools" text="স্কুল" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;



