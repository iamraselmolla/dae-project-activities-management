import React, { useState } from "react";
import * as Yup from "yup";
import Datepicker from "react-tailwindcss-datepicker";

const MarkDemoCompleteModal = ({ data }) => {
  const [demoInfo, setDemoInfo] = useState({
    variety: "",
    area: "",
  });

  const [demoDate, setDemoDate] = useState({
    bopon: "",
    ropon: "",
    korton: "",
  });

  const [comment, setComment] = useState({
    farmersReview: "",
    overallComment: "",
  });

  const handleDemoInfoChange = (e) => {
    const { name, value } = e.target;
    setDemoInfo({ ...demoInfo, [name]: value });
  };

  const handleDemoDateChange = (name, value) => {
    setDemoDate({ ...demoDate, [name]: value });
  };

  const handleCommentChange = (e) => {
    const { name, value } = e.target;
    setComment({ ...comment, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    const formData = { demoInfo, demoDate, comment };
    console.log("Form submitted with values:", formData);
    // Add further logic here, like submitting data to server
  };

  return (
    <dialog id="my_modal_33" className="modal text-center">
      <div className="modal-box w-6/12 max-w-5xl">
        <h3 className="font-bold text-xl mb-2">
          {data?.projectInfo?.short}-এর {data?.demoTime?.fiscalYear} অর্থবছরের{" "}
          {data?.demoTime?.season} মৌসুমের প্রযুক্তিঃ {data?.demoInfo?.tech} এর
          ফসলঃ {data?.demoInfo?.crop} প্রদর্শনীপ্রাপ্ত কৃষক{" "}
          {data?.farmersInfo?.name} এর প্রদর্শনীটি চূড়ান্ত হিসেবে চিহ্নিত করুন।
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="grid mt-3 lg:grid-cols-3 gap-4 grid-cols-1">
            <div>
              <label className="font-extrabold mb-1 block">ফসলের জাত</label>
              <input
                type="text"
                className="input input-bordered w-full"
                name="variety"
                onChange={handleDemoInfoChange}
                placeholder="ফসলের জাত"
              />
            </div>

            <div>
              <label className="font-extrabold mb-1 block">
                প্রদর্শনীর আয়তন
              </label>
              <input
                type="number"
                className="input input-bordered w-full"
                name="area"
                onChange={handleDemoInfoChange}
                placeholder="প্রদর্শনীর আয়তন"
              />
            </div>
            <div>
              <label className="font-extrabold mb-1 block">বপণ তারিখ</label>
              <div className="input input-bordered w-full">
                <Datepicker
                  asSingle={true}
                  onChange={(selectedDate) =>
                    handleDemoDateChange("bopon", selectedDate)
                  }
                  showShortcuts={true}
                />
              </div>
            </div>
            <div>
              <label className="font-extrabold mb-1 block">রোপণ তারিখ</label>
              <div className="input input-bordered w-full">
                <Datepicker
                  asSingle={true}
                  onChange={(selectedDate) =>
                    handleDemoDateChange("ropon", selectedDate)
                  }
                  showShortcuts={true}
                />
              </div>
            </div>
            <div>
              <label className="font-extrabold mb-1 block">কর্তন তারিখ</label>
              <div className="input input-bordered w-full">
                <Datepicker
                  onChange={(selectedDate) =>
                    handleDemoDateChange("korton", selectedDate)
                  }
                  showShortcuts={true}
                />
              </div>
            </div>
            <div className="mt-5">
              <label className="font-extrabold mb-1 block">
                কৃষকের মন্তব্য
              </label>
              <textarea
                name="farmersReview"
                className="input h-20 input-bordered w-full"
                rows={10}
                onChange={handleCommentChange}
              ></textarea>
            </div>

            <div className="mt-5">
              <label className="font-extrabold mb-1 block">মন্তব্য</label>
              <textarea
                name="overallComment"
                className="input h-20 input-bordered w-full"
                rows={10}
                onChange={handleCommentChange}
              ></textarea>
            </div>
          </div>
          <button
            type="submit"
            className="btn mt-3 text-white btn-success w-full"
          >
            তথ্য ও ছবি যুক্ত করুন
          </button>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default MarkDemoCompleteModal;
