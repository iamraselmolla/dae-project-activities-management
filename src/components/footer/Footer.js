import React from "react";
import FooterMenuItem from "../shared/FooterMenuItem";

const Footer = () => {
  return (
    <footer className="theme-bg py-6">
      <div className="mx-auto flex flex-col items-center text-center max-w-7xl px-2 sm:px-6 lg:px-8">
        <img src="/images/logo.png" width={100} alt="" srcSet="" />
        <div>
          <div className="flex flex-wrap justify-center mt-6 gap-4">
            <FooterMenuItem link="" text="হোম" />
            <FooterMenuItem link="demos" text="প্রদর্শনী" />
            <FooterMenuItem link="trainings" text="প্রশিক্ষণ" />
            <FooterMenuItem link="fielddays" text="মাঠদিবস" />
            <FooterMenuItem link="distributions" text="উপকরণ বিতরণ" />
            <FooterMenuItem link="dae-group-meeting" text="ডিএই কৃষক গ্রুপ সভা" />
            <FooterMenuItem link="motivational-tour" text="উদ্বুদ্ধকরণ ভ্রমণ" />
            <FooterMenuItem link="all-schools" text="স্কুল" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
