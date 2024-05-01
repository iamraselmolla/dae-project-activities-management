import React from "react";
const MarkDemoCompleteModal = ({ data }) => {


  return (
    <dialog id="my_modal_33" className="modal  text-center">
      <div className="modal-box">
        <h3 className="font-bold text-xl mb-2">

          {data?.projectInfo?.short}-এর {data?.demoTime?.fiscalYear} অর্থবছরের {data?.demoTime?.season} মৌসুমের প্রযুক্তিঃ {data?.demoInfo?.tech} এর ফসলঃ {data?.demoInfo?.crop}   প্রদর্শনীপ্রাপ্ত কৃষক {data?.farmersInfo?.name} এর প্রদর্শনীটি চূড়ান্ত হিসেবে চিহ্নিত করুন।
        </h3>
        <div className="modal-action flex justify-center pb-5">
          <form method="dialog">
            <textarea

              className="textarea textarea-success w-full mb-2"
              placeholder="উপস্থিত কর্মকর্তা"
            ></textarea>

            <input

              className="textarea textarea-success w-full mb-2"
              placeholder="প্রদর্শনীর বর্তমান অবস্থা বর্ণনা করুন"
            />

            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered file-input-info mt-2 w-full"

              multiple
            />
            <button className="btn mt-3 text-white btn-success w-full">
              তথ্য ও ছবি যুক্ত করুন
            </button>

            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
        </div>
      </div>

    </dialog >



  );
};

export default MarkDemoCompleteModal;
