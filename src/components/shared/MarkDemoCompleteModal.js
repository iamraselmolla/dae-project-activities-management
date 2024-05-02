import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Datepicker from "react-tailwindcss-datepicker";

const MarkDemoCompleteModal = ({ data }) => {
  const formik = useFormik({
    initialValues: {
      variety: data?.demoInfo?.variety || "",
      area: data?.demoInfo?.area || "",
      bopon: data?.demoDate?.bopon || "",
      ropon: data?.demoDate?.ropon || "",
      korton: data?.demoDate?.korton?.startDate || "",
      farmersReview: data?.comment?.farmersReview || "",
      overallComment: data?.comment?.overallComment || "",
    },
    validationSchema: Yup.object({
      variety: Yup.string().required("ফসলের জাত প্রয়োজন"),
      area: Yup.number().required("প্রদর্শনীর আয়তন প্রয়োজন"),
      bopon: Yup.date().required("বপণ তারিখ প্রয়োজন"),
      ropon: Yup.date().required("রোপণ তারিখ প্রয়োজন"),
      korton: Yup.date().required("কর্তন তারিখ প্রয়োজন"),
      farmersReview: Yup.string().required("কৃষকের মন্তব্য প্রয়োজন"),
      overallComment: Yup.string().required("মন্তব্য প্রয়োজন"),
    }),
    onSubmit: (values) => {
      console.log("Form submitted with values:", values);
      // You can add further logic here, like submitting data to the server
    },
  });

  return (
    <dialog id="my_modal_33" className="modal text-center">
      <div className="modal-box w-6/12 max-w-5xl">
        <h3 className="font-bold text-xl mb-2">
          {data?.projectInfo?.short}-এর {data?.demoTime?.fiscalYear} অর্থবছরের{" "}
          {data?.demoTime?.season} মৌসুমের প্রযুক্তিঃ {data?.demoInfo?.tech} এর
          ফসলঃ {data?.demoInfo?.crop} প্রদর্শনীপ্রাপ্ত কৃষক{" "}
          {data?.farmersInfo?.name} এর প্রদর্শনীটি চূড়ান্ত হিসেবে চিহ্নিত করুন।
        </h3>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid mt-3 lg:grid-cols-3 gap-4 grid-cols-1">
            <div>
              <label className="font-extrabold mb-1 block">ফসলের জাত</label>
              <input
                type="text"
                className="input input-bordered w-full"
                name="variety"
                onChange={formik.handleChange}
                value={formik.values.variety}
                placeholder="ফসলের জাত"
              />
              {formik.touched.variety && formik.errors.variety ? (
                <div className="text-red-500">{formik.errors.variety}</div>
              ) : null}
            </div>
            <div>
              <label className="font-extrabold mb-1 block">
                প্রদর্শনীর আয়তন
              </label>
              <input
                type="number"
                className="input input-bordered w-full"
                name="area"
                onChange={formik.handleChange}
                value={formik.values.area}
                placeholder="প্রদর্শনীর আয়তন"
              />
              {formik.touched.area && formik.errors.area ? (
                <div className="text-red-500">{formik.errors.area}</div>
              ) : null}
            </div>
            <div>
              <label className="font-extrabold mb-1 block">বপণ তারিখ</label>
              <div className="input input-bordered w-full">
                <Datepicker
                  asSingle={true}
                  onChange={(selectedDate) =>
                    formik.setFieldValue("bopon", selectedDate)
                  }
                  value={formik.values.bopon}
                  showShortcuts={true}
                />
              </div>
              {formik.touched.bopon && formik.errors.bopon ? (
                <div className="text-red-500">{formik.errors.bopon}</div>
              ) : null}
            </div>
            <div>
              <label className="font-extrabold mb-1 block">রোপণ তারিখ</label>
              <div className="input input-bordered w-full">
                <Datepicker
                  asSingle={true}
                  onChange={(selectedDate) =>
                    formik.setFieldValue("ropon", selectedDate)
                  }
                  value={formik.values.ropon}
                  showShortcuts={true}
                />
              </div>
              {formik.touched.ropon && formik.errors.ropon ? (
                <div className="text-red-500">{formik.errors.ropon}</div>
              ) : null}
            </div>
            <div>
              <label className="font-extrabold mb-1 block">কর্তন তারিখ</label>
              <div className="input input-bordered w-full">
                <Datepicker
                  onChange={(selectedDate) =>
                    formik.setFieldValue("korton", selectedDate)
                  }
                  value={formik.values.korton}
                  showShortcuts={true}
                />
              </div>
              {formik.touched.korton && formik.errors.korton ? (
                <div className="text-red-500">{formik.errors.korton}</div>
              ) : null}
            </div>
            <div className="mt-5">
              <label className="font-extrabold mb-1 block">
                কৃষকের মন্তব্য
              </label>
              <textarea
                name="farmersReview"
                className="input h-20 input-bordered w-full"
                rows={10}
                onChange={formik.handleChange}
                value={formik.values.farmersReview}
              ></textarea>
              {formik.touched.farmersReview && formik.errors.farmersReview ? (
                <div className="text-red-500">
                  {formik.errors.farmersReview}
                </div>
              ) : null}
            </div>
            <div className="mt-5">
              <label className="font-extrabold mb-1 block">মন্তব্য</label>
              <textarea
                name="overallComment"
                className="input h-20 input-bordered w-full"
                rows={10}
                onChange={formik.handleChange}
                value={formik.values.overallComment}
              ></textarea>
              {formik.touched.overallComment && formik.errors.overallComment ? (
                <div className="text-red-500">
                  {formik.errors.overallComment}
                </div>
              ) : null}
            </div>
          </div>
          <button
            type="submit"
            className="btn mt-3 text-white btn-success w-full"
          >
            চুড়ান্ত হিসেবে গণ্য করুন
          </button>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default MarkDemoCompleteModal;
