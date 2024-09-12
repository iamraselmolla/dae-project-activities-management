import React from 'react';
const SectionTitle = ({ title }) => {
    return (
        <div className="flex justify-center mb-8">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold theme-color bg-gradient-to-r from-[#38a169] via-[#16a34a] to-[#38a169] text-transparent bg-clip-text py-3 px-6 rounded-lg shadow-lg border theme-border border-2">
                {title}
            </h1>
        </div>
    );
};

export default SectionTitle;
