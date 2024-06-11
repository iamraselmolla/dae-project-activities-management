import React from 'react';
import { PiGrains } from "react-icons/pi";
import { FaRegSave } from "react-icons/fa";
import { GiSoccerField } from "react-icons/gi";
import { TbBus } from "react-icons/tb";




import WhyThisSoftwareIcon from '../../shared/WhyThisSoftwareIcon';


const WhyweUs2 = () => {
    return (
        <section className='pb-24 pt-8 bg-white'>
            <div className='mx-auto items-center max-w-7xl px-2 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-24'>
                <div className="">
                    <h2 className="text-xl theme-color font-extrabold mb-4">কেন এই সফটওয়্যার?</h2>
                    <h3 className="md:text-3xl text-2xl font-semibold mb-8">নিম্নোক্ত কিছু কারণে এই সফটওয়্যার আপনার দৈনন্দিন দায়িত্ব পালনে সহায়ক হবে।</h3>
                    <div className="flex flex-col gap-8">


                        <WhyThisSoftwareIcon heading={'মাঠদিবস সংরক্ষণ'} text={'সকল প্রকল্পের আয়োজিত মাঠদিবসের স্থান, প্রকল্পের তথ্য, উপস্থিত কর্মকর্তার নাম/পদবী, তারিখ এবং মন্তব্যসহ ছবি সংরক্ষণ'} Icon={GiSoccerField} />
                        <WhyThisSoftwareIcon heading={'উদ্বুদ্ধকরণ ভ্রমণ'} text={'প্রকল্পের উদ্বুদ্ধকরণ ভ্রমণ, তারিখ ও স্থানসহ ছবি এবং মন্তব্য সংরক্ষণ'} Icon={TbBus} />
                        <WhyThisSoftwareIcon heading={'সকল PFS/FBS অথবা মাঠ স্কুল'} text={'আয়োজিত সকল প্রকল্পের PFS/FBS অথবা মাঠ স্কুলের ছবি, তারিখ এবং উপস্থিত কর্মকর্তার তথ্য সম্বলিত ছবি এবং তারিখ সংরক্ষণ'} Icon={PiGrains} />
                        <WhyThisSoftwareIcon heading={'স্পেশাল কাজের নোটস'} text={'কোনো গুরুত্বপূর্ণ সভা, সেমিনার অথবা কৃষি ও কৃষক সেবা প্রদানের দিন, তারিখ ও উদ্দেশ্যসহ নোট যুক্তকরণ এবং সম্পন্ন করার সময় কার্যশেষে মন্তব্য যুক্তকরণ'} Icon={FaRegSave} />

                    </div>
                </div>
                <div className=" text-center">
                    <figure className="m-0 p-0"><img className="w-auto" src="https://sandbox-tailwindcss.ibthemespro.com/assets/img/illustrations/3d5.png" srcSet="https://sandbox-tailwindcss.ibthemespro.com/assets/img/illustrations/3d5.png" alt="image" /></figure>
                </div>
            </div>
        </section>
    );
};

export default WhyweUs2;