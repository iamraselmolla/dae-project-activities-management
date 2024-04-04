import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../AuthContext/AuthProvider";
import toast from "react-hot-toast";
import {
  deleteAnote,
  findUserAllNotes,
} from "../../../../../services/userServices";
import { AiOutlineFileDone } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import UserNoteTH from "./UserNoteTH";
import UserNoteTD from "./UserNoteTD";
import Loader from "../../../../shared/Loader";
import { toBengaliNumber } from "bengali-number";
import { makeSureOnline } from "../../../../shared/MessageConst";
import CompleteModel from "./CompleteModel";

const UserNotes = () => {
  const { user } = useContext(AuthContext);
  const [allNotes, setAllNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchEnd, setFetchEnd] = useState(false);
  const [reload, setReload] = useState(false);
  const [modalData, setModalData] = useState(null);

  //   Find User All Notes
  useEffect(() => {
    const findAllNotes = async () => {
      setLoading(true);
      try {
        const result = await findUserAllNotes(user?.username);
        if (result.status === 200) {
          setAllNotes(result?.data?.data);
          setLoading(false);
          setFetchEnd(true);
        }
      } catch (err) {
        toast.error("ইউজারের নোটের তথ্য আনতে সমস্যার সৃষ্টি হচ্ছে।");
        setLoading(false);
        setFetchEnd(true);
      }
    };
    if (navigator.onLine) {
      findAllNotes();
    } else {
      toast.error(makeSureOnline);
    }
  }, [user, reload]);

  //   Delete a Note of User
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
                setReload(!reload);
              }
            } catch (err) {
              toast.error("নোটটি মুছতে সাময়িক অসুবিধার সৃষ্টি হচ্ছে।");
            }
          }
        }
      }
    } else {
      toast.error(makeSureOnline);
    }
  };

  //   Hanlde click to display modal

  const handleNoteModal = (noteData) => {
    document.getElementById("my_modal_3").showModal();
    setModalData(noteData);
  };
  return (
    <div className="flex flex-col">
      <div className="mt-10 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="border rounded-lg shadow overflow-hidden dark:border-gray-700 dark:shadow-gray-900">
            {!loading && (
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr className="divide-x font-extrabold divide-gray-200 dark:divide-gray-700">
                    <UserNoteTH text="ক্রমিক নং" />
                    <UserNoteTH text="উদ্দেশ্য" />
                    <UserNoteTH text="কৃষকের নাম ও পিতার নাম" />
                    <UserNoteTH text="মোবাইল ও NID" />
                    <UserNoteTH text="গ্রাম, ব্লক ও ইউনিয়ন" />
                    <UserNoteTH text="অর্থবছর ও মৌসুম" />
                    <UserNoteTH text="তারিখ" />
                    <UserNoteTH text="কার্য শেষের মন্তব্য" />
                    <UserNoteTH text="SAAO-এর নাম ও মোবাইল নং" />
                    <UserNoteTH text="একশন" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {!loading &&
                    fetchEnd &&
                    allNotes?.length > 0 &&
                    allNotes?.map((singleNote, index) => (
                      <tr
                        key={singleNote?._id}
                        className="divide-x divide-gray-200 dark:divide-gray-700"
                      >
                        <UserNoteTD text={toBengaliNumber(index + 1)} />
                        <UserNoteTD text={singleNote?.purpose?.target} />
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
                        <UserNoteTD />
                        <UserNoteTD
                          text={
                            singleNote?.SAAO?.name +
                            "\n" +
                            toBengaliNumber(singleNote?.SAAO?.mobile)
                          }
                        />

                        <td className="p-3 flex gap-2 text-center whitespace-nowrap text-sm font-medium">
                          <span className="cursor-pointer">
                            <AiOutlineFileDone
                              onClick={() => handleNoteModal(singleNote)}
                              size={35}
                              color="green"
                            />
                            <CompleteModel data={modalData} />
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

                  {fetchEnd && !loading && allNotes?.length < 1 && (
                    <tr>
                      <td colSpan="10" className="p-3">
                        <span className="flex justify-center items-center">
                          <h2 className="text-red-600 text-2xl">
                            কোনো নোট খুজে পাওয়া যায়নি
                          </h2>
                        </span>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
            {loading && <Loader />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserNotes;
