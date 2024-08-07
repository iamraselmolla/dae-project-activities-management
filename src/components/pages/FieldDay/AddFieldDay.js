import React, { useContext, useEffect, useState } from "react";
import SectionTitle from "../../shared/SectionTitle";
import { useFormik } from "formik";
import * as Yup from "yup";
import Datepicker from "react-tailwindcss-datepicker";
import FiscalYear from "../../shared/FiscalYear";
import Season from "../../shared/Season";
import {
  createAFieldDay,
  getFieldDayDataById,
  updateAFieldDay,
} from "../../../services/userServices";
import toast from "react-hot-toast";
import { AuthContext } from "../../AuthContext/AuthProvider";
import { toBengaliNumber } from "bengali-number";
import { format } from "date-fns";
import { bn } from "date-fns/locale";
import compressAndUploadImage from "../../utilis/compressImages";
import { uploadToCloudinary } from "../../utilis/uploadToCloudinary";
import { makeSureOnline } from "../../shared/MessageConst";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import LoaderWithDynamicMessage from "../../shared/LoaderWithDynamicMessage"

const AddFieldDay = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const fieldDayIdFromUrl = queryParams.get("id");
  const [fieldDayId, setFieldDayId] = useState(fieldDayIdFromUrl);
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });
  const [dateMessage, setDateMessage] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageLinks, setImageLinks] = useState([]);
  const [rawImages, setRawImages] = useState([]);
  const [loadingMessage, setLoadingMessage] = useState(null);
  const { user } = useContext(AuthContext);
  const { projects: allProject
  } = useSelector(state => state.dae)

  const handleImageChange = (e) => {
    const files = e.target.files;
    setRawImages([...rawImages, ...files]);
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
      name: "",
      mobile: "",
    },
    user: {
      id: user?._id,
      username: user?.username
    }
  };

  const validationSchema = Yup.object().shape({
    projectInfo: Yup.object().shape({
      details: Yup.string().required("প্রকল্প সিলেক্ট করুন"),
    }),
    fiscalYear: Yup.string().required("অর্থবছর নির্বাচন করুন"),
    season: Yup.string().required("মৌসুম সিলেক্ট করুন"),
    subject: Yup.string().required("মাঠদিবসের বিষয় সিলেক্ট করুন"),
    guests: Yup.string().required("উপস্থিত কর্মকর্তা ও অতিথিদের তালিকা দিন"),
    // "farmers.male": Yup.number()
    //   .min(18, "পুরুষ কৃষক সংখ্যা ০ বা তার বেশি হতে হবে")
    //   .required("উপস্থিত পুরুষ কৃষক সংখ্যা দিন"),
    // "farmers.female": Yup.number()
    //   .min(1, "নারী কৃষক সংখ্যা ০ বা তার বেশি হতে হবে")
    //   .required("উপস্থিত নারী কৃষক সংখ্যা দিন"),
    date: Yup.string().required("মাঠ দিবসের তারিখ"),
    // images: Yup.array().min(1, "মাঠ দিবসের ছবি দিন"),
  });
  useEffect(() => {
    if (fieldDayId) {
      const fetchFieldDayById = async () => {
        try {
          const result = await getFieldDayDataById(fieldDayId);
          if (result?.status === 200) {
            // Destructure data from result
            const { data } = result?.data;

            // Extract values needed to be set into Formik
            const {
              projectInfo,
              fiscalYear,
              season,
              subject,
              guests,
              farmers,
              date,
              images,
              address,
              comment,
              SAAO,
              user,
            } = data;

            // Set values into Formik using setValues
            formik.setValues({
              projectInfo,
              fiscalYear,
              season,
              subject,
              guests,
              farmers,
              date,
              images,
              address,
              comment,
              SAAO,
              user
            });
            setSelectedImages(images);
            setValue({
              startDate: date,
              endDate: date,
            });
          }
        } catch (err) {
          toast.error(
            "মাঠ দিবসটির তথ্য আনতে সমস্যার সৃষ্টি হচ্ছে। দয়া করে সংশ্লিষ্ট অথরকে জানান।"
          );
        }
      };

      if (navigator.onLine) {
        fetchFieldDayById();
      } else {
        makeSureOnline();
      }
    }
  }, [fieldDayId, user?.username]);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        if (!fieldDayId) {
          if (!formik.values.date) {
            setLoading(false)
            return toast.error("অবশ্যই তারিখ সিলেক্ট করতে হবে।");
          }
          if (!user) {
            setLoading(false)
            return toast.error("আপনাকে অবশ্যই লগিন করতে হবে।");
          }
          if (rawImages?.length < 1) {
            toast.error("অবশ্যই মাঠ দিবসের ছবি দিতে হবে।");
            setLoading(false)
            return;
          }
          values.user.id = user?._id;
          values.user.username = user?.username;
          if (rawImages?.length > 0) {
            setLoadingMessage("ছবি আপ্লোড হচ্ছে");
            const uploadedImageLinks = [];
            for (let i = 0; i < rawImages?.length; i++) {
              setLoadingMessage(
                `${toBengaliNumber(i + 1)} নং ছবি কম্প্রেসড চলছে`
              );

              const compressedImage = await compressAndUploadImage(
                rawImages[i]
              );
              setLoadingMessage(`${toBengaliNumber(i + 1)} নং ছবি আপ্লোড চলছে`);
              const result = await uploadToCloudinary(
                compressedImage,
                "fieldday"
              );
              uploadedImageLinks.push(result);
              setImageLinks((prevImageLinks) => [...prevImageLinks, result]);
            }
            setImageLinks(uploadedImageLinks); // Set all image links at once
            values.images = uploadedImageLinks;
            setLoadingMessage("ছবি আপ্লোড শেষ হয়েছে");

            setLoadingMessage("মাঠ দিবস তথ্য আপ্লোড হচ্ছে");
            const result = await createAFieldDay(values);
            if (result?.status === 200) {
              toast.success(result?.data?.message);
              setLoadingMessage("মাঠ দিবস তথ্য আপ্লোড শেষ হয়েছে");
              setLoading(false);
              resetForm();
              setRawImages([]);
              setValue({
                endDate: null,
                startDate: null,
              });
              setSelectedImages([]);
            }
          }
        } else {
          try {
            const result = await updateAFieldDay(fieldDayId, formik.values);
            if (result?.status === 200) {
              toast.success(result?.data?.message);
              setLoading(false);
            }
          } catch (err) {
            toast.error("মাঠ দিবসটির তথ্য আপডেট করতে সমস্যা হচ্ছে।");
          }
          setLoading(false);
        }
      } catch (err) {
        toast.error(err?.response?.data?.message);
        console.log(err, "error");
        setLoading(false);
      }
      // Access the season field value correctly
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
          SAAO: {
            name: user?.SAAO?.name,
            mobile: user?.SAAO?.mobile,
          },
          address: {
            ...formik.values.address,
            block: user?.blockB,
            union: user?.unionB,
          },
        });
      }
    }
  };

  const formatDate = (date) => {
    if (!date) return;
    const dayName = format(new Date(date?.startDate), "EEEE", { locale: bn });

    if (dayName === "শুক্রবার" || dayName === "শনিবার") {
      return (
        <span className="text-red-600 font-extrabold">
          আপনি সাপ্তাহিক ছুটির দিনে গ্রুপ সভার তারিখ সিলেক্ট করেছেন!
        </span>
      );
    }
    return dayName;
  };

  const handleValueChangeofDate = (newValue) => {
    setValue(newValue);

    // Update the 'date' field in formik.values correctly
    formik.setFieldValue("date", newValue.startDate);

    const selectedDate = new Date(newValue.startDate);
    const today = new Date();
    if (selectedDate > today) {
      setDateMessage("আপনি ভবিষ্যতের তারিখ নির্বাচন করেছেন!");
    } else {
      setDateMessage(null);
    }
  };
  return (
    <section className="mx-auto bg-white max-w-7xl px-2 sm:px-6 lg:px-8">
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
                id="projectInfo.details"
                name="project.details"
                value={formik.values.projectInfo?.details}
                onChange={handleSelectChange}
                onBlur={formik.handleBlur}
              >
                <option value="" label="প্রকল্প সিলেক্ট করুন" />
                {allProject &&
                  allProject?.length > 0 &&
                  allProject?.map((single) => (
                    <option
                      key={single?.name?.details}
                      value={single?.name?.details}
                      label={single?.name?.details}
                    />
                  ))}
              </select>
              {formik.touched.projectInfo?.details &&
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
                name="projectInfo.short"
                disabled={true}
                readOnly
                placeholder="প্রকল্পের সংক্ষেপ নাম"
                value={formik.values.projectInfo?.short}
              />

              {formik.touched.projectInfo &&
                formik.touched.projectInfo.short &&
                formik.errors.projectInfo?.short && (
                  <div className="text-red-600 font-bold">
                    {formik.errors.projectInfo.short}
                  </div>
                )}
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
                value={formik.values.season}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <Season />
              </select>
              {formik.touched.season && formik.errors.season && (
                <div className="text-red-600 font-bold">
                  {formik.errors.season}
                </div>
              )}
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
                value={formik.values.subject}
              />
              {formik.touched.subject && formik.errors.subject && (
                <div className="text-red-600 font-bold">
                  {formik.errors.subject}
                </div>
              )}
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
                value={formik.values.guests}
              />
              {formik.touched.guests && formik.errors.guests && (
                <div className="text-red-600 font-bold">
                  {formik.errors.guests}
                </div>
              )}
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
                value={formik.values.farmers.male}
              />
              {formik.touched.farmers?.male && formik.errors.farmers?.male && (
                <div className="text-red-600 font-bold">
                  {formik.errors.farmers.male}
                </div>
              )}
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
                value={formik.values.farmers.female}
              />
              {formik.touched.farmers?.female &&
                formik.errors.farmers?.female && (
                  <div className="text-red-600 font-bold">
                    {formik.errors.farmers.female}
                  </div>
                )}
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
              {formik.touched.date && formik.errors.date && (
                <div className="text-red-600 font-bold">
                  {formik.errors.date}
                </div>
              )}
            </div>
            <div>
              <label className="font-extrabold mb-1 block">
                মাঠ দিবসের দিন
              </label>
              <div className="input input-bordered w-full">
                {formatDate(value)}
              </div>
              {dateMessage && <p className="text-red-600">{dateMessage}</p>}
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
                value={formik.values.address?.village}
              />
            </div>
            <div>
              <label className="font-extrabold mb-1 block">ব্লকের নাম</label>
              <input
                className="input input-bordered w-full"
                id="address.block"
                name="address.block"
                value={user?.blockB}
                disabled={true}
              />
              {formik.touched.address?.block &&
                formik.errors.address?.block && (
                  <div className="text-red-600 font-bold">
                    {formik.errors.address.block}
                  </div>
                )}
            </div>
            <div>
              <label className="font-extrabold mb-1 block">ইউনিয়নের নাম</label>
              <input
                className="input input-bordered w-full"
                value={user?.unionB}
                disabled={true}
              />
              {formik.touched.address?.union &&
                formik.errors.address?.union && (
                  <div className="text-red-600 font-bold">
                    {formik.errors.address.union}
                  </div>
                )}
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
                disabled={true}
                placeholder="এসএএও নাম"
                value={user?.SAAO?.name}
              />
              {formik.touched.SAAO?.name && formik.errors.SAAO?.name && (
                <div className="text-red-600">{formik.errors.SAAO?.name}</div>
              )}
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
                disabled={true}
                value={toBengaliNumber(user?.SAAO?.mobile)}
              />
              {formik.touched.SAAO?.mobile && formik.errors.SAAO?.mobile && (
                <div className="text-red-600">{formik.errors.SAAO?.mobile}</div>
              )}
            </div>
          </div>

          <div>
            <label className="font-extrabold mb-1 block">
              মাঠ দিবসের ছবিসমূহ
            </label>
            <input
              multiple
              disabled={fieldDayId ? true : false}
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

          <div className="mt-5">
            <label className="font-extrabold mb-1 block">
              মন্তব্য যুক্ত করুন
            </label>
            <textarea
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.comment}
              name="comment"
              className="textarea textarea-bordered w-full"
              placeholder="মন্তব্য"
              rows="3"
            ></textarea>
          </div>
          {!loading && (
            <button
              type="submit"
              className="btn mt-5 bg-green-600 hover:bg-green-700 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {fieldDayId
                ? " মাঠ দিবসের তথ্য এডিট করুন"
                : " মাঠ দিবসের তথ্য যুক্ত করুন"}
            </button>
          )}
        </form>
        {loading && (
          <LoaderWithDynamicMessage message={loadingMessage} />
        )}
      </div>
    </section>
  );
};

export default AddFieldDay;
