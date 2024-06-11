import React from 'react';

const WhyThisSoftwareIcon = ({ Icon, heading, text }) => {
    return (
        <div className="flex gap-3 items-center">
            <Icon color='green' size={50} />
            <div>
                <h3 className="text-xl font-bold">
                    {heading}
                </h3>
                <p className="mt-1 whitespace-pre-wrap">
                    {text}
                </p>
            </div>
        </div>
    );
};

export default WhyThisSoftwareIcon;
