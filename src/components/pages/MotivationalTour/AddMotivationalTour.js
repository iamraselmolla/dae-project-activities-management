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

const AddMotivationTour = () => {
  const { user } = useContext(AuthContext);
  const { projects: allProjects } = useSelector((state) => state.dae);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [selectedProject, setSelectedProject] = useState({});
  const [loadingMessage, setLoadingMessage] = useState(null);

  const handleRemoveImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imagesArray = files.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => prevImages.concat(imagesArray));
  };

  const validationSchema = Yup.object().shape({
    projectInfo: Yup.object().shape({
      details: Yup.string().required("প্রকল্পের পুরো নাম প্রয়োজন"),
      short: Yup.string().required("প্রকল্পের সংক্ষেপ নাম প্রয়োজন"),
    }),
    time: Yup.object().shape({
      fiscalYear: Yup.string().required(" অর্থবছর সিলেক্ট করুন"),
      season: Yup.string().required("মৌসুম সিলেক্ট করুন"),
      date: Yup.object().shape({
        startDate: Yup.date().required("শুরু তারিখ প্রয়োজন"),
        endDate: Yup.date().required("শেষ তারিখ প্রয়োজন"),
      }),
    }),
    place: Yup.string().required("স্থান প্রয়োজন"),

    farmers: Yup.number().required("কৃষকের সংখ্যা প্রয়োজন").min(0),
    officers: Yup.string().required("অফিসারদের নাম প্রয়োজন"),
    comment: Yup.string().required("মন্তব্য প্রয়োজন")
  });

  const initialValues = {
    projectInfo: {
      details: "",
      short: "",
    },
    place: "",
    time: {
      fiscalYear: '',
      season: '',
      date: {
        startDate: '',
        endDate: ''
      }
    },
    farmers: "",
    officers: "",
    comment: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      if (!user) {
        return toast.error("লগইন করুন প্রথমে।");
      }
      try {
        // setLoading(true);

        // const result = await createMotivationTour(formData);
        // if (result?.status === 200) {
        //   toast.success("মোটিভেশন টুর তথ্য সংরক্ষিত হয়েছে।");
        //   formik.resetForm();
        //   setImages([]);
        // }
      } catch (error) {
        console.error("Motivation tour creation error:", error);
        toast.error("মোটিভেশন টুর তথ্য সংরক্ষণে সমস্যা হয়েছে।");
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
    <section className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <SectionTitle title={"নতুন মোটিভেশন টুর তথ্য যুক্ত করুন"} />
      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div>
            <label className="font-extrabold mb-1 block">
              প্রকল্পের পুরো নাম
            </label>
            <select
              className="input input-bordered w-full"
              id="projectInfo.full"
              name="projectInfo.full"
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
              formik.touched.projectInfo.full &&
              formik.errors.projectInfo?.full ? (
              <div className="text-red-600 font-bold">
                {formik.errors.projectInfo.full}
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
              value={
                selectedProject.name?.short
                  ? selectedProject.name?.short
                  : formik.values.projectInfo?.short
              }
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
              id="time.fiscalYear"
              name="time.fiscalYear"
              value={formik.values.time.fiscalYear}
              onChange={formik.handleChange}
            >
              <FiscalYear />
            </select>
          </div>
          <div>
            <label className="font-extrabold mb-1 block">মৌসুম</label>
            <select
              className="input input-bordered w-full"
              id="time.season"
              name="time.season"
              value={formik.values.time.season}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <Season />
            </select>
            {formik.touched.time && formik.errors.time && (
              <div className="text-red-600 font-bold">
                {formik.errors.time.season}
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
              <div className="text-red-600 font-bold">{formik.errors.place}</div>
            )}
          </div>
          <div>
            <label className="font-extrabold mb-1 block">তারিখ</label>
            <Datepicker
              id="time.date"
              name="time.date"
              value={formik.values.time?.date} // Assuming startDate is the correct property
              onChange={(dates) => formik.setFieldValue('time.date', {
                startDate: dates?.startDate,
                endDate: dates?.endDate,
              })}
              showShortcuts={true}
            />

            {formik.touched.time && formik.errors.time && (
              <div className="text-red-600 font-bold">{formik.errors.time.date}</div>
            )}

          </div>
          <div>
            <label className="font-extrabold mb-1 block">কৃষকের সংখ্যা</label>
            <input
              type="number"
              className="input input-bordered w-full"
              id="farmers"
              name="farmers"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.farmers}
            />
            {formik.touched.farmers && formik.errors.farmers && (
              <div className="text-red-600 font-bold">{formik.errors.farmers}</div>
            )}
          </div>
          <div>
            <label className="font-extrabold mb-1 block">অফিসারদের নাম</label>
            <input
              type="text"
              className="input input-bordered w-full"
              id="officers"
              name="officers"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.officers}
            />
            {formik.touched.officers && formik.errors.officers && (
              <div className="text-red-600 font-bold">{formik.errors.officers}</div>
            )}
          </div>
          <div>
            <label className="font-extrabold mb-1 block">ছবি</label>
            <input
              type="file"
              accept="image/*"
              multiple
              className="file-input input-bordered w-full"
              onChange={handleImageChange}
            />
            <div className="mt-2 flex flex-wrap">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <img src={image} alt={`Image ${index}`} className="w-20 h-20 object-cover mr-2 mb-2" />
                  <button
                    className="absolute top-0 right-0 rounded-full bg-red-600 p-1 text-white"
                    onClick={() => handleRemoveImage(index)}
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-full">
            <label className="font-extrabold mb-1 block">মন্তব্য</label>
            <textarea
              className="textarea textarea-bordered w-full h-24"
              id="comment"
              name="comment"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.comment}
            />
            {formik.touched.comment && formik.errors.comment && (
              <div className="text-red-600 font-bold">{formik.errors.comment}</div>
            )}
          </div>
          <div className="col-span-full">
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader />
                  <span className="ml-2">{loadingMessage}</span>
                </>
              ) : (
                "সংরক্ষণ করুন"
              )}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default AddMotivationTour;
