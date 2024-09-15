import React, { useContext } from "react";
import DashboardMenuItem from "../../shared/DashboardMenuItem";
import { RxDashboard } from "react-icons/rx";
import { GoProject } from "react-icons/go";
import { PiUsersFourLight, PiMicrophoneStageFill } from "react-icons/pi";
import { GiDiscussion } from "react-icons/gi";
import { CgDisplayGrid } from "react-icons/cg";
import { FaPeopleGroup } from "react-icons/fa6";
import { AuthContext } from "../../AuthContext/AuthProvider";
import { MdAgriculture, MdCreditScore } from "react-icons/md";
import { RiSchoolLine } from "react-icons/ri";
import { FcDocument } from "react-icons/fc";
import { useSelector } from "react-redux";
import { toBengaliNumber } from "bengali-number";
import { GrAnnounce } from "react-icons/gr";

const DashboardMenu = () => {
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
    { icon: <MdCreditScore />, link: "/user-demos-final", text: `চূড়ান্ত প্রদর্শনী (${toBengaliNumber(demos.filter((single) => single?.completed).length)})` },
    { icon: <PiMicrophoneStageFill />, link: "/user-fielddays", text: `মাঠ দিবস (${toBengaliNumber(fieldDays.length)})` },
    { icon: <RiSchoolLine />, link: "/user-schools", text: `স্কুল (${toBengaliNumber(schools.length)})` },
    { icon: <FaPeopleGroup />, link: "/user-dae-meetings", text: `ডিএই কৃষক গ্রুপ সভা (${toBengaliNumber(daeMeetings.length)})` },
    { icon: <GrAnnounce />, link: "/user-notices", text: `নোটিশ (${toBengaliNumber(userNotices?.length)})` },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4 bg-white shadow-md dark:bg-gray-800 rounded-lg transition-all duration-300">
      {/* Dashboard Link */}
      <DashboardMenuItem icon={<RxDashboard />} link="" text="ড্যাশবোর্ড" />

      {/* Admin Menu Items */}
      {user && role === "admin" &&
        adminMenuItems.map((item, index) => (
          <DashboardMenuItem key={index} icon={item.icon} link={item.link} text={item.text} />
        ))}

      {/* User Menu Items */}
      {user && role === "user" &&
        userMenuItems.map((item, index) => (
          <DashboardMenuItem key={index} icon={item.icon} link={item.link} text={item.text} />
        ))}

      {/* Notes Link */}
      <DashboardMenuItem icon={<FcDocument />} link="/user-notes" text={`নোটস (${toBengaliNumber(notes.length)})`} />
    </div>
  );
};

export default DashboardMenu;
