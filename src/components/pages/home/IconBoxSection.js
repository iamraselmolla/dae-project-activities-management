import React from 'react';
import { GiDiscussion, GiField } from 'react-icons/gi';
import { GoNote } from 'react-icons/go';
import { MdAgriculture, MdTour } from 'react-icons/md';
import IconBox from './IconBox';
import { AiOutlineFileDone } from 'react-icons/ai';
import { LiaSchoolSolid } from "react-icons/lia";
import { LuHelpingHand } from "react-icons/lu";




const IconBoxSection = () => {
    const data = [
        {
            icon: <MdAgriculture />,
            text: "প্রদর্শনী",
            backgroundColor: "#E2FBD9", // Light green
        },
        {
            icon: <GiField />,
            text: "মাঠ দিবস",
            backgroundColor: "#FED7D7", // Light red
        },
        {
            icon: <AiOutlineFileDone />,
            text: "প্রশিক্ষণ",
            backgroundColor: "#FDF3C7",
        },
        {
            icon: <MdTour />,
            text: "উদ্বুদ্ধকরণ ভ্রমণ",
            backgroundColor: "#F5E1FF",
        },
        {
            icon: <LuHelpingHand />,
            text: "উপকরণ বিতরণ",
            backgroundColor: "#ac725d4f",
        },
        {
            icon: <GiDiscussion />,
            text: "ডিএই কৃষক গ্রুপ সভা",
            backgroundColor: "#FFEDD8",
        },
        {
            icon: <LiaSchoolSolid />,
            text: "স্কুল",
            backgroundColor: "#b2ccff80",
        },
        {
            icon: <GoNote />,
            text: "নোটস",
            backgroundColor: "#c9ffcd",
        },
    ];

    return (
        <section className='py-24 bg-white'>
            <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {data.map((card, index) => (
                    <IconBox key={index} {...card} />
                ))}
            </div>
        </section>
    );
};

export default IconBoxSection;
