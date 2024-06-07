import React from 'react';

const SectionTitle = ({ title }) => {
    return (
        <div className="flex justify-center">
            <h1 className="text-4xl py-3 px-8  border-4  border-black inline-block mx-auto  mb-8 font-extrabold">
                {title}
            </h1>
        </div>
    );
};

export default SectionTitle;