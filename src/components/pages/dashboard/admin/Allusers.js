import React, { useContext, useEffect, useState } from "react";
import { getAllUser } from "../../../../services/userServices";
import SectionTitle from "../../../shared/SectionTitle";
import SingleUser from "./SingleUser";
import Loader from "../../../shared/Loader";
import { AuthContext } from "../../../AuthContext/AuthProvider";
import axios from "axios";

const Allusers = () => {
  const [allUser, setAllUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reload, setReload] = useState(false);
  const { jwtToken } = useContext(AuthContext);

  const fetchAllUsers = async () => {
    setLoading(true);
    try {
      const result = await getAllUser()
      if (result?.status === 200) {
        setAllUser(result?.data?.data);
      } else {
        setError("Failed to fetch users");
      }
    } catch (err) {
      setError("An error occurred while fetching users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, [reload]);

  return (
    <div className="px-5 py-5">
      <SectionTitle title="সকল ইউজার তথ্য" />
      {error && <div className="text-red-500">{error}</div>}
      {!loading &&
        allUser?.length > 0 &&
        allUser.map((singleUser, index) => (
          <div key={singleUser?._id}>
            <SingleUser
              setReload={setReload}
              reload={reload}
              index={index}
              key={index}
              user={singleUser}
            />
          </div>
        ))}
      {loading && <Loader />}
    </div>
  );
};

export default Allusers;
