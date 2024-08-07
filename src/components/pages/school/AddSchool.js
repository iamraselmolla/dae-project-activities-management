import React, { useContext, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import SectionTitle from "../../shared/SectionTitle";
import * as Yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { AuthContext } from "../../AuthContext/AuthProvider";
import { FaTimes } from "react-icons/fa";
import LoaderWithDynamicMessage from "../../shared/LoaderWithDynamicMessage";
import { useSelector } from "react-redux";
import FiscalYear from "../../shared/FiscalYear";
import Season from "../../shared/Season";
import { createASchool } from "../../../services/userServices";
import { toBengaliNumber } from "bengali-number";
import compressAndUploadImage from "../../utilis/compressImages";
import { uploadToCloudinary } from "../../utilis/uploadToCloudinary";

const AddSchool = () => {
  const { user } = useContext(AuthContext);
  const { projects: allProjects } = useSelector((state) => state.dae);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [selectedProject, setSelectedProject] = useState({});
  const [loadingMessage, setLoadingMessage] = useState(null);
  const [rawImages, setRawImages] = useState([]);

  const handleRemoveImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setRawImages([...rawImages, ...files]);
    const imagesArray = files.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => prevImages.concat(imagesArray));
  };

  const initialValues = {
    projectInfo: {
      details: "",
      short: "",
    },
    location: {
      place: "",
      block: user?.blockB,
      union: user?.unionB,
    },
    time: {
      fiscalYear: "",
      season: "",
      date: {
        startDate: new Date(),
        endDate: new Date(),
      },
    },
    schoolInfo: {
      crop: "",
      schoolName: "",
      pfsFbs: "",
    },
    SAAO: {
      name: user?.SAAO?.name,
      mobile: user?.SAAO?.mobile,
    },
    assistantOfficers: "",
    higherPerson: "",
    comment: "",
    images: [],
    user: {
      id: user?._id,
      username: user?.username
    }
  };
  const validationSchema = Yup.object().shape({
    projectInfo: Yup.object().shape({
      details: Yup.string().required("প্রকল্পের পুরো নাম প্রয়োজন"),
      short: Yup.string().required("প্রকল্পের সংক্ষেপ নাম প্রয়োজন"),
    }),
    location: Yup.object().shape({
      place: Yup.string().required("স্থান প্রয়োজন"),
      block: Yup.string().required("ব্লক প্রয়োজন"),
      union: Yup.string().required("ইউনিয়ন প্রয়োজন"),
    }),
    time: Yup.object().shape({
      fiscalYear: Yup.string().required("অর্থবছর সিলেক্ট করুন"),
      season: Yup.string().required("মৌসুম সিলেক্ট করুন"),
      date: Yup.object().shape({
        startDate: Yup.date().required("শুরু তারিখ প্রয়োজন"),
        endDate: Yup.date().required("শেষ তারিখ প্রয়োজন"),
      }),
    }),
    schoolInfo: Yup.object().shape({
      crop: Yup.string().required("ফসল প্রয়োজন"),
      schoolName: Yup.string().required("স্কুলের নাম প্রয়োজন"),
      pfsFbs: Yup.string().required("PFS/FBS সিলেক্ট করুন"),
    }),
    SAAO: Yup.object().shape({
      name: Yup.string().required("এসএএও নাম প্রয়োজন"),
      mobile: Yup.string().required("এসএএও মোবাইল প্রয়োজন"),
    }),
    // assistantOfficers: Yup.string().required("সহকারী অফিসারদের নাম প্রয়োজন"),
    // higherPerson: Yup.string().required(
    //   "উর্ধবতন কর্মকর্তার নাম (যদি উপস্থিত থাকেন) প্রয়োজন"
    // ),
    comment: Yup.string(),
  });
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      if (!values.time.date?.startDate || !values.time.date?.endDate) {
        return toast.error(
          "আপনাকে অবশ্যই প্রজেক্টের শুরু ও শেষের তারিখ দিতে হবে।"
        );
      }
      if (!user) {
        return toast.error("লগইন করুন প্রথমে।");
      }
      if (images?.length < 1) {
        toast.error("আপনাকে অবশ্যই স্কুলের ছবিসমূহ দিতে হবে।");
        return;
      }
      if (!values.user?.id || !values.user?.username) {
        return toast.error("ইউজার নাম যুক্ত হয়নি। দয়া করে আবার লগিন করে রিলোড দিন অথবা সংশ্লিষ্ট ব্যক্তিকে অবহিত করুন।")
      }
      try {
        setLoadingMessage("ছবি আপ্লোড হচ্ছে");
        setLoading(true);
        const uploadedImageLinks = [];
        for (let i = 0; i < rawImages?.length; i++) {
          setLoadingMessage(`${toBengaliNumber(i + 1)} নং ছবি কম্প্রেসড চলছে`);
          const compressedImage = await compressAndUploadImage(rawImages[i]);
          setLoadingMessage(`${toBengaliNumber(i + 1)} নং ছবি আপ্লোড চলছে`);
          const result = await uploadToCloudinary(compressedImage, "school");
          uploadedImageLinks.push(result);
        }
        values.images = uploadedImageLinks;

        const result = await createASchool(values);
        if (result?.status === 200) {
          toast.success(result?.data?.message);
          formik.resetForm();
          setImages([]);
          setSelectedProject({});
          setRawImages([]);
        }
      } catch (error) {
        console.error("PFS FBS creation error:", error);
        toast.error("স্কুল তথ্য সংরক্ষণে সমস্যা হয়েছে।");
      } finally {
        setLoading(false);
      }
    },
  });

  const handleSelectChange = (e) => {
    if (e.target.value) {
      const findProject = allProjects?.find(
        (s) => s?.name?.details === e.target.value
      );
      setSelectedProject(findProject);
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

  return (
    <section className="mx-auto bg-white max-w-7xl px-2 sm:px-6 lg:px-8">
      <SectionTitle title={"নতুন স্কুল তথ্য যুক্ত করুন"} />
      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div>
            <label className="font-extrabold mb-1 block">
              প্রকল্পের পুরো নাম
            </label>
            <select
              className="input input-bordered w-full"
              id="projectInfo.details"
              name="projectInfo.details"
              value={selectedProject?.name?.details}
              onChange={handleSelectChange}
              onBlur={formik.handleBlur}
            >
              <option value="" label="প্রকল্প সিলেক্ট করুন" />
              {allProjects && allProjects?.length > 0 && (
                <>
                  {allProjects?.map((single) => (
                    <option
                      key={single?.name.details}
                      value={single?.name?.details}
                      label={single?.name?.details}
                    />
                  ))}
                </>
              )}
            </select>
            {formik.touched.projectInfo &&
              formik.errors.projectInfo?.details && (
                <div className="text-red-600 font-bold">
                  {formik.errors.projectInfo.details}
                </div>
              )}
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
              value={
                selectedProject.name?.short
                  ? selectedProject.name?.short
                  : formik.values.projectInfo?.short
              }
            />
            {formik.touched.projectInfo && formik.errors.projectInfo?.short && (
              <div className="text-red-600 font-bold">
                {formik.errors.projectInfo.short}
              </div>
            )}
          </div>

          <div>
            <label className="font-extrabold mb-1 block">অর্থবছর</label>
            <select
              className="input input-bordered w-full"
              id="time.fiscalYear"
              name="time.fiscalYear"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.time.fiscalYear}
            >
              <FiscalYear />
            </select>
            {formik.touched.time && formik.errors.time?.fiscalYear && (
              <div className="text-red-600 font-bold">
                {formik.errors.time.fiscalYear}
              </div>
            )}
          </div>
          <div>
            <label className="font-extrabold mb-1 block">মৌসুম</label>
            <select
              className="input input-bordered w-full"
              id="time.season"
              name="time.season"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.time.season}
            >
              <Season />
            </select>
            {formik.touched.time && formik.errors.time?.season && (
              <div className="text-red-600 font-bold">
                {formik.errors.time.season}
              </div>
            )}
          </div>
          <div>
            <label className="font-extrabold mb-1 block">PFS/FBS</label>
            <select
              className="input input-bordered w-full"
              id="schoolInfo.pfsFbs"
              name="schoolInfo.pfsFbs"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.schoolInfo.pfsFbs}
            >
              <option value="" label="PFS/FBS সিলেক্ট করুন" />
              <option value="pfs" label="PFS" />
              <option value="fbs" label="FBS" />
            </select>
            {formik.touched.schoolInfo && formik.errors.schoolInfo?.pfsFbs && (
              <div className="text-red-600 font-bold">{formik.errors.schoolInfo.pfsFbs}</div>
            )}
          </div>
          <div>
            <label className="font-extrabold mb-1 block">ফসল</label>
            <input
              type="text"
              className="input input-bordered w-full"
              id="schoolInfo.crop"
              name="schoolInfo.crop"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.schoolInfo.crop}
            />
            {formik.touched.schoolInfo && formik.errors.schoolInfo?.crop && (
              <div className="text-red-600 font-bold">{formik.errors.schoolInfo.crop}</div>
            )}
          </div>
          <div>
            <label className="font-extrabold mb-1 block">স্কুলের নাম</label>
            <input
              type="text"
              className="input input-bordered w-full"
              id="schoolInfo.schoolName"
              name="schoolInfo.schoolName"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.schoolInfo.schoolName}
            />
            {formik.touched.schoolInfo && formik.errors.schoolInfo?.schoolName && (
              <div className="text-red-600 font-bold">{formik.errors.schoolInfo.schoolName}</div>
            )}
          </div>

          <div>
            <label className="font-extrabold mb-1 block">স্থান</label>
            <input
              type="text"
              className="input input-bordered w-full"
              id="location.place"
              name="location.place"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.location.place}
            />
            {formik.touched.location && formik.errors.location?.place && (
              <div className="text-red-600 font-bold">
                {formik.errors.location.place}
              </div>
            )}
          </div>
          <div>
            <label className="font-extrabold mb-1 block">ব্লক</label>
            <input
              type="text"
              className="input input-bordered w-full"
              id="location.block"
              name="location.block"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.location.block}
              disabled
              readOnly
            />
            {formik.touched.location && formik.errors.location?.block && (
              <div className="text-red-600 font-bold">
                {formik.errors.location.block}
              </div>
            )}
          </div>
          <div>
            <label className="font-extrabold mb-1 block">ইউনিয়ন</label>
            <input
              type="text"
              className="input input-bordered w-full"
              id="location.union"
              name="location.union"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.location.union}
              disabled
              readOnly
            />
            {formik.touched.location && formik.errors.location?.union && (
              <div className="text-red-600 font-bold">
                {formik.errors.location.union}
              </div>
            )}
          </div>
          <div>
            <label className="font-extrabold mb-1 block">তারিখ</label>
            <Datepicker
              asSingle={true}
              value={formik.values.time.date}
              onChange={(value) =>
                formik.setValues({
                  ...formik.values,
                  time: { ...formik.values.time, date: value },
                })
              }
              startFrom="1971-03-26"
              inputClassName="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="font-extrabold mb-1 block">
              সহকারী অফিসারদের নাম
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              id="assistantOfficers"
              name="assistantOfficers"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.assistantOfficers}
            />
            {formik.touched.assistantOfficers &&
              formik.errors.assistantOfficers && (
                <div className="text-red-600 font-bold">
                  {formik.errors.assistantOfficers}
                </div>
              )}
          </div>
          <div>
            <label className="font-extrabold mb-1 block">
              উর্ধবতন কর্মকর্তার নাম (যদি উপস্থিত থাকেন)
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              id="higherPerson"
              name="higherPerson"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.higherPerson}
            />
            {formik.touched.higherPerson && formik.errors.higherPerson && (
              <div className="text-red-600 font-bold">
                {formik.errors.higherPerson}
              </div>
            )}
          </div>
          <div>
            <label className="font-extrabold mb-1 block">দিনের সংখ্যা</label>
            <input
              type="number"
              className="input input-bordered w-full"
              id="dayNumber"
              name="dayNumber"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.dayNumber}
            />
            {formik.touched.dayNumber && formik.errors.dayNumber && (
              <div className="text-red-600 font-bold">
                {formik.errors.dayNumber}
              </div>
            )}
          </div>
          <div>
            <label className="font-extrabold mb-1 block">মন্তব্য</label>
            <textarea
              className="input input-bordered w-full"
              id="comment"
              name="comment"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.comment}
            />
            {formik.touched.comment && formik.errors.comment && (
              <div className="text-red-600 font-bold">
                {formik.errors.comment}
              </div>
            )}
          </div>

          <div className="lg:col-span-2">
            <label className="font-extrabold mb-1 block">স্কুলের ছবিসমূহ</label>
            <input
              type="file"
              className="file-input w-full"
              id="images"
              name="images"
              onChange={handleImageChange}
              multiple
            />
            <div className="grid grid-cols-4 gap-2 mt-2">
              {images?.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt="project"
                    className="w-full h-20 object-cover"
                  />
                  <button
                    type="button"
                    className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded"
                    onClick={() => handleRemoveImage(index)}
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div>
            <label className="font-extrabold mb-1 block">এসএএও নাম</label>
            <input
              type="text"
              className="input input-bordered w-full"
              id="SAAO.name"
              name="SAAO.name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.SAAO?.name}
              disabled
              readOnly
            />
            {formik.touched.SAAO && formik.errors.SAAO?.name && (
              <div className="text-red-600 font-bold">
                {formik.errors.SAAO.name}
              </div>
            )}
          </div>
          <div>
            <label className="font-extrabold mb-1 block">এসএএও মোবাইল</label>
            <input
              type="text"
              className="input input-bordered w-full"
              id="SAAO.mobile"
              name="SAAO.mobile"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.SAAO?.mobile}
              disabled
              readOnly
            />
            {formik.touched.SAAO && formik.errors.SAAO?.mobile && (
              <div className="text-red-600 font-bold">
                {formik.errors.SAAO.mobile}
              </div>
            )}
          </div>
        </div>
        {!loading && <button
          type="submit"
          className="btn mt-5 bg-green-600 hover:bg-green-700 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={loading}
        >
          তথ্য জমা দিন
        </button>}
      </form>
      {loading && <>
        <LoaderWithDynamicMessage message={loadingMessage} />
      </>}
    </section>
  );
};

export default AddSchool;
