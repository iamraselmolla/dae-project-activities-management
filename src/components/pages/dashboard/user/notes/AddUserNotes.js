import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { getAllProjects } from "../../../../../services/userServices";

const AddNotes = () => {
  const [allProject, setAllProjects] = useState([]);
  const initialValues = {
    projectInfo: {
      details: "",
      short: "",
    },
    season: "",
    purpose: "",
    farmersInfo: {
      name: "",
      fathersOrHusbandName: "",
      mobile: "",
      NID: "",
    },
    address: {
      village: "",
      block: "",
      union: "",
    },
    attachment: "",
  };

  const validationSchema = Yup.object().shape({
    season: Yup.string().required(),
    purpose: Yup.string().required(),
    farmersInfo: Yup.object().shape({
      name: Yup.string().required(),
      fathersOrHusbandName: Yup.string().required(),
      mobile: Yup.string().required(),
    }),
    address: Yup.object().shape({
      village: Yup.string().required(),
    }),
  });

  const handleSubmit = (values) => {
    console.log(values);
  };

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
      toast.error("দয়া করে আপনার ওয়াই-ফাই বা ইন্তারনেট সংযোগ যুক্ত করুন");
    }
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">নোটস যুক্ত করুন</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form className="space-y-4">
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
                  onChange={(e) => handleSelectChange(formik, e)}
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
                <label htmlFor="season" className="block font-semibold mb-1">
                  মৌসুম
                </label>
                <Field
                  type="text"
                  name="season"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage
                  name="season"
                  component="div"
                  className="text-red-600"
                />
              </div>

              <div>
                <label htmlFor="purpose" className="block font-semibold mb-1">
                  উদ্দেশ্য
                </label>
                <Field
                  type="text"
                  name="purpose"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage
                  name="purpose"
                  component="div"
                  className="text-red-600"
                />
              </div>

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
                  ্পিতা/স্বামীর নাম
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
                  type="text"
                  name="farmersInfo.NID"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage
                  name="farmersInfo.NID"
                  component="div"
                  className="text-red-600"
                />
              </div>

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
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage
                  name="address.union"
                  component="div"
                  className="text-red-600"
                />
              </div>

              <div>
                <label
                  htmlFor="attachment"
                  className="block font-semibold mb-1"
                >
                  সংযুক্ত
                </label>
                <Field
                  type="text"
                  name="attachment"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage
                  name="attachment"
                  component="div"
                  className="text-red-600"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddNotes;
