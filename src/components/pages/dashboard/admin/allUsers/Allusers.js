import React from "react";
import SectionTitle from "../../../../shared/SectionTitle";
import SingleUser from "./SingleUser";
import { useSelector } from "react-redux";

const Allusers = () => {
  const { users: allUser } = useSelector((state) => state.dae);

  return (
    <div className="px-5 py-5">
      <SectionTitle title="সকল ইউজার তথ্য" />
      {allUser?.length > 0 &&
        allUser.map((singleUser, index) => (
          <div key={singleUser?._id}>
            <SingleUser index={index} key={singleUser?._id} user={singleUser} />
          </div>
        ))}
    </div>
  );
};

export default Allusers;
