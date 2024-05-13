import React, { useContext } from "react";
import { AuthContext } from "../AuthContext/AuthProvider";
import SectionTitle from "./SectionTitle";
import SingleProfile from "./SingleProfile";

function Profile() {
  const { user } = useContext(AuthContext);
  return (
    <div className="p-5 mt-8">
      <SectionTitle title={`${user?.blockB} ইউজার এর তথ্য`} />
      <div className="mt-5">
        <SingleProfile index={0} key={user?._id} user={user} />
      </div>
    </div>
  );
}

export default Profile;
