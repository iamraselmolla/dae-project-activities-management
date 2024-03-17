import React, { useContext, useEffect, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import SectionTitle from "../../shared/SectionTitle";
import * as Yup from "yup";
import FiscalYear from "../../shared/FiscalYear";
import Season from "../../shared/Season";
import { useFormik } from "formik";
import { createTraining, getAllProjects } from "../../../services/userServices";
import toast from "react-hot-toast";
import { AuthContext } from "../../AuthContext/AuthProvider";


const AddTraining = () => {
  const [allProject, setAllProjects] = useState([]);
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });
  const [selectedImages, setSelectedImages] = useState([]); // Initialize as an empty array
  const { user } = useContext(AuthContext)

  const handleSelectChange = (e) => {
    if (e.target.value) {
      const findProject = allProject?.find(
        (s) => s?.name?.details === e.target.value
      );
      if (findProject) {
        formik.setValues({
          ...formik.values,
          projectInfo: {
            details: findProject?.name?.details,
            short: findProject?.name?.short
          }
        });
      }
    }
  };


  const handleValueChange = (newValue) => {
    setValue(newValue);
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    const imageFiles = [];

    for (let i = 0; i < files.length; i++) {
      if (files[i].type.startsWith("image/")) {
        imageFiles.push(URL.createObjectURL(files[i]));
      }
    }

    setSelectedImages(imageFiles);
  };

  const validationSchema = Yup.object().shape({
    projectInfo: Yup.object().shape({
      details: Yup.string().required("প্রকল্পের পুরো নাম প্রয়োজন"),
      short: Yup.string().required("প্রকল্পের সংক্ষেপ নাম প্রয়োজন"),
    }),
    fiscalYear: Yup.string().required("অর্থবছর প্রয়োজন"),
    season: Yup.string().required("মৌসুম প্রয়োজন"),
    subject: Yup.string().required("বিষয় প্রয়োজন"),
    guests: Yup.string().required("অতিথিদের নাম প্রয়োজন"),
    farmers: Yup.object().shape({
      male: Yup.number().required("পুরুষ কৃষকের সংখ্যা প্রয়োজন").min(0, "অক্ষত পুরুষ কৃষক সংখ্যা"),
      female: Yup.number().required("নারী কৃষকের সংখ্যা প্রয়োজন").min(0, "অক্ষত নারী কৃষক সংখ্যা"),
    }),
    date: Yup.object().shape({
      startDate: Yup.date().required("প্রশিক্ষণ শুরু তারিখ প্রয়োজন"),
      endDate: Yup.date().required("প্রশিক্ষণ শেষ তারিখ প্রয়োজন"),
    }),
    images: Yup.array().min(1, "কমপক্ষে একটি ছবি প্রয়োজন"),
    comment: Yup.string().required("মন্তব্য প্রয়োজন"),
  });

  const initialValues = {
    projectInfo: {
      details: '',
      short: '',
    },
    fiscalYear: "",
    season: "",
    subject: "",
    guests: "",
    farmers: {
      male: 0,
      female: 0,
    },
    date: "",
    images: [],
    comment: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      values.images = selectedImages;
      values.date = value;
      values.season = formik.values.season;
      if (!user) {
        return toast.error("প্রশিক্ষণের তথ্য যুক্ত কর‍তে হলে আপনাকে অবশ্যই লগিন করতে হবে।")
      }
      const postTrainingData = async () => {
        try {
          const result = await createTraining(values);
          if (result?.status === 200) {
            toast.success("প্রশিক্ষণ তথ্য যুক্ত করা হয়েছে।")
          }
        }
        catch (err) {
          console.log(err)
        }
      }
      if (navigator.onLine) {
        postTrainingData()
      } else {
        toast.error("দয়া করে আপনার ওয়াই-ফাই বা ইন্টারনেট সংযোগ যুক্ত করুন");
      }
    },
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllProjects();
        if (result?.data?.success) {
          setAllProjects(result.data.data);
        } else {
          setAllProjects([]);
          toast.error("প্রকল্পের তথ্য পাওয়া যায়নি"); // Notify user if data retrieval was not successful
        }
      } catch (error) {
        console.error("প্রকল্পের তথ্যের সমস্যা:", error);
        toast.error(
          "প্রকল্পের তথ্য সার্ভার থেকে আনতে অসুবিধার সৃষ্টি হয়েছে। পুনরায় রিলোড করেন অথবা সংশ্লিষ্ট কর্তৃপক্ষকে অবহিত করুন"
        );
      }
    };

    if (navigator.onLine) {
      fetchData();
    } else {
      toast.error("দয়া করে আপনার ওয়াই-ফাই বা ইন্তারনেট সংযোগ যুক্ত করুন");
    }
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <SectionTitle title={"নতুন প্রশিক্ষণ তথ্য যুক্ত করুন"} />
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
              value={formik.values?.name?.details}
              onChange={handleSelectChange}
              onBlur={formik.handleBlur}
            >
              <option value="" label="প্রকল্প সিলেক্ট করুন" />
              {allProject && allProject?.length > 0 && (
                <>
                  {allProject?.map((single) => (
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
              value={formik.values.projectInfo?.short}
            />

            {formik.touched.projectInfo &&
              formik.touched.projectInfo.short &&
              formik.errors.projectInfo?.short ? (
              <div className="text-red-600 font-bold">
                {formik.errors.projectInfo.short}
              </div>
            ) : null}
          </div>
          <div>
            <label className="font-extrabold mb-1 block">অর্থবছর</label>
            <select
              className="input input-bordered w-full"
              id="fiscalYear"
              name="fiscalYear"
              value={formik.values.fiscalYear}
              onChange={formik.handleChange}
            >
              <FiscalYear />
            </select>
            {formik.touched.fiscalYear &&
              formik.touched.fiscalYear &&
              formik.errors.fiscalYear ? (
              <div className="text-red-600 font-bold">
                {formik.errors.fiscalYear}
              </div>
            ) : null}
          </div>
          <div>
            <label className="font-extrabold mb-1 block">মৌসুম</label>
            <select
              className="input input-bordered w-full"
              id="season"
              name="season"
              value={formik.values.season}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <Season />
            </select>
            {formik.touched.season &&
              formik.errors.season ? (
              <div className="text-red-600 font-bold">
                {formik.errors.season}
              </div>
            ) : null}
          </div>
          <div>
            <label className="font-extrabold mb-1 block">বিষয়</label>
            <input
              type="text"
              className="input input-bordered w-full"
              id="subject"
              name="subject"
              onBlur={formik.handleBlur}
              placeholder="প্রশিক্ষণের বিষয় বা ফসল"
              value={formik.values.subject ? formik.values.subject : ""}
              onChange={formik.handleChange}
            />
            {formik.touched.subject &&
              formik.errors.subject ? (
              <div className="text-red-600 font-bold">
                {formik.errors.subject}
              </div>
            ) : null}
          </div>
          <div>
            <label className="font-extrabold mb-1 block">
              উপস্থিত কর্মকর্তা ও গন্যমান্য অতিথি
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              id="guests"
              name="guests"
              onBlur={formik.handleBlur}
              placeholder="কর্মকর্তা ও গন্যমান্য অতিথি"
              onChange={formik.handleChange}
              value={formik.values.guests ? formik.values.guests : ""}
            />
            {formik.touched.guests &&
              formik.errors.guests ? (
              <div className="text-red-600 font-bold">
                {formik.errors.guests}
              </div>
            ) : null}
          </div>
        </div>
        <div className="grid grid-cols-1 mt-3 mb-3 gap-4 lg:grid-cols-3">
          <div>
            <label className="font-extrabold mb-1 block">
              উপস্থিত কৃষক (পুরুষ)
            </label>
            <input
              type="number"
              className="input input-bordered w-full"
              id="farmers.male"
              name="farmers.male"
              onBlur={formik.handleBlur}
              placeholder="কৃষক (পুরুষ)"
              onChange={formik.handleChange}
              value={
                formik.values?.farmers?.male
              }
            />
            {formik.touched.farmers &&
              formik.touched.farmers.male &&
              formik.errors.farmers?.male ? (
              <div className="text-red-600 font-bold">
                {formik.errors.farmers.male}
              </div>
            ) : null}
          </div>
          <div>
            <label className="font-extrabold mb-1 block">
              উপস্থিত কৃষক (নারী)
            </label>
            <input
              type="number"
              className="input input-bordered w-full"
              id="farmers.female"
              name="farmers.female"
              onBlur={formik.handleBlur}
              placeholder="কৃষক (নারী)"
              onChange={formik.handleChange}
              value={
                formik.values.farmers?.female}
            />
            {formik.touched.farmers &&
              formik.touched.farmers.female &&
              formik.errors.farmers?.female ? (
              <div className="text-red-600 font-bold">
                {formik.errors.farmers.female}
              </div>
            ) : null}
          </div>
          <div>
            <label className="font-extrabold mb-1 block">
              উপস্থিত মোট কৃষক
            </label>
            <input
              type="number"
              className="input input-bordered w-full"
              readOnly
              disabled={true}
              value={
                Number.parseInt(formik.values.farmers?.female) + Number.parseFloat(formik.values.farmers?.male)}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="mt-3 input input-bordered w-full">
            <label className="font-extrabold mb-1 block">
              প্রশিক্ষণ শুরু ও শেষের তারিখ
            </label>
            <Datepicker
              id="date"
              name="date"
              value={value}
              onChange={handleValueChange}
              showShortcuts={true}
            />
            {formik.touched.date &&
              formik.errors.date ? (
              <div className="text-red-600 font-bold">
                {formik.errors.date}
              </div>
            ) : null}
          </div>
          <div>
            <label className="font-extrabold mb-1 block">
              প্রশিক্ষণের ছবিসমূহ
            </label>
            <input
              multiple
              name="images"
              type="file"
              className="file-input input-bordered w-full"
              onChange={handleImageChange}
            />
            {selectedImages?.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-3 justify-center">
                {selectedImages.map((image, index) => (
                  <img
                    width={100}
                    key={index}
                    src={image}
                    alt={`Selected Image ${index + 1}`}
                    className="mt-2 max-w-64 h-auto"
                  />
                ))}
              </div>
            )}
            {formik.touched.images &&
              formik.errors.images ? (
              <div className="text-red-600 font-bold">
                {formik.errors.images}
              </div>
            ) : null}
          </div>
        </div>
        <div className="mt-5">
          <label className="font-extrabold mb-1 block">
            মন্তব্য যুক্ত করুন
          </label>
          <textarea
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="comment"
            className="input h-20 input-bordered w-full"
            rows={10}
          ></textarea>
          {formik.touched.comment &&
            formik.errors.comment ? (
            <div className="text-red-600 font-bold">
              {formik.errors.comment}
            </div>
          ) : null}
        </div>
        <button
          type="submit"
          className="btn mt-5 w-full font-extrabold text-white btn-success"
        >
          প্রশিক্ষণ যুক্ত করুন
        </button>
      </form>
    </section >
  );
};

export default AddTraining;
