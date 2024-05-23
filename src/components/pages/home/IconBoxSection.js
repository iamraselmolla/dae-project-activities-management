import React from 'react';
import { GiDiscussion } from 'react-icons/gi';
import { GoNote } from 'react-icons/go';
import { MdAgriculture, MdTour } from 'react-icons/md';
import IconBox from './IconBox';
import { AiOutlineFileDone } from 'react-icons/ai';

const IconBoxSection = () => {
    const data = [
        {
            icon: <AiOutlineFileDone />,
            text: "উদ্বুদ্ধকরণ ভ্রমণ",
            backgroundColor: "#c4ff8b", // Light green
        },
        {
            icon: <MdTour />,
            text: "উদ্বুদ্ধকরণ ভ্রমণ",
            backgroundColor: "#ffdbdb", // Light red
        },
        {
            icon: <MdAgriculture />,
            text: "উপকরণ বিতরণ",
            backgroundColor: "#fde2a8", // Light orange
        },
        {
            icon: <GiDiscussion />,
            text: "প্রশিক্ষণ",
            backgroundColor: "#f4e8ff", // Light purple
        },
        {
            icon: <GoNote />,
            text: "অসম্পন্ন নোটস",
            backgroundColor: "#a9cded", // Light blue
        },
    ]
    return (
        <section className='py-8'>
            <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
                {data.map((card, index) => (
                    <IconBox key={index} {...card} />
                ))}
            </div>
        </section>
    );
};

export default IconBoxSection;