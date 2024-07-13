import React, { useContext, useEffect, useState } from "react";
import SectionTitle from "../../shared/SectionTitle";
import { useFormik } from "formik";
import * as Yup from "yup";
import Season from "../../shared/Season";
import FiscalYear from "../../shared/FiscalYear";
import Datepicker from "react-tailwindcss-datepicker";
import RequiredMark from "../../shared/RequiredMark"
import {
  createDemo,
  editDemobyId,
  findDemoById,
  findFarmerByNID,
} from "../../../services/userServices";
import toast from "react-hot-toast";
import getFiscalYear from "../../shared/commonDataStores";
import { toBengaliNumber } from "bengali-number";
import { AuthContext } from "../../AuthContext/AuthProvider";
import { makeSureOnline } from "../../shared/MessageConst";
import Loader from "../../shared/Loader";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AddFarmerModal from "../../shared/AddFarmerModal";

const AddDemo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from?.pathname || "/";
  const queryParams = new URLSearchParams(location.search);
  const demoIdFromUrl = queryParams.get("id");
  const [demoId, setDemoId] = useState(demoIdFromUrl);
  const [selectedProject, setSelectedProject] = useState({});
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const { projects: allProject } = useSelector((state) => state.dae);
  const [showModal, setShowModal] = useState(false);
  const [farmerData, setFarmerData] = useState(null);
  const [NIDInfo, setNIDInfo] = useState('')


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
    const updatedDatePickers = { ...datePickers };
    updatedDatePickers[picker] = selectedDate;
    setDatePickers(updatedDatePickers);
  };
  const handleAddFarmerClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
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
    demoImages: [],
    user: {
      id: user?._id,
      username: user?.username
    },
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
      tech: Yup.string().required(
        "প্রদর্শনীর ধরণ / প্রযুক্তি অবশ্যই সিলেক্ট করতে হবে।"
      ),
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
        values.projectInfo.full = selectedProject.name.details;
        values.projectInfo.short = selectedProject.name.short;

        values.SAAO = user?.SAAO;

        if (!values.projectInfo.full || !values.projectInfo.short) {
          setLoading(false);
          return toast.error("আপনাকে অবশ্যই প্রকল্প সিলেক্ট করতে হবে।");
        }

        if (!values.user.id || !values.user.username) {
          setLoading(false);
          return toast.error("লগিনজনিত সমস্যা পাওয়া গিয়েছে। দয়া করে সংশ্লিষ্ট ব্যক্তিকে অবহিত করুন");
        }
      }

      try {
        let result;
        if (!demoId) {
          if (!navigator.onLine) {
            makeSureOnline();
            setLoading(false);
            return;
          }

          result = await createDemo(values);
          if (result?.status === 200) {
            toast.success(result?.data?.message);

            resetDatePickers();

            setSelectedProject({});

            await checkFarmerExistence(values);

            resetForm();
            setLoading(false);

          } else {
            throw new Error('প্রদর্শনী সংরক্ষণ করতে সমস্যা হচ্ছে।');
          }
        } else {
          result = await editDemobyId(demoId, values);
          if (result?.status === 200) {
            toast.success(result?.data?.message);
          } else {
            throw new Error('প্রদর্শনী এডিট করতে সমস্যা হচ্ছে।');
          }
        }
      } catch (err) {
        toast.error("সার্ভারজনিত সমস্যা হচ্ছে। দয়াকরে সংশ্লিষ্ট কর্তৃপক্ষকে অবহিত করুন।");
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
  });
  // Reset date pickers
  const resetDatePickers = () => {
    setDatePickers({
      bopon: { startDate: null, endDate: null },
      ropon: { startDate: null, endDate: null },
      korton: { startDate: null, endDate: null },
    });
  };

  const checkFarmerExistence = async (demoValues) => {
    try {
      const result = await findFarmerByNID(

        NIDInfo,
        demoValues.address.block,
        demoValues.address.union
      );

      if (result?.data?.success === false) {

        const modalFarmerData = {
          farmersInfo: {
            farmerName: demoValues.farmersInfo.name,
            fathersOrHusbandsName: demoValues.farmersInfo.fatherOrHusbandName,
          },
          numbersInfo: {
            mobile: demoValues.numbersInfo.mobile,
            NID: NIDInfo,
            BID: demoValues.numbersInfo.BID,
            agriCard: demoValues.numbersInfo.agriCard,
          },
          address: {
            village: demoValues.address.village,
            block: demoValues.address.block,
            union: demoValues.address.union,
          },
          comment: "প্রদর্শনীপ্রাপ্ত কৃষক",
          username: demoValues.username,
        };
        setFarmerData(modalFarmerData);
        handleAddFarmerClick();

      } else {
        setLoading(false)
      }

    } catch (err) {
      toast.error("কৃষক সংরক্ষণ করতে সমস্যা হচ্ছে।");
      setLoading(false)
    }
  };

  useEffect(() => {
    const fetchDemoId = async () => {
      if (!demoId) return;

      try {
        const result = await findDemoById(demoId);
        const { data } = result?.data || {};
        if (data?.completed) {
          toast.error(
            "এই প্রদর্শনীটি ইতিমধ্যে চূড়ান্ত হিসেবে গণ্য করা হয়ে গেছে । এইটা আর এডিট করার অনুমতি নেই।"
          );
          navigate(from, { replace: true });
          return;
        }

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
      } catch (err) {
        toast.error(
          "প্রদর্শনীর তথ্য সার্ভার থেকে আনতে সমস্যার সৃষ্টি হচ্ছে। দয়া করে সংশ্লিষ্ট ব্যক্তিকে অবহিত করুন।"
        );
      }
    };

    if (navigator.onLine) {
      fetchDemoId();
    } else {
      makeSureOnline();
    }
  }, [demoId, allProject]);
  const handleNIDInput = async () => {
    if (NIDInfo?.length === 10 || NIDInfo?.length === 13 || NIDInfo?.length === 17) {
      try {
        const result = await findFarmerByNID(

          NIDInfo,
          user.blockB,
          user.unionB
        );
        if (result?.status === 200) {
          const { data } = result?.data || {};
          if (data) {
            formik.setValues({
              ...formik.values,
              farmersInfo: {
                name: data.farmersInfo.farmerName,
                fatherOrHusbandName: data.farmersInfo.fathersOrHusbandsName,
              },
              address: {
                village: data.address.village,
                block: data.address.block,
                union: data.address.union,
              },
              numbersInfo: {
                NID: data.numbersInfo.NID,
                BID: data.numbersInfo.BID,
                mobile: data.numbersInfo.mobile,
                agriCard: data.numbersInfo.agriCard,
              },
              // ... Set other relevant fields as needed
            });
          }
        }
      }
      catch (err) {
        toast.error('তথ্য পেতে সমস্যা হচ্ছে । ')
      }
    }


  }

  return (
    <section className="mx-auto bg-white max-w-7xl px-2 sm:px-6 lg:px-8">
      <SectionTitle title={"প্রদর্শনীর তথ্য যুক্ত করুন"} />
      <div className="mt-2">
        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div>
              <label className="font-extrabold mb-1 block">
                প্রকল্পের পুরো নাম <RequiredMark />
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
                প্রকল্পের সংক্ষেপ নাম <RequiredMark />
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
              <label className="font-extrabold mb-1 block">অর্থবছর <RequiredMark /></label>
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
              <label className="font-extrabold mb-1 block">মৌসুম <RequiredMark /></label>
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
              <label className="font-extrabold mb-1 block">কৃষকের নাম <RequiredMark /></label>
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
                পিতা/স্বামীর নাম নাম <RequiredMark />
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
              <label className="font-extrabold mb-1 block">গ্রামের নাম <RequiredMark /></label>
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
              <label className="font-extrabold mb-1 block">ব্লকের নাম </label>
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
                value={user?.SAAO?.name}
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
                value={user?.SAAO?.mobile}
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
                onBlur={handleNIDInput}
                onChange={(e) => setNIDInfo(e.target.value)}
                placeholder="এন আই ডি"
                value={
                  NIDInfo}
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
              <label className="font-extrabold mb-1 block">প্রযুক্তি <RequiredMark /></label>
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
              <label className="font-extrabold mb-1 block">ফসল <RequiredMark /></label>
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
          {/* {imageRawLink?.length > 0 && (
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
          )} */}
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
      {farmerData && <AddFarmerModal
        show={showModal}
        handleClose={handleCloseModal}
        farmerData={farmerData}
      />}
    </section>
  );
};

export default AddDemo;
