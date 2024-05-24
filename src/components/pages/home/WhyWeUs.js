import React from 'react';
import { MdOutlineHistory } from "react-icons/md";
import { FaPersonCirclePlus } from "react-icons/fa6";
import { PiGrains } from "react-icons/pi";
import { FaRegSave } from "react-icons/fa";
import WhyThisSoftwareIcon from '../../shared/WhyThisSofywareIcon';


const WhyweUs = () => {
    return (
        <section className='py-24'>
            <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-24'>

                <div className=" text-center">
                    <figure className="m-0 p-0"><img className="w-auto" src="https://sandbox-tailwindcss.ibthemespro.com/assets/img/illustrations/3d8.png" srcSet="https://sandbox-tailwindcss.ibthemespro.com/assets/img/illustrations/3d8.png" alt="image" /></figure>
                </div>
                <div className="">
                    <h2 className="text-xl text-blue-500 font-extrabold mb-4">কেন এই সফটওয়্যার?</h2>
                    <h3 className="text-3xl font-semibold mb-8">নিম্নোক্ত কিছু কারণে এই সফটওয়্যার আপনার দৈনন্দিন দায়িত্ব পালনে সহায়ক হবে।</h3>
                    <div className="flex flex-col gap-4">

                        <WhyThisSoftwareIcon heading={'অতীতের ডাটাবেইজ'} text={'ইউজারের অতীতে যুক্ত করা সকল তথ্যের সহজ এক্সেস'} Icon={MdOutlineHistory} />
                        <WhyThisSoftwareIcon heading={'ভিজিট সংরক্ষণ'} text={'তারিখ এবং নামসহ সকল হাই-অফিশিয়াল ভিজিট সংরক্ষণ'} Icon={FaPersonCirclePlus} />

                        <WhyThisSoftwareIcon heading={'সকল কার্যক্রম সংরক্ষণ'} text={'আয়োজিত মাঠদিবস, উদ্বুদ্ধকরণ ভ্রমণ, সকল স্কুল, মালামাল বিতর'} Icon={PiGrains} />
                        <WhyThisSoftwareIcon heading={'অতীতের ডাটাবেইজ'} text={'ইউজারের অতীতে যুক্ত করা সকল তথ্যের সহজ এক্সেস'} Icon={FaRegSave} />

                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyweUs;