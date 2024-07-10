import React, { useContext, useEffect, useState } from "react";
import SectionTitle from "../../shared/SectionTitle";
import SingleDaeGroupMeetings from "./SingleDaeGroupMeetings";
import { fetchAllGroups } from "../../../services/userServices";
import AddModuleButton from "../../shared/AddModuleButton";
import { makeSureOnline } from "../../shared/MessageConst";
import { AuthContext } from "../../AuthContext/AuthProvider";
import NoContentFound from "../../shared/NoContentFound";
import toast from "react-hot-toast";
import Loader from "../../shared/Loader";

const DaeGroupMeeting = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [allGroups, setAllGroups] = useState([]);
  const [fetchEnd, setFetchEnd] = useState(false);
  const fetchGroups = async () => {
    setLoading(true);
    try {
      setLoading(true);
      const result = await fetchAllGroups();
      if (result?.status === 200) {
        setAllGroups(result?.data?.data);
        setFetchEnd(true);
      } else {
        toast.error("তথ্য ডাটাবেইজ থেকে আনতে অসুবিধা হয়েছে।");
        setFetchEnd(true);
      }
    } catch (err) {

      setFetchEnd(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (navigator.onLine) {
      fetchGroups();
    } else {
      makeSureOnline();
    }
  }, [user]);
  return (
    <section className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <AddModuleButton
        btnText={"কৃষক গ্রুপ সভা যুক্ত করুন"}
        link={"add-dae-group-meeting"}
      />
      <SectionTitle title={"সকল কৃষক গ্রুপ সভা"} />
      <div className="container px-4 md:px-0 grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-6">
        {!loading &&

          allGroups?.length > 0 &&
          allGroups?.map((group) => (
            <SingleDaeGroupMeetings key={group?._id} data={group} />
          ))}
      </div>
      {!loading && allGroups?.length < 1 && fetchEnd && (
        <NoContentFound text={'কোনো গ্রুপের তথ্য পাওয়া যায়নি'} />
      )}
      {loading && (
        <Loader />
      )}

    </section>
  );
};

export default DaeGroupMeeting;
