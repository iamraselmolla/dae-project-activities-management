// AddImageModal.jsx

import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

const AddImageModal = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    // Create a preview URL for the selected image
    const imageURL = URL.createObjectURL(file);
    setPreviewURL(imageURL);
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log(date);
  };

  return (
    <dialog id="my_modal_1" className="modal text-center">
      <div className="modal-box">
        <h3 className="font-bold text-xl mb-2">
          প্রদর্শনীর বর্তমান ছবি ও অবস্থার বর্ণনা যুক্ত করুন
        </h3>
        {previewURL && (
          <div className="flex justify-center">
            <img
              className="text-center"
              src={previewURL}
              alt="Preview"
              style={{ maxWidth: "100%" }}
            />
          </div>
        )}

        <div className="modal-action flex justify-center pb-5">
          <form method="dialog">
            <textarea
              className="textarea textarea-success w-full mb-2"
              placeholder="প্রদর্শনীর বর্তমান অবস্থা বর্ণনা করুন"
            ></textarea>
            <Datepicker
              asSingle={true}
              id="demoDate"
              name="demoDate"
              showShortcuts={true}
              onChange={handleDateChange}
            />
            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered file-input-info mt-2 w-full"
              onChange={handleFileChange}
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
    </dialog>
  );
};

export default AddImageModal;
