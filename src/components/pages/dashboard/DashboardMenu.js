import React, { useContext } from 'react';
import DashboardMenuItem from '../../shared/DashboardMenuItem';
import { RxDashboard } from "react-icons/rx";
import { GoProject } from "react-icons/go";
import { PiUsersFourLight, PiMicrophoneStageFill } from "react-icons/pi";
import { FaRegPlusSquare } from "react-icons/fa";
import { GiDiscussion } from "react-icons/gi";
import { GrDocumentNotes } from "react-icons/gr";
import { CgDisplayGrid } from "react-icons/cg";
import { FaPeopleGroup } from "react-icons/fa6";
import { AuthContext } from '../../AuthContext/AuthProvider';

const DashboardMenu = () => {
    const { user, role } = useContext(AuthContext)
    return (
        <>
            <DashboardMenuItem icon={<RxDashboard />} link="" text={'ড্যাশবোর্ড'} />
            {user && role === 'admin' && <DashboardMenuItem icon={<GoProject />} link="/all-projects" text={'সকল প্রকল্প'} />}
            {user && role === 'admin' && <DashboardMenuItem icon={<PiUsersFourLight />} link="/all-users" text={'সকল ইউজার'} />}
            {user && role === 'user' && <DashboardMenuItem icon={<CgDisplayGrid />} link="/user-demos" text={'প্রদর্শনী'} />}
            {user && role === 'admin' && <DashboardMenuItem icon={<GiDiscussion />} link="/trainings" text={'প্রশিক্ষণ'} />}
            {user && role === 'user' && <DashboardMenuItem icon={<PiMicrophoneStageFill />} link="/user-fielddays" text={'মাঠ দিবস'} />}
            {user && role === 'user' && <DashboardMenuItem icon={<FaPeopleGroup />} link="/user-dae-meetings" text={'ডিএই কৃষক গ্রুপ সভা'} />}
            <DashboardMenuItem icon={<GrDocumentNotes />} link="/user-notes" text={'নোটস'} />
        </>
    );
};

export default DashboardMenu;