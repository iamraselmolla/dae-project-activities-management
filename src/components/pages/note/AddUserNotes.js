import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { createANote } from "../../../services/userServices";
import { toBengaliNumber } from "bengali-number";
import getFiscalYear from "../../shared/commonDataStores";
import FiscalYear from "../../shared/FiscalYear";
import Season from "../../shared/Season";
import Datepicker from "react-tailwindcss-datepicker";
import { AuthContext } from "../../AuthContext/AuthProvider";
import { FaTimes } from "react-icons/fa";
import compressAndUploadImage from "../../utilis/compressImages";
import { uploadToCloudinary } from "../../utilis/uploadToCloudinary";
import Loader from "../../shared/Loader";
import SectionTitle from "../../shared/SectionTitle";
import { useSelector } from "react-redux";

const AddNotes = () => {
  const [images, setImages] = useState([]);
  const [rawImages, setRawImages] = useState([]);
  const { user } = useContext(AuthContext);
  const [loadingMessage, setLoadingMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notesDate, setNotesDate] = useState({
    startDate: "",
    endDate: "",
  });
  const { projects: allProject } = useSelector((state) => state.dae);
  const initialValues = {
    projectInfo: {
      details: "",
      short: "",
    },
    timeFrame: {
      season: "",
      fiscalYear: toBengaliNumber(getFiscalYear()),
    },
    purpose: {
      target: "",
      comment: "",
      date: new Date(),
    },
    farmersInfo: {
      name: "",
      fathersOrHusbandName: "",
      mobile: "",
      NID: "",
    },
    address: {
      village: "",
      block: user?.blockB || "", // Set default value
      union: user?.unionB || "", // Set default value
    },
    SAAO: {
      name: user?.SAAO.name || "", // Set default value
      mobile: toBengaliNumber(user?.SAAO.mobile) || "", // Set default value
    },
    attachment: "",
    comment: {
      noteComment: "",
      completedComment: "",
    },
    username: user?.username,
  };
  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);

    setRawImages([...rawImages, ...files]);
    const imagesArray = files.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => prevImages.concat(imagesArray));
  };
  const handleRemoveImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const validationSchema = Yup.object().shape({
    farmersInfo: Yup.object().shape({
      name: Yup.string().required("অবশ্যই কৃষকের নাম দিন"),
      fathersOrHusbandName: Yup.string().required("পিতা/স্বামীর নাম দিন"),
      mobile: Yup.string()
        .required("মোবাইল নম্বর দিন")
        .matches(/^[0-9]{11}$/, "মোবাইল নম্বর ১১ টি সংখ্যার হতে হবে"),
    }),
    address: Yup.object().shape({
      village: Yup.string().required("গ্রামের নাম দিন"),
    }),
  });
  const handleSelectChange = (formik, e) => {
    if (e.target.value) {
      const findProject = allProject?.find(
        (s) => s?.name?.details === e.target.value
      );
      if (findProject) {
        formik.setValues({
          ...formik.values,
          projectInfo: {
            details: findProject?.name?.details,
            short: findProject?.name?.short,
          },
        });
      }
    }
  };
  const handleDateValue = (date, formik) => {
    // Update purpose date in formik values
    formik.setValues({
      ...formik.values,
      purpose: {
        ...formik.values.purpose,
        date: date.startDate, // Set the date property to the start date of the selected date range
      },
    });

    // Update local state for notesDate
    setNotesDate(date);
  };
  const handleSubmit = async (values, formikBag) => {
    try {
      setLoading(true);
      // Prepare data for submission
      const uploadingImg = [];
      const data = {
        projectInfo: values.projectInfo,
        timeFrame: values.timeFrame,
        purpose: values.purpose,
        farmersInfo: values.farmersInfo,
        address: {
          ...values.address,
          block: user?.blockB,
          union: user?.unionB,
        },
        SAAO: user?.SAAO,
        username: user?.username,
        done: false,
        comment: values.comment,
      };

      if (rawImages?.length > 0) {
        setLoadingMessage("ছবি আপ্লোড হচ্ছে");
        for (let i = 0; i < rawImages?.length; i++) {
          setLoadingMessage(`${toBengaliNumber(i + 1)} নং ছবি কম্প্রেসড চলছে`);
          const compressedImage = await compressAndUploadImage(rawImages[i]);
          setLoadingMessage(`${toBengaliNumber(i + 1)} নং ছবি আপ্লোড চলছে`);
          const result = await uploadToCloudinary(compressedImage, "notenote");
          uploadingImg.push(result);
        }

        data.attachment = uploadingImg;
      }

      const result = await createANote(data);
      if (result.status === 200) {
        toast.success(result?.data?.message);
        formikBag.resetForm();
        setImages([]);
        setLoading(false);
        setRawImages([]);
      }
    } catch (error) {
      console.error("Submission Error:", error);
      toast.error("তথ্য সাবমিট করা যায়নি। দয়া করে পুনরায় চেষ্টা করুন।");
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto bg-white max-w-7xl px-2 sm:px-6 lg:px-8 py-8">
      <SectionTitle title={"নোট যুক্ত করুন"} />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form className="space-y-4  p-6 rounded-3 ">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div>
                <label className="font-extrabold mb-1 block">
                  প্রকল্পের পুরো নাম
                </label>
                <select
                  className="input input-bordered w-full"
                  id="projectInfo.details"
                  name="projectInfo.details"
                  value={formik.values?.projectInfo?.details}
                  onChange={(e) => handleSelectChange(formik, e)}
                  onBlur={formik.handleBlur}
                >
                  <option value="" label="প্রকল্প সিলেক্ট করুন" />
                  {allProject && allProject.length > 0 && (
                    <>
                      {allProject.map((single) => (
                        <option
                          key={single?.name?.details}
                          value={single?.name?.details}
                          label={single?.name?.details}
                        />
                      ))}
                    </>
                  )}
                </select>
                {formik.touched.projectInfo &&
                formik.touched.projectInfo.details &&
                formik.errors.projectInfo?.details ? (
                  <div className="text-red-600 font-bold">
                    {formik.errors.projectInfo.details}
                  </div>
                ) : null}
              </div>
              <div>
                <label className="font-extrabold mb-1 block">
                  প্রকল্পের সংক্ষেপ নাম
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  id="projectInfo.short"
                  disabled={true}
                  name="projectInfo.short"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  placeholder="প্রকল্পের সংক্ষেপ নাম"
                  value={formik.values?.projectInfo?.short}
                />

                {formik.touched.projectInfo &&
                formik.touched.projectInfo.short &&
                formik.errors.projectInfo?.short ? (
                  <div className="text-red-600 font-bold">
                    {formik.errors.projectInfo.short}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              <div>
                <label className="font-extrabold mb-1 block">অর্থবছর</label>
                <select
                  className="input input-bordered w-full"
                  id="timeFrame.fiscalYear"
                  name="timeFrame.fiscalYear"
                  value={formik.values.timeFrame.fiscalYear}
                  onChange={formik.handleChange}
                >
                  <FiscalYear />
                </select>
              </div>
              <div>
                <label className="font-extrabold mb-1 block">মৌসুম</label>
                <select
                  className="input input-bordered w-full"
                  id="timeFrame.season"
                  name="timeFrame.season"
                  value={formik.values.timeFrame.season}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <Season />
                </select>
                {formik.touched.timeFrame &&
                formik.touched.timeFrame.season &&
                formik.errors.timeFrame?.season ? (
                  <div className="text-red-600 font-bold">
                    {formik.errors.timeFrame.season}
                  </div>
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="purpose.date"
                  className="block font-semibold mb-1"
                >
                  তারিখ
                </label>
                <Datepicker
                  name="purpose.date"
                  selected={formik.values.purpose.date}
                  onChange={(date) => handleDateValue(date, formik)}
                  value={notesDate}
                  asSingle={true}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage
                  name="purpose.date"
                  component="div"
                  className="text-red-600"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div>
                <label
                  htmlFor="purpose.target"
                  className="block font-semibold mb-1"
                >
                  উদ্দেশ্য
                </label>
                <Field
                  as="select"
                  name="purpose.target"
                  defaultValue="কৃষি পরামর্শ প্রদান"
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="" label="উদ্দেশ্য নির্বাচন করুন" />
                  <option value="প্রদর্শনী দেওয়া">প্রদর্শনী দেওয়া</option>
                  <option value="প্রশিক্ষণে নাম দেয়া">
                    প্রশিক্ষণে নাম দেয়া
                  </option>
                  <option value="মাঠ দিবসে উপস্থিত থাকতে বলা">
                    মাঠ দিবসে উপস্থিত থাকতে বলা
                  </option>
                  <option value="উদ্বুদ্ধকরণভ্রমণে নেওয়া">
                    উদ্বুদ্ধকরণভ্রমণে নেওয়া
                  </option>
                  <option value="কৃষি পরামর্শ প্রদান">
                    কৃষি পরামর্শ প্রদান
                  </option>
                  <option value="মালামাল বিতরণ">মালামাল বিতরণ</option>
                </Field>
                <ErrorMessage
                  name="purpose.target"
                  component="div"
                  className="text-red-600"
                />
              </div>

              <div>
                <label
                  htmlFor="purpose.comment"
                  className="block font-semibold mb-1"
                >
                  মন্তব্য
                </label>
                <Field
                  type="text"
                  name="purpose.comment"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage
                  name="purpose.comment"
                  component="div"
                  className="text-red-600"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div>
                <label
                  htmlFor="farmersInfo.name"
                  className="block font-semibold mb-1"
                >
                  নাম
                </label>
                <Field
                  type="text"
                  name="farmersInfo.name"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage
                  name="farmersInfo.name"
                  component="div"
                  className="text-red-600"
                />
              </div>

              <div>
                <label
                  htmlFor="farmersInfo.fathersOrHusbandName"
                  className="block font-semibold mb-1"
                >
                  পিতা/স্বামীর নাম
                </label>
                <Field
                  type="text"
                  name="farmersInfo.fathersOrHusbandName"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage
                  name="farmersInfo.fathersOrHusbandName"
                  component="div"
                  className="text-red-600"
                />
              </div>

              <div>
                <label
                  htmlFor="farmersInfo.mobile"
                  className="block font-semibold mb-1"
                >
                  মোবাইল
                </label>
                <Field
                  type="text"
                  maxLength={11}
                  name="farmersInfo.mobile"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage
                  name="farmersInfo.mobile"
                  component="div"
                  className="text-red-600"
                />
              </div>

              <div>
                <label
                  htmlFor="farmersInfo.NID"
                  className="block font-semibold mb-1"
                >
                  জাতীয় পরিচয়পত্র নম্বর
                </label>
                <Field
                  type="number"
                  name="farmersInfo.NID"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage
                  name="farmersInfo.NID"
                  component="div"
                  className="text-red-600"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              <div>
                <label
                  htmlFor="address.village"
                  className="block font-semibold mb-1"
                >
                  গ্রাম
                </label>
                <Field
                  type="text"
                  name="address.village"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage
                  name="address.village"
                  component="div"
                  className="text-red-600"
                />
              </div>

              <div>
                <label
                  htmlFor="address.block"
                  className="block font-semibold mb-1"
                >
                  ব্লক
                </label>
                <Field
                  type="text"
                  name="address.block"
                  value={user?.blockB}
                  disabled={true}
                  readOnly
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage
                  name="address.block"
                  component="div"
                  className="text-red-600"
                />
              </div>

              <div>
                <label
                  htmlFor="address.union"
                  className="block font-semibold mb-1"
                >
                  ইউনিয়ন
                </label>
                <Field
                  type="text"
                  name="address.union"
                  value={user?.unionB}
                  disabled={true}
                  readOnly
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage
                  name="address.union"
                  component="div"
                  className="text-red-600"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 my-5 lg:grid-cols-2">
              <div>
                <label className="font-extrabold mb-1 block">
                  এসএএও এর নাম
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  id="SAAO.name"
                  name="SAAO.name"
                  readOnly
                  disabled={true}
                  placeholder="এসএএও নাম"
                  value={user?.SAAO.name}
                />
                {formik.touched.SAAO?.name && formik.errors.SAAO?.name ? (
                  <div className="text-red-600">{formik.errors.SAAO?.name}</div>
                ) : null}
              </div>
              <div>
                <label className="font-extrabold mb-1 block">
                  এসএএও এর মোবাইল
                </label>
                <input
                  type="text"
                  disabled={true}
                  className="input input-bordered w-full"
                  id="SAAO.mobile"
                  name="SAAO.mobile"
                  placeholder="এসএএও মোবাইল"
                  readOnly
                  value={toBengaliNumber(user?.SAAO.mobile)}
                />
                {formik.touched.SAAO?.mobile && formik.errors.SAAO?.mobile ? (
                  <div className="text-red-600">
                    {formik.errors.SAAO?.mobile}
                  </div>
                ) : null}
              </div>
            </div>
            <div>
              <label className="font-extrabold mb-1 block">সংযুক্তি</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="file-input w-100 input-bordered w-full"
              />
              {formik.touched.images && formik.errors.images ? (
                <div className="text-red-600">{formik.errors.images}</div>
              ) : null}
              <div className="mt-4 flex-wrap flex gap-2">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Image ${index + 1}`}
                      className="w-24 h-24 object-cover rounded-md mr-2 mb-2"
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
              <div className="mt-5">
                <label className="font-extrabold mb-1 block"> মন্তব্য</label>
                <textarea
                  name="comment.noteComment"
                  id="comment.noteComment"
                  className="input h-20 input-bordered w-full"
                  rows={10}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.comment.noteComment}
                ></textarea>
              </div>
            </div>
            {!loading && (
              <button
                disabled={formik.isSubmitting}
                type="submit"
                className="btn mt-5 w-full font-extrabold text-white btn-success"
              >
                কৃষক গ্রুপ সভার তথ্য যুক্ত করুন
              </button>
            )}
          </Form>
        )}
      </Formik>
      {loading && (
        <div className="fixed daeLoader">
          <Loader />
          <h2 className="text-green-600 mt-3 text-4xl">
            {loadingMessage && loadingMessage}
          </h2>
        </div>
      )}
    </div>
  );
};

export default AddNotes;
