import React from 'react';
import DashboardMenuItem from '../../shared/DashboardMenuItem';
import { RxDashboard } from "react-icons/rx";
import { GoProject } from "react-icons/go";
import { PiUsersFourLight, PiMicrophoneStageFill } from "react-icons/pi";
import { FaRegPlusSquare } from "react-icons/fa";
import { GiDiscussion } from "react-icons/gi";
import { GrDocumentNotes } from "react-icons/gr";
import { CgDisplayGrid } from "react-icons/cg";
import { FaPeopleGroup } from "react-icons/fa6";

const DashboardMenu = () => {
    return (
        <>
            <DashboardMenuItem icon={<RxDashboard />} link="" text={'ড্যাশবোর্ড'} />
            <DashboardMenuItem icon={<GoProject />} link="/all-projects" text={'সকল প্রকল্প'} />
            <DashboardMenuItem icon={<PiUsersFourLight />} link="/all-users" text={'সকল ইউজার'} />
            <DashboardMenuItem icon={<FaRegPlusSquare />} link="/addproject" text={'নতুন প্রকল্প যুক্ত করুন'} />
            <DashboardMenuItem icon={<CgDisplayGrid />} link="/user-demos" text={'প্রদর্শনী'} />
            <DashboardMenuItem icon={<GiDiscussion />} link="/trainings" text={'প্রশিক্ষণ'} />
            <DashboardMenuItem icon={<PiMicrophoneStageFill />} link="/user-fielddays" text={'মাঠ দিবস'} />
            <DashboardMenuItem icon={<FaPeopleGroup />} link="/user-dae-meetings" text={'ডিএই কৃষক গ্রুপ সভা'} />
            <DashboardMenuItem icon={<GrDocumentNotes />} link="/user-notes" text={'নোটস'} />
        </>
    );
};

export default DashboardMenu;