import React from 'react';
import MenuItem from '../../shared/MenuItem';
import { RxDashboard } from "react-icons/rx";
import { GoProject } from "react-icons/go";
import { PiUsersFourLight, PiMicrophoneStageFill } from "react-icons/pi";
import { FaRegPlusSquare } from "react-icons/fa";
import { GiDiscussion } from "react-icons/gi";
import { GrDocumentNotes } from "react-icons/gr";
import { CgDisplayGrid } from "react-icons/cg";










const DashboardMenu = () => {
    return (
        <>
            <MenuItem icon={<RxDashboard />} link="" text={'ড্যাশবোর্ড'} />
            <MenuItem icon={<GoProject />} link="/all-projects" text={'সকল প্রকল্প'} />
            <MenuItem icon={<PiUsersFourLight />} link="/all-users" text={'সকল ইউজার'} />
            <MenuItem icon={<FaRegPlusSquare />} link="/addproject" text={'নতুন প্রকল্প যুক্ত করুন'} />
            <MenuItem icon={<CgDisplayGrid />} link="/user-demos" text={'প্রদর্শনী'} />
            <MenuItem icon={<GiDiscussion />} link="/trainings" text={'প্রশিক্ষণ'} />
            <MenuItem icon={<PiMicrophoneStageFill />} link="/user-fielddays" text={'মাঠ দিবস'} />
            <MenuItem link="/user-dae-meetings" text={'ডিএই কৃষক গ্রুপ সভা'} />
            <MenuItem link="/add-note" text={'নোট যুক্ত করুন'} />
            <MenuItem icon={<GrDocumentNotes />} link="/user-notes" text={'নোটস'} />
        </>
    );
};

export default DashboardMenu;