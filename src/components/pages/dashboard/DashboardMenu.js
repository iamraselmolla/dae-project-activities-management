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



const DashboardMenu = () => {
  const { user, role } = useContext(AuthContext);
  return (
    <div className="md:flex md:flex-wrap justify-center flex flex-wrap gap-3 md:gap-2">
      <DashboardMenuItem icon={<RxDashboard />} link="" text={"ড্যাশবোর্ড"} />
      {user && role === "admin" && (
        <DashboardMenuItem
          icon={<GoProject />}
          link="/all-projects"
          text={"সকল প্রকল্প"}
        />
      )}
      {user && role === "admin" && (
        <DashboardMenuItem
          icon={<PiUsersFourLight />}
          link="/all-users"
          text={"সকল ইউজার"}
        />
      )}
      {user && role === "admin" && (
        <DashboardMenuItem
          icon={<GiDiscussion />}
          link="/trainings"
          text={"প্রশিক্ষণ"}
        />
      )}
      {user && role === "admin" && (
        <DashboardMenuItem
          icon={<GiDiscussion />}
          link="/motivational-tours"
          text={"উদ্বুদ্ধকরণ ভ্রমণ"}
        />
      )}
      {user && role === "admin" && (
        <DashboardMenuItem
          icon={<MdAgriculture />}
          link="/all-distributions"
          text={"উপকরণ বিতরণ"}
        />
      )}
      {user && role === "user" && (
        <DashboardMenuItem
          icon={<CgDisplayGrid />}
          link="/user-demos-primary"
          text={"প্রাথমিক প্রদর্শনী"}
        />
      )}
      {user && role === "user" && (
        <DashboardMenuItem
          icon={<MdCreditScore />}
          link="/user-demos-final"
          text={"চূড়ান্ত প্রদর্শনী"}
        />
      )}
      {user && role === "user" && (
        <DashboardMenuItem
          icon={<PiMicrophoneStageFill />}
          link="/user-fielddays"
          text={"মাঠ দিবস"}
        />
      )}
      {user && role === "user" && (
        <DashboardMenuItem
          icon={<RiSchoolLine />}
          link="/user-schools"
          text={"স্কুল"}
        />
      )}

      {user && role === "user" && (
        <DashboardMenuItem
          icon={<FaPeopleGroup />}
          link="/user-dae-meetings"
          text={"ডিএই কৃষক গ্রুপ সভা"}
        />
      )}
      <DashboardMenuItem
        icon={<FcDocument />}
        link="/user-notes"
        text={"নোটস"}
      />
    </div>
  );
};

export default DashboardMenu;
