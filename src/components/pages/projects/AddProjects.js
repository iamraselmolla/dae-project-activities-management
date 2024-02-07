import { useFormik } from "formik";
import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import SectionTitle from "../../shared/SectionTitle";
import * as Yup from "yup";
import { addProjectByAdmin } from "../../../services/userServices";
import toast from "react-hot-toast";

const AddProjects = () => {
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  const handleValueChange = (newValue) => {
    setValue(newValue);
  };

  const validationSchema = Yup.object().shape({
    name: Yup.object().shape({
      details: Yup.string().required("প্রকল্পের পুরো নাম দিন"),
      short: Yup.string().required("প্রকল্পের সংক্ষেপ নাম দিন"),
    }),
    // email: Yup.string().email("ইমেইল ঠিকঠাক নয়").required("প্রকল্পের ইমেইল দিন"),
    // time: Yup.object().shape({
    //   start: Yup.date().nullable().required("প্রকল্পের শুরুর তারিখ দিন"),
    //   end: Yup.date()
    //     .nullable()
    //     .required("প্রকল্পের সম্ভাব্য তারিখ দিন")
    //     .min(Yup.ref("time.start"), "সম্ভাব্য তারিখ শুরুর তারিখের পর হতে হবে"),
    // }),
    // logo: Yup.string().required("প্রকল্পের লোগো আপলোড করুন"),
  });

  const formik = useFormik({
    initialValues: {
      name: {
        details: "",
        short: "",
      },
      projectDetails: {
        PD: "",
        monitoringOfficers: '',
      },
      email: "",
      time: {
        start: null,
        end: null,
      },
      // logo: "",
    },
    validationSchema,
    // Handle Form Submit Value
    onSubmit: async (values, { resetForm }) => {
      const formattedValues = {
        ...values,
        time: {
          start: value.startDate,
          end: value.endDate
        },
      };
      try {
        // Post form data into DB by Api
        const result = await addProjectByAdmin(formattedValues);
        if (result?.status === 200) {
          toast.success(result?.data?.message)
        } else {
          toast.error('Something Wrong')
        }
      } catch (error) {
        console.error("Error:", error?.response?.data?.message);
      } finally {
        resetForm();
        setValue({ startDate: null, endDate: null })
      }

      // Reset form after successful submission

    },
  });

  return (
    <section className="container px-4 md:px-0">
      <SectionTitle title={"নতুন প্রকল্প যুক্ত করুন"} />
      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div>
            <label className="font-extrabold mb-1 block">
              প্রকল্পের পুরো নাম
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              id="name.details"
              name="name.details"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="প্রকল্পের পুরো নাম"
              value={formik.values.name ? formik.values.name.details : ""}
            />
            {formik.touched.name &&
              formik.touched.name.details &&
              formik.errors.name?.details ? (
              <div className="text-red-600 font-bold">
                {formik.errors.name.details}
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
              id="name.short"
              name="name.short"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="প্রকল্পের সংক্ষেপ নাম"
              value={formik.values.name ? formik.values.name.short : ""}
            />
            {formik.touched.name &&
              formik.touched.name.short &&
              formik.errors.name?.short ? (
              <div className="text-red-600 font-bold">
                {formik.errors.name.short}
              </div>
            ) : null}
          </div>
          <div>
            <label className="font-extrabold mb-1 block">
              প্রকল্পের পরিচালকের নাম
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              id="projectDetails.PD"
              name="projectDetails.PD"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="প্রকল্পের পরিচালকের নাম"
              value={
                formik.values.projectDetails
                  ? formik.values.projectDetails.PD
                  : ""
              }
            />
          </div>
          <div>
            <label className="font-extrabold mb-1 block">
              মনিটরিং অফিসারগণের নাম
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              id="projectDetails.monitoringOfficers"
              name="projectDetails.monitoringOfficers"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="মনিটরিং অফিসারগণের নাম"
              value={
                formik.values.projectDetails
                  ? formik.values.projectDetails.monitoringOfficers
                  : ""
              }
            />
          </div>
          <div>
            <label className="font-extrabold mb-1 block">প্রকল্পের ইমেইল</label>
            <input
              type="email"
              className="input input-bordered w-full"
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="প্রকল্পের ইমেইল"
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-600 font-bold">
                {formik.errors.email}
              </div>
            ) : null}
          </div>
          {/* <div>
            <label className="font-extrabold mb-1 block">প্রকল্পের লোগো</label>
            <input
              type="file"
              className="file-input input-bordered w-full"
              id="logo"
              name="logo"
              onChange={(event) => {
                formik.setFieldValue("logo", event.currentTarget.files[0]);
              }}
              onBlur={formik.handleBlur}
            />
            {formik.touched.logo && formik.errors.logo ? (
              <div className="text-red-600 font-bold">
                {formik.errors.logo}
              </div>
            ) : null}
          </div> */}
          <div>
            <label className="font-extrabold mb-1 block">
              প্রকল্পের শুরু ও শেষের তারিখ (সম্ভাব্য)
            </label>
            <Datepicker
              id="time"
              name="time"
              value={value}
              onChange={handleValueChange}
              showShortcuts={true}
            />
            {formik.touched.time && formik.errors.time && (
              <div className="text-red-600 font-bold">
                {formik.errors.time.start}
              </div>
            )}
            {formik.touched.time && formik.errors.time && (
              <div className="text-red-600 font-bold">
                {formik.errors.time.end}
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="btn mt-5 w-full font-extrabold text-white btn-success"
        >
          প্রকল্প যুক্ত করুন
        </button>
      </form>
    </section>
  );
};

export default AddProjects;
