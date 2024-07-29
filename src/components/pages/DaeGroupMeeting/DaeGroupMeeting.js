import React, { useContext, useEffect, useState, useCallback } from "react";
import SectionTitle from "../../shared/SectionTitle";
import SingleDaeGroupMeetings from "./SingleDaeGroupMeetings";
import { fetchAllGroups } from "../../../services/userServices";
import AddModuleButton from "../../shared/AddModuleButton";
import { makeSureOnline } from "../../shared/MessageConst";
import { AuthContext } from "../../AuthContext/AuthProvider";
import NoContentFound from "../../shared/NoContentFound";
import toast from "react-hot-toast";
import Loader from "../../shared/Loader";
import { useSelector } from "react-redux";

const DaeGroupMeeting = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [allGroups, setAllGroups] = useState([]);
  const [fetchEnd, setFetchEnd] = useState(false);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [search, setSearch] = useState("");
  const [unionName, setUnionName] = useState("");
  const [blockName, setBlockName] = useState("");
  const [season, setSeason] = useState("");
  const [fiscalYear, setFiscalYear] = useState("");
  const { blockAndUnions } = useSelector((state) => state.dae);
  const [allUnion, setAllUnion] = useState([]);
  const [blocksOfUnion, setBlocksOfUnion] = useState([]);

  const fetchGroups = async () => {
    setLoading(true);
    try {
      const result = await fetchAllGroups();
      if (result?.status === 200) {
        setAllGroups(result?.data?.data);
        setFetchEnd(true);
      } else {
        toast.error("তথ্য ডাটাবেইজ থেকে আনতে অসুবিধা হয়েছে।");
        setFetchEnd(true);
      }
    } catch (err) {
      toast.error("ডাটা লোড করতে সমস্যা হয়েছে।");
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

  useEffect(() => {
    const checkUnion = [];
    blockAndUnions?.map((single) =>
      checkUnion.includes(single?.unionB) ? "" : checkUnion.push(single?.unionB)
    );
    setAllUnion(checkUnion);
  }, [blockAndUnions]);

  const handleUnionAndBlockSelection = (e) => {
    const selectedUnion = e.target.value;
    setUnionName(selectedUnion);

    const result = blockAndUnions?.filter(
      (single) => single?.unionB === selectedUnion
    );
    const blocks = result?.map((single) => single?.blockB);

    setBlocksOfUnion(blocks);
  };

  const filterGroups = useCallback(() => {
    let filtered = allGroups;

    if (unionName !== "") {
      filtered = filtered.filter((group) => group.address.union.includes(unionName));
    }

    if (blockName !== "") {
      filtered = filtered.filter((group) => group.address.block.includes(blockName));
    }

    if (season !== "") {
      filtered = filtered.filter((group) => group.time.season.includes(season));
    }

    if (fiscalYear !== "") {
      filtered = filtered.filter((group) => group.time.fiscalYear.includes(fiscalYear));
    }

    if (search !== "") {
      filtered = filtered.filter((group) => {
        return (
          group.groupInfo.name.includes(search) ||
          group.groupInfo.place.includes(search) ||
          group.groupInfo.mobile.includes(search)
        );
      });
    }

    setFilteredGroups(filtered);
  }, [allGroups, unionName, blockName, season, fiscalYear, search]);

  useEffect(() => {
    filterGroups();
  }, [unionName, blockName, season, fiscalYear, search, filterGroups]);

  return (
    <section className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <AddModuleButton
        btnText={"কৃষক গ্রুপ সভা যুক্ত করুন"}
        link={"add-dae-group-meeting"}
      />
      <SectionTitle title={"সকল কৃষক গ্রুপ সভা"} />
      <div className="grid grid-cols-1 gap-6 py-6">
        <div className="flex flex-wrap md:flex-nowrap gap-3 w-full">
          <div className="w-full md:w-1/4">
            <label className="font-extrabold mb-1 block">ইউনিয়ন</label>
            <select
              className="input input-bordered w-full"
              value={unionName}
              onChange={handleUnionAndBlockSelection}
            >
              <option value="" label="ইউনিয়ন" />
              {allUnion?.map((single) => (
                <option key={single} value={single}>{single}</option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-1/4">
            <label className="font-extrabold mb-1 block">ব্লক</label>
            <select
              className="input input-bordered w-full"
              value={blockName}
              onChange={(e) => setBlockName(e.target.value)}
            >
              <option value="" label="সিলেক্ট করুন" />
              {blocksOfUnion?.map((single, index) => (
                <option key={index} value={single}>
                  {single}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-1/4">
            <label className="font-extrabold mb-1 block">মৌসুম</label>
            <select
              className="input input-bordered w-full"
              value={season}
              onChange={(e) => setSeason(e.target.value)}
            >
              <option value="" label="সিলেক্ট করুন" />
              <option value="rabi" label="রবি" />
              <option value="kharif" label="খরিফ" />
            </select>
          </div>
          <div className="w-full md:w-1/4">
            <label className="font-extrabold mb-1 block">অর্থবছর</label>
            <select
              className="input input-bordered w-full"
              value={fiscalYear}
              onChange={(e) => setFiscalYear(e.target.value)}
            >
              <option value="" label="সিলেক্ট করুন" />
              <option value="2021-22" label="২০২১-২২" />
              <option value="2022-23" label="২০২২-২৩" />
              <option value="2023-24" label="২০২৩-২৪" />
            </select>
          </div>
        </div>
      </div>
      <div className="w-full mb-12">
        <input
          type="text"
          className="input input-bordered w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="খুজুন (নাম, স্থান, মোবাইল)"
        />
      </div>
      <div className="container px-4 md:px-0 grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-6">
        {!loading &&
          filteredGroups?.length > 0 &&
          filteredGroups?.map((group) => (
            <SingleDaeGroupMeetings key={group?._id} data={group} />
          ))}
      </div>
      {!loading && filteredGroups?.length < 1 && fetchEnd && (
        <NoContentFound text={"কোনো গ্রুপের তথ্য পাওয়া যায়নি"} />
      )}
      {loading && <Loader />}
    </section>
  );
};

export default DaeGroupMeeting;
