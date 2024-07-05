import React, { useState } from "react";
import toast from "react-hot-toast";
import { makeSureOnline } from "../../../../shared/MessageConst";
import { markNoteAsComplete } from "../../../../../services/userServices";
import { useDispatch } from "react-redux";
import { daeAction } from "../../../../store/projectSlice";
import { createRandomNumber } from "../../../../utilis/createRandomNumber";

const CompleteNoteModal = ({ data }) => {
  const dispatch = useDispatch()

  const [commentData, setCommentData] = useState("");
  // Handle Note completion
  const handleNoteCompleted = async (id) => {
    if (navigator.onLine) {
      try {
        if (id) {
          if (!commentData) {
            return toast.error("দয়া করে মন্তব্য যুক্ত করুন");
          }
          const result = await markNoteAsComplete(id, commentData);
          if (result?.status === 200) {
            toast.success(result?.data?.message);
            dispatch(daeAction.setRefetch(`notes${createRandomNumber()}`));


          }
        }
      } catch (err) {
        toast.error("নোট সম্পন্ন করতে সমস্যার সৃষ্টি হচ্ছে।");
      }
    } else {
      makeSureOnline();
    }
  };
  return (
    <dialog id="my_modal_3" className="modal text-center">
      <div className="modal-box">
        <div className="modal-action block justify-center pb-5">
          <form method="dialog">
            <div className="flex flex-col w-100">
              <h2 className="text-2xl mb-4">
                মন্তব্য যুক্ত করে নোট সম্পন্ন করে দিন
              </h2>
              <h3 className="text-lg mb-3">
                কৃষকের নামঃ {data?.farmersInfo?.name}, উদ্দেশ্যঃ
                {data?.purpose?.target}
              </h3>
              <textarea
                placeholder="সম্পাদন মন্তব্য যুক্ত করুন"
                className="input px3 py-2 h-20 input-bordered w-full"
                rows={10}
                onChange={(e) => setCommentData(e.target.value)}
              ></textarea>
            </div>

            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
            <button
              onClick={() => handleNoteCompleted(data?._id)}
              type="button"
              className="btn w-full mt-3 text-white btn-success"
            >
              মন্তব্য যুক্ত করুন
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default CompleteNoteModal;
