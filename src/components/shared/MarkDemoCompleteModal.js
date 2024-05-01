import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Datepicker from "react-tailwindcss-datepicker";

const MarkDemoCompleteModal = ({ data }) => {
  const initialValues = {
    demoInfo: {
      variety: "",
      area: ""
    },
    demoDate: {
      bopon: "",
      ropon: "",
      korton: ""
    },
    comment: {
      farmersReview: "",
      overallComment: ""
    }
  };

  const validationSchema = Yup.object().shape({
    demoInfo: Yup.object().shape({
      variety: Yup.string().required("ফসলের জাত প্রয়োজনীয়")
    }),
    demoDate: Yup.object().shape({
      bopon: Yup.date().required("বপণ তারিখ প্রয়োজনীয়"),
      ropon: Yup.date().required("রোপণ তারিখ প্রয়োজনীয়"),
      korton: Yup.date().required("কর্তন তারিখ প্রয়োজনীয়")
    }),
    comment: Yup.object().shape({
      farmersReview: Yup.string(),
      overallComment: Yup.string()
    })
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission
      console.log("Form submitted with values:", values);
    }
  });

  const handleDatePickerValue = (name, value) => {
    formik.setFieldValue(`demoDate.${name}`, value);
  };

  return (
    <dialog id="my_modal_33" className="modal text-center">
      <div className="modal-box w-11/12 max-w-5xl">
        <h3 className="font-bold text-xl mb-2">
          {data?.projectInfo?.short}-এর {data?.demoTime?.fiscalYear} অর্থবছরের {data?.demoTime?.season} মৌসুমের প্রযুক্তিঃ {data?.demoInfo?.tech} এর ফসলঃ {data?.demoInfo?.crop} প্রদর্শনীপ্রাপ্ত কৃষক {data?.farmersInfo?.name} এর প্রদর্শনীটি চূড়ান্ত হিসেবে চিহ্নিত করুন।
        </h3>
        <div className="modal-action flex justify-center pb-5">
          <form onSubmit={formik.handleSubmit}>
            <div className="grid mt-3 lg:grid-cols-2 gap-4 grid-cols-1">
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
                  value={formik.values.demoInfo?.variety}
                />
                {formik.touched.demoInfo &&
                  formik.touched.demoInfo.variety &&
                  formik.errors.demoInfo?.variety && (
                    <div className="text-red-600 font-bold">
                      {formik.errors.demoInfo.variety}
                    </div>
                  )}
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
                  value={formik.values.demoInfo?.area}
                />
                {formik.touched.demoInfo &&
                  formik.touched.demoInfo.area &&
                  formik.errors.demoInfo?.area && (
                    <div className="text-red-600 font-bold">
                      {formik.errors.demoInfo.area}
                    </div>
                  )}
              </div>
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
                    value={formik.values.demoDate.bopon}
                    showShortcuts={true}
                  />
                  {formik.touched.demoDate &&
                    formik.touched.demoDate.bopon &&
                    formik.errors.demoDate?.bopon && (
                      <div className="text-red-600 font-bold">
                        {formik.errors.demoDate.bopon}
                      </div>
                    )}
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
                    value={formik.values.demoDate.ropon}
                    showShortcuts={true}
                  />
                  {formik.touched.demoDate &&
                    formik.touched.demoDate.ropon &&
                    formik.errors.demoDate?.ropon && (
                      <div className="text-red-600 font-bold">
                        {formik.errors.demoDate.ropon}
                      </div>
                    )}
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
                    value={formik.values.demoDate.korton}
                    showShortcuts={true}
                  />
                  {formik.touched.demoDate &&
                    formik.touched.demoDate.korton &&
                    formik.errors.demoDate?.korton && (
                      <div className="text-red-600 font-bold">
                        {formik.errors.demoDate.korton}
                      </div>
                    )}
                </div>
              </div>
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
                <label className="font-extrabold mb-1 block">মন্তব্য</label>
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
            <button type="submit" className="btn mt-3 text-white btn-success w-full">
              তথ্য ও ছবি যুক্ত করুন
            </button>
            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default MarkDemoCompleteModal;
