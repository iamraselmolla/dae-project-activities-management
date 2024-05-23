import React from 'react';
import { GiDiscussion } from 'react-icons/gi';
import { GoNote } from 'react-icons/go';
import { MdAgriculture, MdTour } from 'react-icons/md';
import IconBox from './IconBox';
import { AiOutlineFileDone } from 'react-icons/ai';

const IconBoxSection = () => {
    const data = [
        {
            icon: <MdAgriculture />,
            text: "প্রদর্শনী",
            backgroundColor: "#E2FBD9", // Light green
        },
        {
            icon: <MdTour />,
            text: "মাঠ দিবস",
            backgroundColor: "#FED7D7", // Light red
        },
        {
            icon: <AiOutlineFileDone />,
            text: "প্রশিক্ষণ",
            backgroundColor: "#FDF3C7", // Light yellow
        },
        {
            icon: <GiDiscussion />,
            text: "উদ্বুদ্ধকরণ ভ্রমণ",
            backgroundColor: "#F5E1FF", // Light purple
        },
        {
            icon: <GoNote />,
            text: "মালামাল বিতরণ",
            backgroundColor: "#BBE1FA", // Light blue
        },
        {
            icon: <GoNote />,
            text: "ডিএই কৃষক গ্রুপ সভা",
            backgroundColor: "#FFEDD8", // Light orange
        },
        {
            icon: <GoNote />,
            text: "স্কুল",
            backgroundColor: "#B2CCFF", // Light blue
        },
        {
            icon: <GoNote />,
            text: "নোটস",
            backgroundColor: "#C9D6FF", // Light blue
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
