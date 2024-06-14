import React from "react";
import { toBengaliNumber } from "bengali-number";

const Footer = () => {
  return (
    <footer className="theme-bg py-6 text-center">
      <div className="flex justify-center">
        <img src="/images/logo.png" width={100} alt="Logo" />
      </div>
      <p className="text-white font-extrabold mt-4 text-center">কপিরাইট {toBengaliNumber(new Date().getFullYear())}. সর্বস্বত্ত্ব সংরক্ষিত @ কৃষি সম্প্রসারণ অধিদপ্তর</p>
    </footer >
  );
};

export default Footer;
