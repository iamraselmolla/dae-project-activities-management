import React from 'react';
import { GiGrainBundle } from "react-icons/gi";
import { toBengaliNumber } from 'bengali-number';
import { IoTimer } from "react-icons/io5";
import { BsPersonWorkspace } from "react-icons/bs";
import { LiaCheckSquareSolid } from "react-icons/lia";





const SingleProject = ({ single }) => {
    return (
        <div className='px-3 relative py-5 pt-16 rounded-xl bg-white'>
            <div className='absolute top-2 w-16 h-16 rounded-full  text-white justify-center items-center flex'>
                {!single?.end ? <BsPersonWorkspace size={25} /> : <LiaCheckSquareSolid size={25} />}
            </div>
            <h2 className="text-md font-bold">
                {single?.name?.details} ({single?.name?.short})
            </h2>
            <div className="mt-4 flex justify-between">
                <div className="flex gap-3">
                    <div className='flex gap-1 items-center'>
                        <GiGrainBundle />
                    </div>
                    <div>
                        {toBengaliNumber(single?.crops?.length)}
                    </div>
                </div>
                <div className='flex '>
                    <div className="flex gap-1 items-center">
                        <IoTimer />
                    </div>
                    <div>
                        {new Date(single?.time?.start).toLocaleDateString('bn-BD')} - {new Date(single?.time?.end).toLocaleDateString('bn-BD')}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleProject;