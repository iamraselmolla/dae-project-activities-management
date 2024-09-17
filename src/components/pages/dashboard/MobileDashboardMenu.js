import React, { useContext } from "react";
import { AuthContext } from "../../AuthContext/AuthProvider";
import { useSelector } from "react-redux";
import { toBengaliNumber } from "bengali-number";
import { RxDashboard } from "react-icons/rx";
import { GoProject } from "react-icons/go";
import { PiUsersFourLight, PiMicrophoneStageFill } from "react-icons/pi";
import { GiDiscussion } from "react-icons/gi";
import { CgDisplayGrid } from "react-icons/cg";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdAgriculture, MdCreditScore } from "react-icons/md";
import { RiSchoolLine } from "react-icons/ri";
import { FcDocument } from "react-icons/fc";
import { GrAnnounce } from "react-icons/gr";

const MobileDashboardMenu = () => {
    const { user, role } = useContext(AuthContext);
    const {
        projects,
        users,
        trainings,
        notes,
        tours,
        distributions,
        demos,
        fieldDays,
        schools,
        daeMeetings,
        allNotices,
        userNotices,
    } = useSelector((state) => state.dae);

    const adminMenuItems = [
        { icon: <GoProject />, link: "/all-projects", text: `সকল প্রকল্প (${toBengaliNumber(projects.length)})` },
        { icon: <PiUsersFourLight />, link: "/all-users", text: `সকল ইউজার (${toBengaliNumber(users.length)})` },
        { icon: <GiDiscussion />, link: "/trainings", text: `প্রশিক্ষণ (${toBengaliNumber(trainings.length)})` },
        { icon: <GiDiscussion />, link: "/motivational-tours", text: `উদ্বুদ্ধকরণ ভ্রমণ (${toBengaliNumber(tours.length)})` },
        { icon: <MdAgriculture />, link: "/all-distributions", text: `উপকরণ বিতরণ (${toBengaliNumber(distributions.length)})` },
        { icon: <GrAnnounce />, link: "/notices", text: `নোটিশ (${toBengaliNumber(allNotices.length)})` },
    ];

    const userMenuItems = [
        { icon: <CgDisplayGrid />, link: "/user-demos-primary", text: `প্রাথমিক প্রদর্শনী (${toBengaliNumber(demos.filter((single) => !single?.completed).length)})` },
        { icon: <MdCreditScore />, link: "/user-demos-final", text: `চূড়ান্ত প্রদর্শনী (${toBengaliNumber(demos.filter((single) => single?.completed).length)})` },
        { icon: <PiMicrophoneStageFill />, link: "/user-fielddays", text: `মাঠ দিবস (${toBengaliNumber(fieldDays.length)})` },
        { icon: <RiSchoolLine />, link: "/user-schools", text: `স্কুল (${toBengaliNumber(schools.length)})` },
        { icon: <FaPeopleGroup />, link: "/user-dae-meetings", text: `কৃষক গ্রুপ সভা (${toBengaliNumber(daeMeetings.length)})` },
        { icon: <GrAnnounce />, link: "/user-notices", text: `নোটিশ (${toBengaliNumber(userNotices?.length)})` },
    ];

    const MenuItem = ({ icon, link, text }) => (
        <li>
            <a href={link} className="flex items-center p-2 hover:bg-base-200 rounded-lg">
                <span className="mr-2">{icon}</span>
                <span>{text}</span>
            </a>
        </li>
    );

    return (
        <div className="bg-base-100 shadow-md rounded-lg transition-all duration-300">
            <div className="collapse collapse-arrow">
                <input type="checkbox" className="peer" />
                <div className="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
                    ড্যাশবোর্ড মেনু
                </div>
                <div className="collapse-content bg-primary-content peer-checked:bg-secondary-content">
                    <ul className="menu menu-compact">
                        <MenuItem icon={<RxDashboard />} link="" text="ড্যাশবোর্ড" />
                        {user && role === "admin" && adminMenuItems.map((item, index) => (
                            <MenuItem key={index} icon={item.icon} link={item.link} text={item.text} />
                        ))}
                        {user && role === "user" && userMenuItems.map((item, index) => (
                            <MenuItem key={index} icon={item.icon} link={item.link} text={item.text} />
                        ))}
                        <MenuItem icon={<FcDocument />} link="/user-notes" text={`নোটস (${toBengaliNumber(notes.length)})`} />
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MobileDashboardMenu;