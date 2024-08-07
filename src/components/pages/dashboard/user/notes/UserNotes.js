import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { deleteAnote } from "../../../../../services/userServices";
import { AiOutlineFileDone } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import UserNoteTH from "./UserNoteTH";
import UserNoteTD from "./UserNoteTD";
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
  }, [selectedPurpose, incompletedNotes, allNotes]);

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
    document.getElementById("my_modal_3").showModal();
    setModalData(noteData);
  };

  // Handle purpose selection
  const handlePurposeSelection = (event) => {
    setSelectedPurpose(event.target.value);
  };

  return (
    <div className="flex flex-col">
      <div className="mt-10 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <AddModuleButton link={"dashboard/add-note"} btnText={"নোট যুক্ত করুন"} />
          <SectionTitle title={`অসম্পন্ন নোট (${toBengaliNumber(incompletedNotes?.length)})`} />
          <div>
            <select className="input input-bordered w-full" onChange={handlePurposeSelection}>
              <option value="" label="উদ্দেশ্য নির্বাচন করুন" />
              <option value="প্রদর্শনী দেওয়া">প্রদর্শনী দেওয়া</option>
              <option value="প্রশিক্ষণে নাম দেয়া">প্রশিক্ষণে নাম দেয়া</option>
              <option value="মাঠ দিবসে উপস্থিত থাকতে বলা">মাঠ দিবসে উপস্থিত থাকতে বলা</option>
              <option value="উদ্বুদ্ধকরণভ্রমণে নেওয়া">উদ্বুদ্ধকরণভ্রমণে নেওয়া</option>
              <option value="কৃষি পরামর্শ প্রদান">কৃষি পরামর্শ প্রদান</option>
              <option value="উপকরণ বিতরণ">উপকরণ বিতরণ</option>
            </select>
          </div>
          <div className="border mt-6 rounded-lg shadow overflow-hidden dark:border-gray-700 dark:shadow-gray-900 mb-16">
            <>
              <table className="min-w-full divide-y bg-white  divide-gray-200 dark:divide-gray-700">
                {/* Table Header */}
                <thead>
                  <tr className="divide-x font-extrabold divide-gray-200 dark:divide-gray-700">
                    <UserNoteTH text="ক্রমিক নং" />
                    <UserNoteTH text="উদ্দেশ্য" />
                    <UserNoteTH text="প্রকল্প" />
                    <UserNoteTH text="কৃষকের নাম ও পিতার নাম" />
                    <UserNoteTH text="মোবাইল ও NID" />
                    <UserNoteTH text="গ্রাম" />
                    <UserNoteTH text="অর্থবছর ও মৌসুম" />
                    <UserNoteTH text="তারিখ" />
                    <UserNoteTH text="SAAO-এর নাম ও মোবাইল নং" />
                    <UserNoteTH text="কার্য মন্তব্য" />
                    <UserNoteTH text="একশন" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {/* Table Body */}
                  {filteredIncompletedNotes?.length > 0 &&
                    filteredIncompletedNotes?.map((singleNote, index) => (
                      <tr
                        key={singleNote?._id}
                        className="divide-x divide-gray-200 dark:divide-gray-700"
                      >
                        <UserNoteTD text={toBengaliNumber(index + 1)} />
                        <UserNoteTD text={singleNote?.purpose?.target} />
                        <UserNoteTD text={singleNote?.projectInfo?.short} />
                        <UserNoteTD
                          text={
                            singleNote?.farmersInfo?.name +
                            `\n` +
                            singleNote?.farmersInfo?.fathersOrHusbandName
                          }
                        />
                        <UserNoteTD
                          text={
                            singleNote?.farmersInfo.mobile +
                            `\n` +
                            singleNote?.farmersInfo?.NID
                          }
                        />
                        <UserNoteTD text={singleNote?.address?.village} />
                        <UserNoteTD
                          text={
                            singleNote?.timeFrame?.season +
                            "\n" +
                            toBengaliNumber(singleNote?.timeFrame?.fiscalYear)
                          }
                        />
                        <UserNoteTD
                          text={toBengaliNumber(
                            new Date(
                              singleNote?.purpose?.date
                            ).toLocaleDateString("bn-BD", {
                              weekday: "long", // Specify to include the full day name
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })
                          )}
                        />
                        <UserNoteTD
                          text={
                            singleNote?.SAAO?.name +
                            "\n" +
                            toBengaliNumber(singleNote?.SAAO?.mobile)
                          }
                        />
                        <UserNoteTD text={singleNote?.comment?.noteComment} />

                        <td className="p-3 flex gap-2 text-center whitespace-nowrap text-sm font-medium">
                          <span className="cursor-pointer">
                            {!singleNote?.done && (
                              <AiOutlineFileDone
                                onClick={() => handleNoteModal(singleNote)}
                                size={35}
                                color="green"
                              />
                            )}
                          </span>
                          <span className="cursor-pointer">
                            <MdOutlineDelete
                              onClick={() => handleNoteDeletion(singleNote)}
                              size={35}
                              color="red"
                            />
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {filteredIncompletedNotes?.length < 1 && (
                <NoContentFound text={" কোনো অসম্পন্ন নোট খুজে পাওয়া যায়নি!"} />
              )}
            </>
          </div>

          {/* Completed Notes Table */}
          <SectionTitle title={`সম্পন্ন নোট (${toBengaliNumber(completedNotes?.length)})`} />
          <div className="border rounded-lg shadow overflow-hidden dark:border-gray-700 dark:shadow-gray-900">
            <>
              <table className="min-w-full bg-white  divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr className="divide-x font-extrabold divide-gray-200 dark:divide-gray-700">
                    <UserNoteTH text="ক্রমিক নং" />
                    <UserNoteTH text="উদ্দেশ্য" />
                    <UserNoteTH text="প্রকল্প" />
                    <UserNoteTH text="কৃষকের নাম ও পিতার নাম" />
                    <UserNoteTH text="মোবাইল ও NID" />
                    <UserNoteTH text="গ্রাম" />
                    <UserNoteTH text="অর্থবছর ও মৌসুম" />
                    <UserNoteTH text="তারিখ" />
                    <UserNoteTH text="কার্য মন্তব্য" />
                    <UserNoteTH text="কার্য শেষের মন্তব্য" />
                    <UserNoteTH text="SAAO-এর নাম ও মোবাইল নং" />
                    <UserNoteTH text="একশন" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {completedNotes?.length > 0 &&
                    completedNotes?.map((singleNote, index) => (
                      <tr
                        key={singleNote?._id}
                        className="divide-x divide-gray-200 dark:divide-gray-700"
                      >
                        <UserNoteTD text={toBengaliNumber(index + 1)} />
                        <UserNoteTD text={singleNote?.purpose?.target} />
                        <UserNoteTD text={singleNote?.projectInfo?.short} />
                        <UserNoteTD
                          text={
                            singleNote?.farmersInfo?.name +
                            `\n` +
                            singleNote?.farmersInfo?.fathersOrHusbandName
                          }
                        />
                        <UserNoteTD
                          text={
                            singleNote?.farmersInfo.mobile +
                            `\n` +
                            singleNote?.farmersInfo?.NID
                          }
                        />
                        <UserNoteTD text={singleNote?.address?.village} />
                        <UserNoteTD
                          text={
                            singleNote?.timeFrame?.season +
                            "\n" +
                            toBengaliNumber(singleNote?.timeFrame?.fiscalYear)
                          }
                        />
                        <UserNoteTD
                          text={toBengaliNumber(
                            new Date(
                              singleNote?.purpose?.date
                            ).toLocaleDateString("bn-BD", {
                              weekday: "long", // Specify to include the full day name
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })
                          )}
                        />
                        <UserNoteTD text={singleNote?.comment?.noteComment} />
                        <UserNoteTD
                          text={singleNote?.comment?.completedComment}
                        />
                        <UserNoteTD
                          text={
                            singleNote?.SAAO?.name +
                            "\n" +
                            toBengaliNumber(singleNote?.SAAO?.mobile)
                          }
                        />

                        <td className="p-3 flex gap-2 text-center whitespace-nowrap text-sm font-medium">
                          <span className="cursor-pointer">
                            {!singleNote?.completed && (
                              <AiOutlineFileDone
                                onClick={() => handleNoteModal(singleNote)}
                                size={35}
                                color="green"
                              />
                            )}
                          </span>
                          <span className="cursor-pointer">
                            <MdOutlineDelete
                              onClick={() => handleNoteDeletion(singleNote)}
                              size={35}
                              color="red"
                            />
                          </span>
                        </td>
                      </tr>
                    ))}
                  <CompleteNoteModal data={modalData} />
                </tbody>
              </table>
              {completedNotes?.length < 1 && (
                <NoContentFound text={" কোনো সম্পন্ন নোট খুজে পাওয়া যায়নি!"} />
              )}
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserNotes;
