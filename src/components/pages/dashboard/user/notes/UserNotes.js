import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { deleteAnote } from "../../../../../services/userServices";
import { AiOutlineFileDone, AiOutlineSearch } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import { BsFillPersonFill, BsFillPhoneFill, BsFillInfoCircleFill } from "react-icons/bs";
import { toBengaliNumber } from "bengali-number";
import { makeSureOnline } from "../../../../shared/MessageConst";
import SectionTitle from "../../../../shared/SectionTitle";
import AddModuleButton from "../../../../shared/AddModuleButton";
import NoContentFound from "../../../../shared/NoContentFound";
import CompleteNoteModal from "./CompleteNoteModal";
import { useDispatch, useSelector } from "react-redux";
import { daeAction } from "../../../../store/projectSlice";
import { createRandomNumber } from "../../../../utilis/createRandomNumber";

const UserNotes = () => {
  const { notes: allNotes } = useSelector((state) => state.dae);
  const [modalData, setModalData] = useState(null);
  const [completedNotes, setCompletedNotes] = useState([]);
  const [incompletedNotes, setIncompletedNotes] = useState([]);
  const [filteredIncompletedNotes, setFilteredIncompletedNotes] = useState([]);
  const [selectedPurpose, setSelectedPurpose] = useState("");
  const dispatch = useDispatch();

  // Find User All Notes
  useEffect(() => {
    setCompletedNotes(allNotes?.filter((single) => single.completed));
    setIncompletedNotes(allNotes?.filter((single) => !single.completed));
  }, [allNotes]);

  // Filter notes based on selected purpose
  useEffect(() => {
    if (selectedPurpose === "") {
      setFilteredIncompletedNotes(incompletedNotes);
    } else {
      setFilteredIncompletedNotes(
        incompletedNotes.filter((note) => note.purpose.target === selectedPurpose)
      );
    }
  }, [selectedPurpose, incompletedNotes]);

  // Delete a Note of User
  const handleNoteDeletion = async (userNotetobeDeleted) => {
    if (navigator.onLine) {
      if (userNotetobeDeleted) {
        if (
          window.confirm(
            `আপনি কি ${userNotetobeDeleted?.address?.village} গ্রামের ${userNotetobeDeleted?.farmersInfo?.name} কৃষকের জন্য ${userNotetobeDeleted?.purpose?.target} বিষয়ক নোটটি মুছে ফেলতে চান?`
          )
        ) {
          if (userNotetobeDeleted?._id) {
            try {
              const result = await deleteAnote(userNotetobeDeleted?._id);
              if (result?.status === 200) {
                toast.success(result?.data?.message);
                dispatch(daeAction.setRefetch(`notes${createRandomNumber()}`));
              }
            } catch (err) {
              toast.error("নোটটি মুছতে সাময়িক অসুবিধার সৃষ্টি হচ্ছে।");
            }
          }
        }
      }
    } else {
      makeSureOnline();
    }
  };

  // Handle click to display modal
  const handleNoteModal = (noteData) => {
    document.getElementById("my_modal_3")?.showModal();
    setModalData(noteData);
  };

  // Handle purpose selection
  const handlePurposeSelection = (event) => {
    setSelectedPurpose(event.target.value);
  };

  return (
    <div className="flex flex-col p-4">
      <div className="space-y-6">
        <AddModuleButton link={"dashboard/add-note"} btnText={"নোট যুক্ত করুন"} />

        {/* Search and Filter */}
        <div className="flex justify-between items-center mb-4">
          <SectionTitle title={`অসম্পন্ন নোট (${toBengaliNumber(incompletedNotes?.length)})`} />
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="নোট খুঁজুন..."
              className="input input-bordered w-full max-w-xs"
            />
            <select className="input input-bordered" onChange={handlePurposeSelection}>
              <option value="" label="উদ্দেশ্য নির্বাচন করুন" />
              <option value="প্রদর্শনী দেওয়া">প্রদর্শনী দেওয়া</option>
              <option value="প্রশিক্ষণে নাম দেয়া">প্রশিক্ষণে নাম দেয়া</option>
              <option value="মাঠ দিবসে উপস্থিত থাকতে বলা">মাঠ দিবসে উপস্থিত থাকতে বলা</option>
              <option value="উদ্বুদ্ধকরণভ্রমণে নেওয়া">উদ্বুদ্ধকরণভ্রমণে নেওয়া</option>
              <option value="কৃষি পরামর্শ প্রদান">কৃষি পরামর্শ প্রদান</option>
              <option value="উপকরণ বিতরণ">উপকরণ বিতরণ</option>
            </select>
          </div>
        </div>

        {/* Incomplete Notes Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredIncompletedNotes?.length > 0 ? (
            filteredIncompletedNotes?.map((singleNote, index) => (
              <div
                key={singleNote?._id}
                className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col gap-3"
              >
                <div className="flex justify-between items-center">
                  <div className="font-bold text-lg">
                    {toBengaliNumber(index + 1)}. {singleNote?.purpose?.target}
                  </div>
                  <div className="flex gap-2">
                    <AiOutlineFileDone
                      onClick={() => handleNoteModal(singleNote)}
                      size={25}
                      className="text-green-500 cursor-pointer"
                    />
                    <MdOutlineDelete
                      onClick={() => handleNoteDeletion(singleNote)}
                      size={25}
                      className="text-red-500 cursor-pointer"
                    />
                  </div>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center gap-2">
                    <BsFillPersonFill size={16} className="text-blue-500" />
                    <span className="font-semibold">নাম: </span>{singleNote?.farmersInfo?.name || "N/A"}
                  </div>
                  <div className="flex items-center gap-2">
                    <BsFillPersonFill size={16} className="text-purple-500" />
                    <span className="font-semibold">পিতার নাম: </span>{singleNote?.farmersInfo?.fatherName || "N/A"}
                  </div>
                  <div className="flex items-center gap-2">
                    <BsFillInfoCircleFill size={16} className="text-green-500" />
                    <span className="font-semibold">NID: </span>{singleNote?.farmersInfo?.nid || "N/A"}
                  </div>
                  <div className="flex items-center gap-2">
                    <BsFillPhoneFill size={16} className="text-red-500" />
                    <span className="font-semibold">মোবাইল: </span>{singleNote?.farmersInfo?.mobile || "N/A"}
                  </div>
                  <div className="flex items-center gap-2">
                    <BsFillInfoCircleFill size={16} className="text-teal-500" />
                    <span className="font-semibold">ঠিকানা: </span>{singleNote?.address?.village || "N/A"}
                  </div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {toBengaliNumber(
                    new Date(singleNote?.purpose?.date).toLocaleDateString("bn-BD", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  )}
                </div>
              </div>
            ))
          ) : (
            <NoContentFound text={" কোনো অসম্পন্ন নোট খুজে পাওয়া যায়নি!"} />
          )}
        </div>

        {/* Completed Notes Section */}
        <SectionTitle title={`সম্পন্ন নোট (${toBengaliNumber(completedNotes?.length)})`} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {completedNotes?.length > 0 ? (
            completedNotes?.map((singleNote, index) => (
              <div
                key={singleNote?._id}
                className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col gap-3"
              >
                <div className="flex justify-between items-center">
                  <div className="font-bold text-lg">
                    {toBengaliNumber(index + 1)}. {singleNote?.purpose?.target}
                  </div>
                  <div className="flex gap-2">
                    <AiOutlineFileDone size={25} className="text-green-500 cursor-pointer" />
                    <MdOutlineDelete
                      onClick={() => handleNoteDeletion(singleNote)}
                      size={25}
                      className="text-red-500 cursor-pointer"
                    />
                  </div>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center gap-2">
                    <BsFillPersonFill size={16} className="text-blue-500" />
                    <span className="font-semibold">নাম: </span>{singleNote?.farmersInfo?.name || "N/A"}
                  </div>
                  <div className="flex items-center gap-2">
                    <BsFillPersonFill size={16} className="text-purple-500" />
                    <span className="font-semibold">পিতার নাম: </span>{singleNote?.farmersInfo?.fatherName || "N/A"}
                  </div>
                  <div className="flex items-center gap-2">
                    <BsFillInfoCircleFill size={16} className="text-green-500" />
                    <span className="font-semibold">NID: </span>{singleNote?.farmersInfo?.nid || "N/A"}
                  </div>
                  <div className="flex items-center gap-2">
                    <BsFillPhoneFill size={16} className="text-red-500" />
                    <span className="font-semibold">মোবাইল: </span>{singleNote?.farmersInfo?.mobile || "N/A"}
                  </div>
                  <div className="flex items-center gap-2">
                    <BsFillInfoCircleFill size={16} className="text-teal-500" />
                    <span className="font-semibold">ঠিকানা: </span>{singleNote?.address?.village || "N/A"}
                  </div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {toBengaliNumber(
                    new Date(singleNote?.purpose?.date).toLocaleDateString("bn-BD", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  )}
                </div>
              </div>
            ))
          ) : (
            <NoContentFound text={" কোনো সম্পন্ন নোট খুজে পাওয়া যায়নি!"} />
          )}
        </div>
      </div>

      {modalData && <CompleteNoteModal modalData={modalData} />}
    </div>
  );
};

export default UserNotes;
