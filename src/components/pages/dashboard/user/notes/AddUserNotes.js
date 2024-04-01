import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const AddNotes = () => {
  const initialValues = {
    projectDetails: "",
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
    season: Yup.string().required("Season is required"),
    purpose: Yup.string().required("উদ্দেশ্য দিতে হবে"),
    farmersInfo: Yup.object().shape({
      name: Yup.string().required("নাম দিন"),
      fathersOrHusbandName: Yup.string().required("পিতা/স্বামীর নাম দিন"),
      mobile: Yup.string().required("মোবাইল নং দিন"),
    }),
    address: Yup.object().shape({
      village: Yup.string().required("গ্রামের নাম দিন"),
    }),
  });

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">নোটস যুক্ত করুন</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="projectDetails"
                  className="block font-semibold mb-1"
                >
                  প্রকল্পের তথ্য
                </label>
                <Field
                  type="text"
                  name="projectDetails"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage
                  name="projectDetails"
                  component="div"
                  className="text-red-600"
                />
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
              disabled={isSubmitting}
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
