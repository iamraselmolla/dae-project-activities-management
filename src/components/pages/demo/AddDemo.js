import React, { useContext, useEffect, useState } from "react";
import SectionTitle from "../../shared/SectionTitle";
import { useFormik } from "formik";
import * as Yup from "yup";
import Season from "../../shared/Season";
import FiscalYear from "../../shared/FiscalYear";
import Datepicker from "react-tailwindcss-datepicker";
import {
  createDemo,
  editDemobyId,
  findDemoById,
  getAllProjects,
} from "../../../services/userServices";
import toast from "react-hot-toast";
import getFiscalYear from "../../shared/commonDataStores";
import { toBengaliNumber } from "bengali-number";
import { AuthContext } from "../../AuthContext/AuthProvider";
import { makeSureOnline } from "../../shared/MessageConst";
import Loader from "../../shared/Loader";
import { useLocation } from "react-router-dom";

const AddDemo = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const demoIdFromUrl = queryParams.get("id");
  const [demoId, setDemoId] = useState(demoIdFromUrl);
  const [selectedProject, setSelectedProject] = useState({});
  const [allProject, setAllProjects] = useState([]);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [fethedImgLink, setimgLink] = useState();
  const [imageRawLink, setImageRawLink] = useState([]);
  const [datePickers, setDatePickers] = useState({
    bopon: {
      startDate: null,
      endDate: null,
    },
    ropon: {
      startDate: null,
      endDate: null,
    },
    korton: {
      startDate: null,
      endDate: null,
    },
  });
  const handleDatePickerValue = (picker, selectedDate) => {
    // Use a copy of the state to avoid modifying the state directly
    const updatedDatePickers = { ...datePickers };

    // Update the selected date picker with the new value
    updatedDatePickers[picker] = selectedDate;

    // Update the state with the new date pickers object
    setDatePickers(updatedDatePickers);
  };

  const handleSelectChange = (e) => {
    if (e.target.value) {
      const findProject = allProject?.find(
        (s) => s?.name?.details === e.target.value
      );
      setSelectedProject(findProject);
    }
  };

  const initialValues = {
    projectInfo: {
      full: "",
      short: "",
    },
    demoTime: {
      fiscalYear: "",
      season: "",
    },

    farmersInfo: {
      name: "",
      fatherOrHusbandName: "",
    },
    address: {
      village: "",
      block: "",
      union: "",
    },
    SAAO: {
      name: "",
      mobile: "",
    },
    numbersInfo: {
      NID: "",
      BID: "",
      mobile: "",
      agriCard: "",
    },
    demoInfo: {
      crop: "",
      variety: "",
      tech: "",
      area: "",
    },
    production: {
      productionPerHector: "",
      totalProduction: "",
      sidePlotProduction: "",
    },

    demoDate: {
      bopon: "",
      ropon: "",
      korton: "",
    },
    comment: {
      farmersReview: "",
      overallComment: "",
    },
    SAAO: {
      name: "",
      mobile: "",
    },
    demoImages: [],
    username: user?.username,
  };
  const validationSchema = Yup.object({
    demoTime: Yup.object().shape({
      fiscalYear: Yup.string().required("অর্থবছর সিলেক্ট করুন"),
      season: Yup.string().required("মৌসুম সিলেক্ট করুন"),
    }),
    farmersInfo: Yup.object().shape({
      name: Yup.string().required("কৃষকের নাম দিন"),
    }),
    demoInfo: Yup.object().shape({
      crop: Yup.string().required("প্রদর্শনীর নাম / ফসলের নাম লিখুন"),
    }),
    numbersInfo: Yup.object().shape({
      mobile: Yup.string()
        .required("মোবাইল নম্বর দিন")
        .matches(/^[0-9]{11}$/, "মোবাইল নম্বর ১১ টি সংখ্যার হতে হবে"),
    }),
    address: Yup.object().shape({
      village: Yup.string().required("গ্রামের নাম দিন"),
    }),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      values.demoDate.bopon = datePickers.bopon.startDate;
      values.demoDate.ropon = datePickers.ropon.startDate;
      values.demoDate.korton = datePickers.korton;
      if (!demoId) {
        values.address.block = user?.blockB;
        values.address.union = user?.unionB;
        values.demoTime.season = formik.values.demoTime.season;
        values.projectInfo.full = selectedProject.name.details;
        values.projectInfo.short = selectedProject.name.short;
        values.username = user?.username;
        values.SAAO = user?.SAAO;
        if (!values.projectInfo.full || !values.projectInfo.short) {
          setLoading(false);
          return toast.error("আপনাকে অবশ্যই প্রকল্প সিলেক্ট করতে হবে।");
        }
        if (!values.username) {
          setLoading(false);
          toast.error(
            "লগিনজনিত সমস্যা পাওয়া গিয়েছে। দয়া করে সংশ্লিষ্ট ব্যক্তিকে অবহিত করুন"
          );
        }

        // Handle form submission logic here

        if (navigator.onLine) {
          try {
            const result = await createDemo(values);
            if (result?.status === 200) {
              toast.success(result?.data?.message);
              resetForm();
              setDatePickers({
                bopon: {
                  startDate: null,
                  endDate: null,
                },
                ropon: {
                  startDate: null,
                  endDate: null,
                },
                korton: {
                  startDate: null,
                  endDate: null,
                },
              });
              setLoading(false);
            }
          } catch (err) {
            toast.error("প্রদর্শনীর তথ্য যুক্ত করতে সমস্যার সৃষ্টি হচ্ছে।");
            setLoading(false);
          }
        } else {
          makeSureOnline();
          setLoading(false);
        }
      } else {
        try {
          const result = await editDemobyId(demoId, values);
          if (result?.status === 200) {
            toast.success(result?.data?.message);
            setLoading(false);
          }
        } catch (err) {
          toast.error(
            "প্রদর্শনীর তথ্য আপডেট করতে সমস্যা হচ্ছে। দয়া করে সংশ্লিষ্ট ব্যক্তিকে অবহিত করুন"
          );
          setLoading(false);
        }
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
          toast.error("প্রকল্পের তথ্য পাওয়া যায়নি");
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
      makeSureOnline();
    }
  }, []);
  useEffect(() => {
    const fetchDemoId = async () => {
      if (!demoId) return;

      try {
        const result = await findDemoById(demoId);
        const { data } = result?.data || {};

        formik.setValues({
          ...data,
        });

        const { demoDate } = data || {};
        setDatePickers({
          bopon: {
            startDate: demoDate?.bopon,
            endDate: demoDate?.bopon,
          },
          ropon: {
            startDate: demoDate?.ropon,
            endDate: demoDate?.ropon,
          },
          korton: {
            startDate: demoDate?.korton?.startDate,
            endDate: demoDate?.korton?.endDate,
          },
        });

        const projectName = data?.projectInfo?.full;
        if (projectName) {
          const foundProject = allProject.find(
            (proj) => proj.name.details === projectName
          );
          if (foundProject) {
            setSelectedProject(foundProject);
          }
        }
        setimgLink(result?.data?.data?.demoImages);
      } catch (err) {
        toast.error(
          "প্রদর্শনীর তথ্য সার্ভার থেকে আনতে সমস্যার সৃষ্টি হচ্ছে। দয়া করে সংশ্লিষ্ট ব্যক্তিতে অবহিত করুন।"
        );
      }
    };

    if (navigator.onLine) {
      fetchDemoId();
    } else {
      makeSureOnline();
    }
  }, [demoId, allProject]);

  useEffect(() => {
    if (fethedImgLink?.length > 0) {
      for (const image of fethedImgLink) {
        image.image?.map((single) =>
          setImageRawLink([...imageRawLink, single])
        );
      }
    }
  }, [demoId, fethedImgLink]);

  return (
    <section className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <SectionTitle title={"প্রকল্পের প্রদর্শনীর তথ্য যুক্ত করুন"} />
      <div className="mt-2">
        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div>
              <label className="font-extrabold mb-1 block">
                প্রকল্পের পুরো নাম
              </label>
              <select
                disabled={demoId ? true : false}
                className="input input-bordered w-full"
                id="projectInfo.full"
                name="projectInfo.full"
                value={selectedProject?.name?.details}
                onChange={handleSelectChange}
                onBlur={formik.handleBlur}
              >
                <option value="" label="প্রকল্প সিলেক্ট করুন" />
                {allProject && allProject?.length > 0 && (
                  <>
                    {allProject.map((single) => (
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
                disabled={demoId ? true : false}
                className="input input-bordered w-full"
                id="demoTime.fiscalYear"
                name="demoTime.fiscalYear"
                value={formik.values.demoTime.fiscalYear}
                onChange={formik.handleChange}
                defaultValue={toBengaliNumber(getFiscalYear())}
              >
                <FiscalYear />
              </select>
            </div>
            <div>
              <label className="font-extrabold mb-1 block">মৌসুম</label>
              <select
                disabled={demoId ? true : false}
                className="input input-bordered w-full"
                id="demoTime.season"
                name="demoTime.season"
                value={formik.values.demoTime.season} // Update value to use formik values
                onChange={formik.handleChange} // Update the onChange handler
                onBlur={formik.handleBlur}
              >
                <Season />
              </select>
              {formik.touched.demoTime &&
              formik.touched.demoTime.season &&
              formik.errors.demoTime?.season ? (
                <div className="text-red-600 font-bold">
                  {formik.errors.demoTime.season}
                </div>
              ) : null}
            </div>
            <div>
              <label className="font-extrabold mb-1 block">কৃষকের নাম</label>
              <input
                type="text"
                className="input input-bordered w-full"
                id="farmersInfo.name"
                name="farmersInfo.name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder="কৃষকের পুরো নাম"
                value={
                  formik.values.farmersInfo
                    ? formik.values.farmersInfo?.name
                    : ""
                }
              />

              {formik.errors.farmersInfo?.name ? (
                <div className="text-red-600 font-bold">
                  {formik.errors.farmersInfo.name}
                </div>
              ) : null}
            </div>
            <div>
              <label className="font-extrabold mb-1 block">
                পিতা/স্বামীর নাম নাম
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                id="farmersInfo.fatherOrHusbandName"
                name="farmersInfo.fatherOrHusbandName"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder="পিতা/স্বামীর নাম নাম"
                value={
                  formik.values.farmersInfo
                    ? formik.values.farmersInfo?.fatherOrHusbandName
                    : ""
                }
              />

              {formik.touched.farmersInfo &&
              formik.touched.farmersInfo.fatherOrHusbandName &&
              formik.errors.farmersInfo?.fatherOrHusbandName ? (
                <div className="text-red-600 font-bold">
                  {formik.errors.farmersInfo.fatherOrHusbandName}
                </div>
              ) : null}
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
                type="text"
                className="input input-bordered w-full"
                id="address.block"
                name="address.block"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder="গ্রাম"
                disabled={true}
                value={user?.blockB}
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
          <div className="grid lg:grid-cols-2 gap-4 mb-3  grid-cols-1">
            <div>
              <label className="font-extrabold mb-1 block">এসএএও এর নাম</label>
              <input
                type="text"
                className="input input-bordered w-full"
                id="SAAO.name"
                readOnly
                disabled={true}
                name="SAAO.name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder="উপসহকারী কৃষি অফিসারের নাম"
                value={user?.SAAO.name}
              />

              {formik.touched.SAAO &&
              formik.touched.SAAO.name &&
              formik.errors.SAAO?.name ? (
                <div className="text-red-600 font-bold">
                  {formik.errors.SAAO.name}
                </div>
              ) : null}
            </div>
            <div>
              <label className="font-extrabold mb-1 block">
                এসএএও এর মোবাইল নং
              </label>
              <input
                type="number"
                className="input input-bordered w-full"
                id="SAAO.mobile"
                name="SAAO.mobile"
                readOnly
                disabled={true}
                onBlur={formik.handleBlur}
                maxLength={11}
                onChange={formik.handleChange}
                placeholder="উপসহকারী কৃষি অফিসারের মোবাইল নং"
                value={user?.SAAO.mobile}
              />

              {formik.touched.SAAO &&
              formik.touched.SAAO.mobile &&
              formik.errors.SAAO?.mobile ? (
                <div className="text-red-600 font-bold">
                  {formik.errors.SAAO.mobile}
                </div>
              ) : null}
            </div>
          </div>
          <div className="grid lg:grid-cols-4 gap-4  grid-cols-1">
            <div>
              <label className="font-extrabold mb-1 block">মোবাইল নং</label>
              <input
                type="text"
                className="input input-bordered w-full"
                id="numbersInfo.mobile"
                name="numbersInfo.mobile"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder="মোবাইল"
                maxLength={11}
                value={
                  formik.values.numbersInfo
                    ? formik.values.numbersInfo?.mobile
                    : ""
                }
              />

              {formik.touched.numbersInfo &&
              formik.touched.numbersInfo.mobile &&
              formik.errors.numbersInfo?.mobile ? (
                <div className="text-red-600 font-bold">
                  {formik.errors.numbersInfo.mobile}
                </div>
              ) : null}
            </div>
            <div>
              <label className="font-extrabold mb-1 block">
                ভোটার আইডি (NID) কার্ড নং
              </label>
              <input
                type="number"
                className="input input-bordered w-full"
                id="numbersInfo.NID"
                name="numbersInfo.NID"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder="এন আই ডি"
                value={
                  formik.values.numbersInfo
                    ? formik.values.numbersInfo?.NID
                    : ""
                }
              />

              {formik.touched.numbersInfo &&
              formik.touched.numbersInfo.NID &&
              formik.errors.numbersInfo?.NID ? (
                <div className="text-red-600 font-bold">
                  {formik.errors.numbersInfo.NID}
                </div>
              ) : null}
            </div>
            <div>
              <label className="font-extrabold mb-1 block">BID নং</label>
              <input
                type="number"
                className="input input-bordered w-full"
                id="numbersInfo.BID"
                name="numbersInfo.BID"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder="বি আই ডি"
                value={
                  formik.values.numbersInfo
                    ? formik.values.numbersInfo?.BID
                    : ""
                }
              />

              {formik.touched.numbersInfo &&
              formik.touched.numbersInfo.BID &&
              formik.errors.numbersInfo?.BID ? (
                <div className="text-red-600 font-bold">
                  {formik.errors.numbersInfo.BID}
                </div>
              ) : null}
            </div>

            <div>
              <label className="font-extrabold mb-1 block">কৃষি কার্ড নং</label>
              <input
                type="number"
                className="input input-bordered w-full"
                id="numbersInfo.agriCard"
                name="numbersInfo.agriCard"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder="কৃষি কার্ড"
                value={
                  formik.values.numbersInfo
                    ? formik.values.numbersInfo?.agriCard
                    : ""
                }
              />

              {formik.touched.numbersInfo &&
              formik.touched.numbersInfo.agriCard &&
              formik.errors.numbersInfo?.agriCard ? (
                <div className="text-red-600 font-bold">
                  {formik.errors.numbersInfo.agriCard}
                </div>
              ) : null}
            </div>
          </div>

          <div className="grid mt-3 lg:grid-cols-4 gap-4  grid-cols-1">
            <div>
              <label className="font-extrabold mb-1 block">প্রযুক্তি</label>
              <select
                className="input input-bordered w-full"
                id="demoInfo.tech"
                name="demoInfo.tech"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={
                  formik.values.demoInfo ? formik.values.demoInfo?.tech : ""
                }
              >
                <option value="" label="প্রযুক্তি পছন্দ করুন" />

                {selectedProject &&
                  selectedProject?.crops?.length > 0 &&
                  selectedProject?.crops?.map((singleCrop) => (
                    <>
                      <option
                        key={singleCrop}
                        value={singleCrop}
                        label={singleCrop}
                      />
                    </>
                  ))}
              </select>

              {formik.touched.demoInfo &&
              formik.touched.demoInfo.tech &&
              formik.errors.demoInfo?.tech ? (
                <div className="text-red-600 font-bold">
                  {formik.errors.demoInfo.tech}
                </div>
              ) : null}
            </div>
            <div>
              <label className="font-extrabold mb-1 block">ফসল</label>
              <input
                type="text"
                className="input input-bordered w-full"
                id="demoInfo.crop"
                name="demoInfo.crop"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder="ফসল"
                value={
                  formik.values.demoInfo ? formik.values.demoInfo?.crop : ""
                }
              />

              {formik.touched.demoInfo &&
              formik.touched.demoInfo.crop &&
              formik.errors.demoInfo?.crop ? (
                <div className="text-red-600 font-bold">
                  {formik.errors.demoInfo.crop}
                </div>
              ) : null}
            </div>
            <div>
              <label className="font-extrabold mb-1 block">ফসলের জাত</label>
              <input
                type="text"
                className="input input-bordered w-full"
                id="demoInfo.variety"
                name="demoInfo.variety"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder="ফসলের জাত"
                value={
                  formik.values.demoInfo ? formik.values.demoInfo?.variety : ""
                }
              />

              {formik.touched.demoInfo &&
              formik.touched.demoInfo.variety &&
              formik.errors.demoInfo?.variety ? (
                <div className="text-red-600 font-bold">
                  {formik.errors.demoInfo.variety}
                </div>
              ) : null}
            </div>

            <div>
              <label className="font-extrabold mb-1 block">
                প্রদর্শনীর আয়তন
              </label>
              <input
                type="number"
                className="input input-bordered w-full"
                id="demoInfo.area"
                name="demoInfo.area"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder="প্রদর্শনীর আয়তন"
                value={
                  formik.values.demoInfo ? formik.values.demoInfo?.area : ""
                }
              />

              {formik.touched.demoInfo &&
              formik.touched.demoInfo.area &&
              formik.errors.demoInfo?.area ? (
                <div className="text-red-600 font-bold">
                  {formik.errors.demoInfo.area}
                </div>
              ) : null}
            </div>
          </div>
          <div className="grid mt-3 lg:grid-cols-3 gap-4  grid-cols-1">
            <div>
              <label className="font-extrabold mb-1 block">বপণ তারিখ</label>
              <div className="input input-bordered w-full">
                <Datepicker
                  asSingle={true}
                  id="demoDate.bopon"
                  onChange={(selectedDate) =>
                    handleDatePickerValue("bopon", selectedDate)
                  }
                  name="demoDate.bopon"
                  value={datePickers?.bopon}
                  showShortcuts={true}
                />
              </div>
            </div>
            <div>
              <label className="font-extrabold mb-1 block">রোপণ তারিখ</label>
              <div className="input input-bordered w-full">
                <Datepicker
                  asSingle={true}
                  id="demoDate.ropon"
                  onChange={(selectedDate) =>
                    handleDatePickerValue("ropon", selectedDate)
                  }
                  name="demoDate.ropon"
                  value={datePickers?.ropon}
                  showShortcuts={true}
                />
              </div>
            </div>
            <div>
              <label className="font-extrabold mb-1 block">কর্তন তারিখ</label>
              <div className="input input-bordered w-full">
                <Datepicker
                  id="demoDate.korton"
                  onChange={(selectedDate) =>
                    handleDatePickerValue("korton", selectedDate)
                  }
                  name="demoDate.korton"
                  value={datePickers?.korton}
                  showShortcuts={true}
                />
              </div>
            </div>

            <div>
              <label className="font-extrabold mb-1 block">ফলন (হেক্টর)</label>
              <input
                type="number"
                className="input input-bordered w-full"
                id="production.productionPerHector"
                name="production.productionPerHector"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder="হেক্টর প্রতি ফলন"
                value={
                  formik.values.production
                    ? formik.values.production?.productionPerHector
                    : ""
                }
              />

              {formik.touched.production &&
              formik.touched.production.productionPerHector &&
              formik.errors.production?.productionPerHector ? (
                <div className="text-red-600 font-bold">
                  {formik.errors.production.productionPerHector}
                </div>
              ) : null}
            </div>
            <div>
              <label className="font-extrabold mb-1 block">
                প্রদর্শনীতে উৎপাদন
              </label>
              <input
                type="number"
                className="input input-bordered w-full"
                id="production.totalProduction"
                name="production.totalProduction"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder="প্রদর্শনীতে সর্বমোট উৎপাদন"
                value={
                  formik.values.production
                    ? formik.values.production?.totalProduction
                    : ""
                }
              />

              {formik.touched.production &&
              formik.touched.production.totalProduction &&
              formik.errors.production?.totalProduction ? (
                <div className="text-red-600 font-bold">
                  {formik.errors.production.totalProduction}
                </div>
              ) : null}
            </div>
            <div>
              <label className="font-extrabold mb-1 block">
                কন্ট্রোল প্লটে উৎপাদন
              </label>
              <input
                type="number"
                className="input input-bordered w-full"
                id="production.sidePlotProduction"
                name="production.sidePlotProduction"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder="সাইড প্লট / কন্ট্রোল প্লটে উৎপাদন"
                value={
                  formik.values.production
                    ? formik.values.production?.sidePlotProduction
                    : ""
                }
              />

              {formik.touched.production &&
              formik.touched.production.sidePlotProduction &&
              formik.errors.production?.sidePlotProduction ? (
                <div className="text-red-600 font-bold">
                  {formik.errors.production.sidePlotProduction}
                </div>
              ) : null}
            </div>
          </div>

          <div className="grid mt-3 lg:grid-cols-2 gap-4  grid-cols-1">
            <div className="mt-5">
              <label className="font-extrabold mb-1 block">
                কৃষকের মন্তব্য
              </label>
              <textarea
                name="comment.farmersReview"
                id="comment.farmersReview"
                className="input h-20 input-bordered w-full"
                rows={10}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.comment.farmersReview}
              ></textarea>
            </div>
            <div className="mt-5">
              <label className="font-extrabold mb-1 block"> মন্তব্য</label>
              <textarea
                name="comment.overallComment"
                id="comment.overallComment"
                className="input h-20 input-bordered w-full"
                rows={10}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.comment.overallComment}
              ></textarea>
            </div>
          </div>
          {imageRawLink?.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-3 justify-center">
              {imageRawLink?.map((image, index) => (
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
          {!loading && (
            <button
              type="submit"
              className="btn mt-5 w-full font-extrabold text-white btn-success"
            >
              {!demoId ? "প্রদর্শনী যুক্ত করুন" : "প্রদর্শনীর তথ্য আপডেট করুন"}
            </button>
          )}
          {loading && (
            <div className="fixed daeLoader">
              <Loader />
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default AddDemo;
