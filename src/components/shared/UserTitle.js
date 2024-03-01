import { toBengaliNumber } from 'bengali-number';
import React from 'react';

const UserTitle = ({ index, block, union }) => {

    return (
        <div className="flex-none bg flex items-center justify-center  text-white font-semibold  my-4">
            <div className="rounded-lg bg-black text-xl px-6 py-1.5 flex text-center ">{toBengaliNumber(index + 1)}.  ব্লকঃ {block}, ইউনিয়নঃ {union}
            </div>
            <div className=" flex-1 bg-primary h-1 bg-pri">
            </div>
        </div>
    );
};

export default UserTitle;