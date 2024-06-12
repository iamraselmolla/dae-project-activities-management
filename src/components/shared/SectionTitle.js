import React from 'react';

const SectionTitle = ({ title }) => {
    return (
        <div className="flex justify-center">
            <h1 className="lg:text-4xl md:text-3xl text-2xl py-3 px-8  border-4  border-black inline-block mx-auto  mb-8 font-extrabold">
                {title}
            </h1>
        </div>
    );
};

export default SectionTitle;