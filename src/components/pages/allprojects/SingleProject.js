import React from 'react';
import { GiGrainBundle } from "react-icons/gi";
import { toBengaliNumber } from 'bengali-number';

const SingleProject = ({ single }) => {
    return (
        <div className='px-3 py-5 rounded-xl bg-white'>
            <h2 className="text-md font-bold">
                {single?.name?.details} ({single?.name?.short})
            </h2>
            <div className="mt-4">
                <h3 className="flex gap-3">
                    <div className='flex gap-1 items-center'>
                        <GiGrainBundle /> প্রযুক্তিঃ
                    </div>
                    <div>
                        {toBengaliNumber(single?.crops?.length)}
                    </div>
                </h3>
            </div>
        </div>
    );
};

export default SingleProject;