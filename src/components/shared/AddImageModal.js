import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaTimes } from "react-icons/fa";
import Datepicker from "react-tailwindcss-datepicker";
import compressAndUploadImage from "../utilis/compressImages";
import { uploadToCloudinary } from "../utilis/uploadToCloudinary";
import { addImageAndDetails } from "../../services/userServices";
import Loader from "./Loader";
import { toBengaliNumber } from "bengali-number";

const AddImageModal = ({ data, showModal, closeModal }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewURLs, setPreviewURLs] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [presentCondition, setPresentCondition] = useState("");
  const [presentOfficers, setPresentOfficers] = useState("");
  const [loadingMessage, setLoadingMessage] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const handleFormData = async () => {
    try {
      if (!previewURLs?.length > 0) {
        return toast.error("ছবি যুক্তকরণে সমস্যা হয়েছে।");
      }
      setLoadingMessage("ছবি আপ্লোড হচ্ছে");
      setLoading(true);
      const uploadedImageLinks = [];
      for (let i = 0; i < selectedFiles?.length; i++) {
        setLoadingMessage(`${toBengaliNumber(i + 1)} নং ছবি কম্প্রেসড চলছে`);

        const compressedImage = await compressAndUploadImage(selectedFiles[i]);
        setLoadingMessage(`${toBengaliNumber(i + 1)} নং ছবি আপ্লোড চলছে`);
        const result = await uploadToCloudinary(compressedImage, "demodemo");
        uploadedImageLinks.push(result);
        setLoadingMessage("ছবি আপ্লোড শেষ হয়েছে");

        setLoadingMessage("তথ্য আপ্লোড হচ্ছে");
      }
      const imageData = {
        image: uploadedImageLinks,
        presentCondition: presentCondition,
        presentOfficer: presentOfficers,
        date: selectedDate?.startDate,
      };
      const result2 = await addImageAndDetails(data?._id, imageData);
      if (result2?.status === 200) {
        toast.success(result2?.data?.message);
        setLoading(false);
        setLoadingMessage(null);
        closeModal(); // Close modal after successful upload
      }
    } catch (err) {
      toast.error(
        "প্রদর্শনীর বর্তমান ছবি ও অবস্থার বর্ণনা যুক্ত করতে সমস্যার সৃষ্টি হচ্ছে।"
      );
    }
  };

  return (
    <>
      {!loading && showModal && (
        <dialog id="my_modal_1" className="modal text-center">
          <div className="modal-box w-6/12 max-w-5xl">
            <h3 className="font-bold text-xl mb-2">
              প্রদর্শনীর বর্তমান ছবি ও অবস্থার বর্ণনা যুক্ত করুন
            </h3>
            <Datepicker
              asSingle={true}
              id="demoDate"
              name="demoDate"
              showShortcuts={true}
              onChange={handleDateChange}
              value={selectedDate}
            />
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

                <input
                  type="file"
                  accept="image/*"
                  className="file-input file-input-bordered file-input-info mt-2 w-full"
                  onChange={handleFileChange}
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
        </dialog>
      )}
      {loading && (
        <div className="fixed daeLoader">
          <Loader />
          <h2 className="text-green-600 mt-3 text-4xl">
            {loadingMessage && loadingMessage}
          </h2>
        </div>
      )}
    </>
  );
};

export default AddImageModal;
