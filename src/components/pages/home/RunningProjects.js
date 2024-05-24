import React from 'react';
import { useSelector } from 'react-redux';

const RunningProjects = () => {
    const { projects } = useSelector(state => state.dae)
    return (
        <section className='py-24'>
            <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-24'>

                <div className=" text-center">
                    <figure className="m-0 p-0"><img className="w-auto" src="https://sandbox-tailwindcss.ibthemespro.com/assets/img/illustrations/3d8.png" srcSet="https://sandbox-tailwindcss.ibthemespro.com/assets/img/illustrations/3d8.png" alt="image" /></figure>
                </div>
                <div className="">
                    <h2 className="text-sm uppercase text-[#605dba] mb-3 leading-[1.35] tracking-[0.02rem]">কেন এই সফটওয়্যার?</h2>
                    <h3 className="xl:text-[1.9rem] text-[calc(1.315rem_+_0.78vw)] leading-[1.25] font-semibold mb-8">নিম্নোক্ত কিছু কারণে এই সফটওয়্যার আপনার দৈনন্দিন দায়িত্ব পালনে সহায়ক হবে।</h3>
                    <div className="flex flex-wrap">
                        <div className='flex'>

                        </div>
                    </div>
                </div>


            </div>
        </section>
    );
};

export default RunningProjects;