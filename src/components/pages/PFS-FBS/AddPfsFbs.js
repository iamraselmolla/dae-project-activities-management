import React, { useContext, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import SectionTitle from "../../shared/SectionTitle";
import * as Yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { AuthContext } from "../../AuthContext/AuthProvider";
import { FaTimes } from "react-icons/fa";
import Loader from "../../shared/Loader";
import { useSelector } from "react-redux";
import FiscalYear from "../../shared/FiscalYear";
import Season from "../../shared/Season";
import { createASchool } from "../../../services/userServices";
import { toBengaliNumber } from "bengali-number";
import compressAndUploadImage from "../../utilis/compressImages";
import { uploadToCloudinary } from "../../utilis/uploadToCloudinary";

const AddPfsFbs = () => {
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

  const validationSchema = Yup.object().shape({
    projectInfo: Yup.object().shape({
      details: Yup.string().required("প্রকল্পের পুরো নাম প্রয়োজন"),
      short: Yup.string().required("প্রকল্পের সংক্ষেপ নাম প্রয়োজন"),
    }),
    time: Yup.object().shape({
      fiscalYear: Yup.string().required("অর্থবছর সিলেক্ট করুন"),
      season: Yup.string().required("মৌসুম সিলেক্ট করুন"),
      date: Yup.object().shape({
        startDate: Yup.date().required("শুরু তারিখ প্রয়োজন"),
        endDate: Yup.date().required("শেষ তারিখ প্রয়োজন"),
      }),
    }),
    place: Yup.string().required("স্থান প্রয়োজন"),
    block: Yup.string().required("ব্লক প্রয়োজন"),
    union: Yup.string().required("ইউনিয়ন প্রয়োজন"),
    SAAO: Yup.object().shape({
      name: Yup.string().required("এসএএও নাম প্রয়োজন"),
      mobile: Yup.string().required("এসএএও মোবাইল প্রয়োজন"),
    }),
    assistantOfficers: Yup.string().required("সহকারী অফিসারদের নাম প্রয়োজন"),
    schoolName: Yup.string().required("স্কুলের নাম প্রয়োজন"),
    pfsFbs: Yup.string().required("PFS/FBS সিলেক্ট করুন"),
  });

  const initialValues = {
    projectInfo: {
      details: "",
      short: "",
    },
    place: "",
    block: "",
    union: "",
    crop: "",
    time: {
      fiscalYear: "",
      season: "",
      date: {
        startDate: new Date(),
        endDate: new Date(),
      },
    },
    SAAO: {
      name: "",
      mobile: "",
    },
    assistantOfficers: "",
    higherPerson: "",
    comment: "",
    images: [],
    schoolName: "",
    pfsFbs: "",
  };

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
        toast.error("আপনাকে অবশ্যই প্রজেক্টের ছবিসমূহ দিতে হবে।");
        return;
      }
      try {
        setLoadingMessage("ছবি আপ্লোড হচ্ছে");
        setLoading(true);
        const uploadedImageLinks = [];
        for (let i = 0; i < rawImages?.length; i++) {
          setLoadingMessage(`${toBengaliNumber(i + 1)} নং ছবি কম্প্রেসড চলছে`);
          const compressedImage = await compressAndUploadImage(rawImages[i]);
          setLoadingMessage(`${toBengaliNumber(i + 1)} নং ছবি আপ্লোড চলছে`);
          const result = await uploadToCloudinary(compressedImage, "pfsfbs");
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
        toast.error("পিএফএস এফবিএস তথ্য সংরক্ষণে সমস্যা হয়েছে।");
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
      <SectionTitle title={"নতুন পিএফএস এফবিএস তথ্য যুক্ত করুন"} />
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
              id="pfsFbs"
              name="pfsFbs"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.pfsFbs}
            >
              <option value="" label="PFS/FBS সিলেক্ট করুন" />
              <option value="pfs" label="PFS" />
              <option value="fbs" label="FBS" />
            </select>
            {formik.touched.pfsFbs && formik.errors.pfsFbs && (
              <div className="text-red-600 font-bold">
                {formik.errors.pfsFbs}
              </div>
            )}
          </div>
          <div>
            <label className="font-extrabold mb-1 block">ফসল</label>
            <input
              type="text"
              className="input input-bordered w-full"
              id="crop"
              name="crop"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.crop}
            />
            {formik.touched.crop && formik.errors.crop && (
              <div className="text-red-600 font-bold">{formik.errors.crop}</div>
            )}
          </div>
          <div>
            <label className="font-extrabold mb-1 block">স্কুলের নাম</label>
            <input
              type="text"
              className="input input-bordered w-full"
              id="schoolName"
              name="schoolName"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.schoolName}
            />
            {formik.touched.schoolName && formik.errors.schoolName && (
              <div className="text-red-600 font-bold">
                {formik.errors.schoolName}
              </div>
            )}
          </div>

          <div>
            <label className="font-extrabold mb-1 block">স্থান</label>
            <input
              type="text"
              className="input input-bordered w-full"
              id="place"
              name="place"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.place}
            />
            {formik.touched.place && formik.errors.place && (
              <div className="text-red-600 font-bold">
                {formik.errors.place}
              </div>
            )}
          </div>
          <div>
            <label className="font-extrabold mb-1 block">ব্লক</label>
            <input
              type="text"
              className="input input-bordered w-full"
              id="block"
              name="block"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={user?.blockB}
              disabled
              readOnly
            />
            {formik.touched.block && formik.errors.block && (
              <div className="text-red-600 font-bold">
                {formik.errors.block}
              </div>
            )}
          </div>
          <div>
            <label className="font-extrabold mb-1 block">ইউনিয়ন</label>
            <input
              type="text"
              className="input input-bordered w-full"
              id="union"
              name="union"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={user?.unionB}
              disabled
              readOnly
            />
            {formik.touched.union && formik.errors.union && (
              <div className="text-red-600 font-bold">
                {formik.errors.union}
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
              value={user?.SAAO?.name}
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
              value={user?.SAAO?.mobile}
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
        <div className="text-right mt-4">
          <button
            type="submit"
            className="btn mt-5 bg-green-600 hover:bg-green-700 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading}
          >
            {loading ? <Loader message={loadingMessage} /> : "তথ্য জমা দিন"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddPfsFbs;
