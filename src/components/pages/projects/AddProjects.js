import React, { useContext, useState, useEffect } from "react";
import SectionTitle from "../../shared/SectionTitle";
import { useFormik } from "formik";
import * as Yup from "yup";
import Datepicker from "react-tailwindcss-datepicker";
import { format } from "date-fns";
import { bn } from "date-fns/locale";
import toast from "react-hot-toast";
import { FaTimes } from "react-icons/fa";
import { AuthContext } from "../../AuthContext/AuthProvider";
import { toBengaliNumber } from "bengali-number";
import { createAGroup, getGroupInfoById } from "../../../services/userServices";
import { uploadToCloudinary } from "../../utilis/uploadToCloudinary";
import Loader from "../../shared/Loader";
import compressAndUploadImage from "../../utilis/compressImages";
import { useLocation } from "react-router-dom"
import { makeSureOnline } from "../../shared/MessageConst";
const AddGroupMeeting = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const groupIdFromParams = queryParams.get("id");
  const { user } = useContext(AuthContext);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageLinks, setImageLinks] = useState([]);
  const [rawImages, setRawImages] = useState([]);
  const [loadingMessage, setLoadingMessage] = useState(null);
  const [dateMessage, setDateMessage] = useState(null);
  const [groupId, setGroupId] = useState(groupIdFromParams)
  const [fetchedGroupInfo, setFetchedGroupInfo] = useState(null);

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  const initialValues = {
    groupInfo: {
      name: "",
      place: "",
      mobile: "",
    },
    time: {
      date: "",
      day: "",
    },
    address: {
      village: "",
      block: user?.blockB || "",
      union: user?.unionB || "",
    },
    SAAO: {
      name: user?.SAAO?.name || "",
      mobile: toBengaliNumber(user?.SAAO?.mobile) || "",
    },
    discussion: "",
    images: [],
    username: user?.username || "",
  };

  const validationSchema = Yup.object({
    groupInfo: Yup.object({
      name: Yup.string().required("কৃষক গ্রুপের নাম প্রয়োজন"),
      place: Yup.string().required("স্থানের নাম দিন"),
      mobile: Yup.string()
        .required("মোবাইল নম্বর দিন")
        .matches(/^[0-9]{11}$/, "মোবাইল নম্বর ১১ টি সংখ্যার হতে হবে"),
    }),
    address: Yup.object({
      village: Yup.string().required("গ্রামের নাম দিন"),
    }),
    discussion: Yup.string().required("আলোচ্য বিষয় দিন"),
    images: Yup.array().required("অন্তত একটি ছবি আপ্লোড দিন"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      if (!values.time.date || !values.time.day) {
        return toast.error("অবশ্যই আপনাকে তারিখ সিলেক্ট করতে হবে");
      }
      setLoading(true);
      values.SAAO.name = user?.SAAO.name;
      values.SAAO.mobile = user?.SAAO.mobile;
      values.username = user?.username;
      values.address.block = user?.blockB;
      values.address.union = user?.unionB;

      if (!values.username || !values.SAAO?.name || !values?.SAAO?.mobile || !values?.address?.block || !values?.address?.union) {
        setLoading(false)
        return toast.error("লগিনজনিত কোনো সমস্যা হচ্ছে। দয়া করে সংশ্লিষ্ট ব্যক্তিকে জানান");

      }
      try {
        if (rawImages?.length > 0) {
          setLoadingMessage("ছবি আপ্লোড হচ্ছে");
          const uploadedImageLinks = [];
          for (let i = 0; i < rawImages?.length; i++) {
            setLoadingMessage(
              `${toBengaliNumber(i + 1)} নং ছবি কম্প্রেসড চলছে`
            );

            const compressedImage = await compressAndUploadImage(rawImages[i]);
            setLoadingMessage(`${toBengaliNumber(i + 1)} নং ছবি আপ্লোড চলছে`);
            const result = await uploadToCloudinary(
              compressedImage,
              "dae-group-meeting"
            );
            uploadedImageLinks.push(result);
            setImageLinks((prevImageLinks) => [...prevImageLinks, result]);
          }
          setImageLinks(uploadedImageLinks); // Set all image links at once
          values.images = uploadedImageLinks;
          setLoadingMessage("ছবি আপ্লোড শেষ হয়েছে");

          setLoadingMessage("কৃষক গ্রুপ তথ্য আপ্লোড হচ্ছে");
          console.log(values);
          const result = await createAGroup(values);
          if (result?.status === 200) {
            toast.success(result?.data?.message);
            setLoading(false);
            setLoadingMessage("কৃষক গ্রুপ তথ্য আপ্লোড শেষ হয়েছে");
            resetForm();
            setImageLinks([]);
            setRawImages([]);
            setImages([]);
          }
        }
      } catch (err) {
        toast.error(err?.response?.data?.message);
        console.log(err, "error");
        setLoading(false);
      }
    },
  });

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
    formik.setFieldValue("images", updatedImages);
  };

  const renderImages = () => {
    return (
      <div>
        {images?.length > 0 && (
          <>
            <h3 className="font-bold mb-2">ছবি প্রিভিউ</h3>
            <div className="flex gap-3">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`Image ${index + 1}`}
                    className="w-32 border-success border-4 h-32 mr-2 mb-2 object-cover"
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
          </>
        )}
      </div>
    );
  };

  const handleDateChange = (date) => {
    formik.setFieldValue("time.date", date);
    formik.setFieldValue("time.day", formatDate(date));
    const selectedDate = new Date(date?.startDate);
    const today = new Date();

    if (selectedDate > today) {
      setDateMessage("আপনি ভবিষ্যতের তারিখ নির্বাচন করেছেন!");
    } else {
      setDateMessage(null);
    }
  };

  const formatDate = (date) => {
    if (!date) return;
    const dayName = format(new Date(date.startDate), "EEEE", { locale: bn });
    if (dayName === "শুক্রবার" || dayName === "শনিবার") {
      return (
        <span className="text-red-600 font-extrabold">
          আপনি সাপ্তাহিক ছুটির দিনে গ্রুপ সভার তারিখ সিলেক্ট করেছেন!
        </span>
      );
    }

    return dayName;
  };

  // Fetch Group Data by Group ID
  useEffect(() => {
    if (navigator.onLine) {
      if (groupId) {
        const getGroupDataById = async () => {
          try {
            const result = await getGroupInfoById(groupId);
            if (result?.status === 200) {
              console.log(result)
              // Assuming the group info is stored in result.data.groupInfo
              setFetchedGroupInfo(result?.data?.data);

            }
          } catch (err) {
            toast.error(
              "ডিএই কৃষক গ্রুপের তথ্য পেতে সমস্যার সৃষ্টি হয়েছে। দয়া করে সংশ্লিষ্ট ব্যক্তিকে জানান।"
            );
          }
        };
        getGroupDataById();
      }
    }
    else {
      makeSureOnline()
    }
  }, [groupId]);

  const expandGroupInfo = (groupInfo) => {
    if (!groupInfo) return;

    const expandedValues = {
      groupInfo: {
        name: {
          details: groupInfo.name.details,
          short: groupInfo.name.short,
        },
        place: groupInfo.place,
        mobile: groupInfo.mobile,
      },
      address: {
        village: groupInfo.address.village,
        block: groupInfo.address.block,
        union: groupInfo.address.union,
      },
      time: {
        date: groupInfo.time.date,
        day: groupInfo.time.day,
      },
      SAAO: {
        name: groupInfo.SAAO.name,
        mobile: groupInfo.SAAO.mobile,
      },
      discussion: groupInfo.discussion,
      images: groupInfo.images,
      username: groupInfo.username,
    };

    formik.setValues(expandedValues);
  };

  useEffect(() => {
    if (fetchedGroupInfo) {
      expandGroupInfo(fetchedGroupInfo);
    }
  }, [fetchedGroupInfo]);

  return (
    <section className={`mx-auto max-w-7xl px-2 sm:px-6 lg:px-8`}>
      <SectionTitle title={"ডিএই কৃষক গ্রুপ সভার তথ্য যুক্ত করুন"} />
      <div className="mt-2">
        <form
          className={`${loading ? "section-disabled" : ""}`}
          onSubmit={formik.handleSubmit}
        >
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div>
              <label className="font-extrabold mb-1 block">
                কৃষক গ্রুপের নাম
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                id="groupInfo.name.details"
                name="groupInfo.name.details"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder="কৃষক গ্রুপের নাম"
                value={formik.values.groupInfo.name.details}
              />
              {formik.touched.groupInfo?.name?.details &&
                formik.errors.groupInfo?.name?.details ? (
                <div className="text-red-600">
                  {formik.errors.groupInfo.name.details}
                </div>
              ) : null}
            </div>
            <div>
              <label className="font-extrabold mb-1 block">স্থান</label>
              <input
                type="text"
                className="input input-bordered w-full"
                id="groupInfo.place"
                name="groupInfo.place"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder="স্থান"
                value={formik.values.groupInfo.place}
              />
              {formik.touched.groupInfo?.place &&
                formik.errors.groupInfo?.place ? (
                <div className="text-red-600">
                  {formik.errors.groupInfo.place}
                </div>
              ) : null}
            </div>
            <div>
              <label className="font-extrabold mb-1 block">
                মোবাইল নম্বর
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                id="groupInfo.mobile"
                name="groupInfo.mobile"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder="মোবাইল নম্বর"
                value={formik.values.groupInfo.mobile}
              />
              {formik.touched.groupInfo?.mobile &&
                formik.errors.groupInfo?.mobile ? (
                <div className="text-red-600">
                  {formik.errors.groupInfo.mobile}
                </div>
              ) : null}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 mt-4 lg:grid-cols-3">
            <div>
              <label className="font-extrabold mb-1 block">গ্রাম</label>
              <input
                type="text"
                className="input input-bordered w-full"
                id="address.village"
                name="address.village"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder="গ্রামের নাম"
                value={formik.values.address.village}
              />
              {formik.touched.address?.village &&
                formik.errors.address?.village ? (
                <div className="text-red-600">
                  {formik.errors.address.village}
                </div>
              ) : null}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 mt-4 lg:grid-cols-3">
            <div className="flex flex-col">
              <label className="font-extrabold mb-1 block">
                সভার তারিখ নির্বাচন করুন
              </label>
              <Datepicker
                color="red"
                locale="bn"
                onSelect={handleDateChange}
                selected={formik.values.time.date}
                dateFormat="DD/MM/YYYY"
                maxDate={new Date()}
              />
              {formik.touched.time?.date && dateMessage && (
                <div className="text-red-600">{dateMessage}</div>
              )}
            </div>
            <div>
              <label className="font-extrabold mb-1 block">
                দিন (সাপ্তাহিক ছুটি দিন নির্বাচন করা হলে আবার নির্বাচন করুন)
              </label>
              <div>{formik.values.time.day}</div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 mt-4 lg:grid-cols-3">
            <div>
              <label className="font-extrabold mb-1 block">
                গ্রুপ সভার সময়
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                id="groupMeetingTime"
                name="groupMeetingTime"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder="গ্রুপ সভার সময়"
                value={formik.values.groupMeetingTime}
              />
              {formik.touched.groupMeetingTime &&
                formik.errors.groupMeetingTime ? (
                <div className="text-red-600">
                  {formik.errors.groupMeetingTime}
                </div>
              ) : null}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 mt-4 lg:grid-cols-3">
            <div>
              <label className="font-extrabold mb-1 block">
                আলোচ্য বিষয়
              </label>
              <textarea
                className="input input-bordered w-full"
                id="discussion"
                name="discussion"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder="আলোচ্য বিষয়"
                value={formik.values.discussion}
              />
              {formik.touched.discussion && formik.errors.discussion ? (
                <div className="text-red-600">
                  {formik.errors.discussion}
                </div>
              ) : null}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 mt-4 lg:grid-cols-3">
            <div className="flex flex-col">
              <label className="font-extrabold mb-1 block">গ্রুপের ছবি</label>
              <input
                type="file"
                accept="image/*"
                multiple
                className="input w-full"
                id="images"
                name="images"
                onChange={handleImageChange}
              />
              {formik.touched.images && formik.errors.images ? (
                <div className="text-red-600">{formik.errors.images}</div>
              ) : null}
            </div>
          </div>
          {renderImages()}
          <div className="flex justify-center items-center mt-8">
            <button
              type="submit"
              className={`btn ${loading ? "btn-disabled cursor-not-allowed" : "btn-primary"
                }`}
              disabled={loading}
            >
              {loading ? <Loader /> : "সাবমিট"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddGroupMeeting;
