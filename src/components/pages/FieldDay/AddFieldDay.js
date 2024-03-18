import React, { useContext, useEffect, useState } from "react";
import SectionTitle from "../../shared/SectionTitle";
import { useFormik } from "formik";
import * as Yup from "yup";
import Datepicker from "react-tailwindcss-datepicker";
import FiscalYear from "../../shared/FiscalYear";
import Season from "../../shared/Season";
import { getAllProjects, getUser } from "../../../services/userServices";
import toast from "react-hot-toast";
import { AuthContext } from "../../AuthContext/AuthProvider";
import { toBengaliNumber } from "bengali-number";

const AddFieldDay = () => {
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [findBlock, setFindBlock] = useState(null);
  const [findUnion, setFindUnion] = useState(null);
  const [allProject, setAllProjects] = useState([]);
  const { user } = useContext(AuthContext)

  const handleImageChange = (e) => {
    const files = e.target.files;
    const imageFiles = [];

    for (let i = 0; i < files.length; i++) {
      // Check if the selected file is an image
      if (files[i].type.startsWith("image/")) {
        imageFiles.push(URL.createObjectURL(files[i]));
      }
    }

    // Update the selected images
    setSelectedImages(imageFiles);
  };

  const handleValueChangeofDate = (newValue) => {
    setValue(newValue);
  };
  const initialValues = {
    projectInfo: {
      details: "",
      short: "",
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
    address: {
      village: "",
      block: "",
      union: "",
    },
    comment: "",
    SAAO: {
      name: '',
      mobile: '',
    }
  };
  const validationSchema = Yup.object().shape({
    // project: Yup.object().shape({
    //     full: Yup.string().required('প্রকল্প সিলেক্ট করুন'),
    // }),
    // season: Yup.string().required('মৌসুম সিলেক্ট করুন'),
    // subject: Yup.string().required('মাঠদিবসের বিষয় সিলেক্ট করুন'),
    // guests: Yup.string().required('উপস্থিত কর্মকর্তা ও অতিথিদের তালিকা দিন'),
    // farmers: Yup.object().shape({
    //     male: Yup.number().min(0, 'Male farmers should be 0 or more').required('উপস্থিত পুরুষ কৃষক সংখ্যা'),
    //     female: Yup.number().min(0, 'Female farmers should be 0 or more').required('উপস্থিত নারী কৃষক সংখ্যা'),
    // }),
    // date: Yup.string().required('মাঠ দিবসের তারিখ'),
    // images: Yup.array().min(1, 'মাঠ দিবসের ছবি দিন'),
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
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      values.date = value.startDate;
      values.address.block = findBlock;
      values.address.union = findUnion;
      values.season = selectedOption; // Access the season field value correctly
      values.project.full = formik.values.project.full;
      // Handle form submission logic here
    },
  });
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
            short: findProject?.name?.short,
          },
        });
      }
    }
  };


  return (
    <section className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <SectionTitle title={"নতুন মাঠ দিবসের তথ্য যুক্ত করুন"} />
      <div className="mt-3">
        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div>
              <label className="font-extrabold mb-1 block">
                প্রকল্পের পুরো নাম
              </label>
              <select
                className="input input-bordered w-full"
                id="projectInfo.full"
                name="project.full"
                value={formik.values.project.full}
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
              {formik.touched.project &&
                formik.touched.project.full &&
                formik.errors.project?.full ? (
                <div className="text-red-600 font-bold">
                  {formik.errors.project.full}
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
                id="project.short"
                name="project.short"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder="প্রকল্পের সংক্ষেপ নাম"
                value={
                  formik.values.project ? formik.values.project?.short : ""
                }
              />

              {formik.touched.project &&
                formik.touched.project.short &&
                formik.errors.project?.short ? (
                <div className="text-red-600 font-bold">
                  {formik.errors.project.short}
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
            </div>
            <div>
              <label className="font-extrabold mb-1 block">মৌসুম</label>
              <select
                className="input input-bordered w-full"
                id="season"
                name="season"
                value={selectedOption}
                onChange={handleSelectChange}
                onBlur={formik.handleBlur}
              >
                <Season />
              </select>
            </div>
            <div>
              <label className="font-extrabold mb-1 block">বিষয়</label>
              <input
                type="text"
                className="input input-bordered w-full"
                id="subject"
                name="subject"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="মাঠদিবসের বিষয় বা ফসল"
              // value={formik.values.subject ? formik.values.subject : ''}
              />
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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="কর্মকর্তা ও গন্যমান্য অতিথি"
              // value={formik.values.guests ? formik.values.guests : ''}
              />
            </div>
            <div>
              <label className="font-extrabold mb-1 block">
                উপস্থিত কৃষক (পুরুষ)
              </label>
              <input
                type="number"
                className="input input-bordered w-full"
                id="farmers.male"
                name="farmers.male"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="কৃষক (পুরুষ)"
              // value={formik.values.farmers.male ? formik.values.farmers.male : ''}
              />
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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="কৃষক (নারী)"
              // value={formik.values.farmers.female ? formik.values.farmers.female : ''}
              />
              {/* {formik.touched.name && formik.touched.name.details && formik.errors.name?.details ? (
                                <div className='text-red-600 font-bold'>{formik.errors.name.details}</div>
                            ) : null} */}
            </div>
            <div>
              <label className="font-extrabold mb-1 block">
                মাঠদিবসের তারিখ
              </label>
              <Datepicker
                asSingle={true}
                id="date"
                onChange={handleValueChangeofDate}
                name="date"
                value={value}
                showShortcuts={true}
              />
            </div>

            <div>
              <label className="font-extrabold mb-1 block">
                মাঠ দিবসের ছবিসমূহ
              </label>
              <input
                multiple
                name="images"
                type="file"
                className="file-input input-bordered w-full"
                onChange={handleImageChange} // Add the onChange event
              />
              {/* Display the selected images */}
              {selectedImages?.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-3 justify-center">
                  {selectedImages?.map((image, index) => (
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
            </div>
          </div>

          <div className="grid mt-3 gap-4 mb-3 grid-cols-1 lg:grid-cols-3">
            <div>
              <label className="font-extrabold mb-1 block">গ্রামের নাম</label>
              <input
                type="text"
                className="input input-bordered w-full"
                id="address.village"
                name="address.village"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder="গ্রাম"
                value={
                  formik.values.address ? formik.values.address?.village : ""
                }
              />
            </div>
            <div>
              <label className="font-extrabold mb-1 block">ব্লকের নাম</label>
              <input
                className="input input-bordered w-full"
                id="address.block"
                name="address.block"
                value={user?.blockB}
                disabled
              />

              {formik.touched.address &&
                formik.touched.address.block &&
                formik.errors.address?.block ? (
                <div className="text-red-600 font-bold">
                  {formik.errors.address.block}
                </div>
              ) : null}
            </div>

            <div>
              <label className="font-extrabold mb-1 block">ইউনিয়নের নাম</label>
              <input
                className="input input-bordered w-full"
                value={user?.unionB}
                disabled={true}
              />
              {formik.touched.address &&
                formik.touched.address.union &&
                formik.errors.address?.union ? (
                <div className="text-red-600 font-bold">
                  {formik.errors.address.union}
                </div>
              ) : null}
            </div>
          </div>


          <div className="grid grid-cols-1 gap-4 my-5 lg:grid-cols-2">
            <div>
              <label className="font-extrabold mb-1 block">এসএএও এর নাম</label>
              <input
                type="text"
                className="input input-bordered w-full"
                id="SAAO.name"
                name="SAAO.name"
                readOnly
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
                className="input input-bordered w-full"
                id="SAAO.mobile"
                name="SAAO.mobile"
                placeholder="এসএএও মোবাইল"
                readOnly
                value={toBengaliNumber(user?.SAAO?.mobile)}
              />
              {formik.touched.SAAO?.mobile && formik.errors.SAAO?.mobile ? (
                <div className="text-red-600">{formik.errors.SAAO?.mobile}</div>
              ) : null}
            </div>
          </div>
          <div className="mt-5">
            <label className="font-extrabold mb-1 block">
              মন্তব্য যুক্ত করুন
            </label>
            <textarea
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.comment}
              id="comment"
              name="comment"
              className="input h-20 input-bordered w-full"
              rows={10}
            ></textarea>
          </div>

          <button
            type="submit"
            className="btn mt-5 w-full font-extrabold text-white btn-success"
          >
            প্রকল্প যুক্ত করুন
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddFieldDay;
