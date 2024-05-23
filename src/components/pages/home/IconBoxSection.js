import React from 'react';
import { GiDiscussion } from 'react-icons/gi';
import { GoNote } from 'react-icons/go';
import { MdAgriculture, MdTour } from 'react-icons/md';
import IconBox from './IconBox';
import { AiOutlineFileDone } from 'react-icons/ai';

const IconBoxSection = () => {
    const data = [
        {
            icon: < MdAgriculture />,
            text: "প্রদর্শনী",
            backgroundColor: "#c4ff8b", // Light green
        },
        {
            icon: <MdTour />,
            text: "মাঠ দিবস",
            backgroundColor: "#ffdbdb", // Light red
        },
        {
            icon: < AiOutlineFileDone />,
            text: "প্রশিক্ষণ",
            backgroundColor: "#fde2a8", // Light orange
        },
        {
            icon: <GiDiscussion />,
            text: "উদ্বুদ্ধকরণ ভ্রমণ",
            backgroundColor: "#f4e8ff", // Light purple
        },
        {
            icon: <GoNote />,
            text: "মালামাল বিতরণ",
            backgroundColor: "#a9cded", // Light blue
        },
        {
            icon: <GoNote />,
            text: "ডিএই কৃষক গ্রুপ সভা",
            backgroundColor: "#a9cded", // Light blue
        },
        {
            icon: <GoNote />,
            text: "স্কুল",
            backgroundColor: "#a9cded", // Light blue
        },
        {
            icon: <GoNote />,
            text: "নোটস",
            backgroundColor: "#a9cded", // Light blue
        },
    ]
    return (
        <section className='py-24'>
            <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols- 3 lg:grid-cols-4 gap-4'>
                {data.map((card, index) => (
                    <IconBox key={index} {...card} />
                ))}
            </div>
        </section>
    );
};

export default IconBoxSection;