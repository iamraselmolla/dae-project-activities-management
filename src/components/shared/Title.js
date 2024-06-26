import React from 'react';

const Title = ({ title, end }) => {
    return (
        <div className="flex-none bg flex items-center justify-center  text-white font-semibold">
            <div className={`rounded-lg ${end ? 'bg-green-400' : 'bg-black'} text-xl px-6 py-1.5 flex text-center `}>{title}
            </div>
            <div className=" flex-1 bg-primary h-1 bg-pri">
            </div>
        </div>
    );
};

export default Title;