import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import Datepicker from "react-tailwindcss-datepicker";

const AddImageModal = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewURLs, setPreviewURLs] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [presentCondition, setPresentCondition] = useState("");
  const [presentOfficers, setPresentOfficers] = useState("");

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles([...selectedFiles, ...files]);

    const previewURLArray = files.map((file) => URL.createObjectURL(file));
    setPreviewURLs([...previewURLs, ...previewURLArray]);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleRemoveImage = (index) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);

    const updatedPreviews = [...previewURLs];
    updatedPreviews.splice(index, 1);
    setPreviewURLs(updatedPreviews);
  };

  const handleFormData = () => {

  };

  return (
    <dialog id="my_modal_1" className="modal text-center">
      <div className="modal-box">
        <h3 className="font-bold text-xl mb-2">
          প্রদর্শনীর বর্তমান ছবি ও অবস্থার বর্ণনা যুক্ত করুন
        </h3>
        {previewURLs?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-3 justify-center">
            {previewURLs?.map((image, index) => (
              <div key={index} className="relative">
                <img
                  width={100}
                  src={image}
                  alt={`Selected Image ${index + 1}`}
                  className="mt-2 max-w-64 h-auto"
                />

                <button
                  type="button"
                  className="absolute flex justify-center items-center w-6 h-6 rounded-full bg-red-700 top-0 right-0 text-white hover:text-green-300"
                  onClick={() => handleRemoveImage(index)}
                >
                  <FaTimes />
                </button>

              </div>
            ))}
          </div>
        )}

        <div className="modal-action flex justify-center pb-5">
          <form onSubmit={handleFormData} method="dialog">
            <textarea
              onChange={(e) => setPresentOfficers(e.target.value)}
              className="textarea textarea-success w-full mb-2"
              placeholder="উপস্থিত কর্মকর্তা"
            ></textarea>

            <input
              onChange={(e) => setPresentCondition(e.target.value)}
              className="textarea textarea-success w-full mb-2"
              placeholder="প্রদর্শনীর বর্তমান অবস্থা বর্ণনা করুন"
            />
            <Datepicker
              asSingle={true}
              id="demoDate"
              name="demoDate"
              showShortcuts={true}
              onChange={handleDateChange}
              value={selectedDate}
            />
            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered file-input-info mt-2 w-full"
              onChange={handleFileChange}
              multiple
            />
            <button
              type="submit"
              className="btn mt-3 text-white btn-success w-full"
            >
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
