import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Datepicker from "react-tailwindcss-datepicker";
import toast from "react-hot-toast";
import { markDemoComplete } from "../../services/userServices";
import { useDispatch } from "react-redux";
import { daeAction } from "../store/projectSlice";
import { createRandomNumber } from "../utilis/createRandomNumber";

const MarkDemoCompleteModal = ({ data }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    formik.setValues({
      variety: data?.demoInfo?.variety || "",
      area: data?.demoInfo?.area || "",
      korton: {
        startDate: data?.demoDate?.korton?.startDate || "",
        endDate: data?.demoDate?.korton?.endDate || "",
      },
      farmersReview: data?.comment?.farmersReview || "",
      overallComment: data?.comment?.overallComment || "",
      production: {
        productionPerHector: data?.production?.productionPerHector || "",
        totalProduction: data?.production?.totalProduction || "",
      },
    });
  }, [data]);
  const formik = useFormik({
    initialValues: {
      variety: "",
      area: "",
      korton: {
        startDate: "",
        endDate: "",
      },
      farmersReview: "",
      overallComment: "",
      production: {
        productionPerHector: "",
        totalProduction: "",
      },
    },
    validationSchema: Yup.object({
      variety: Yup.string().required("ফসলের জাত প্রয়োজন"),
      area: Yup.number().required("প্রদর্শনীর আয়তন প্রয়োজন"),
      korton: Yup.object().shape({
        startDate: Yup.date().required("কর্তন শুরুর তারিখ দিতে হবে।"),
        endDate: Yup.date().required("কর্তন শেষের তারিখ দিতে হবে।"),
      }),
      // farmersReview: Yup.string().required("কৃষকের মন্তব্য প্রয়োজন"),
      // overallComment: Yup.string().required("মন্তব্য প্রয়োজন"),
      // production: Yup.object().shape({
      //   productionPerHector: Yup.number().required("ফলন প্রয়োজন"),
      //   totalProduction: Yup.number().required("প্রদর্শনীতে উৎপাদন প্রয়োজন"),
      // }),
    }),
    onSubmit: async (values) => {
      console.log(data)
      if (!data?.numbersInfo?.NID) {
        toast.error("অবশ্যই কৃষকের NID নম্বর দিতে হবে । ")
        document.getElementById("my_modal_33")?.close();
        return;
      }
      if (!data?.demoDate?.bopon || !data?.demoDate?.ropon) {
        toast.error(
          "প্রদর্শনীকে চুড়ান্ত হিসেবে গণ্য করার জন্য অবশ্যই রোপন/বপন তারিখ দিতে হবে।"
        );
        return;
      }
      if (!values.korton?.startDate || !values?.korton?.endDate) {
        toast.error("আপনাকে অবশ্যই কর্তন শুরু এবং শেষ তারিখ দিতে হবে।");
        return;
      }
      if (!data?._id) {
        toast.error("প্রদর্শনীর আইডি পাওয়া যায়নি। দয়া করে সংশ্লিষ্ট কর্তপক্ষকে জানান।");
        return;
      }

      try {
        const result = await markDemoComplete(data?._id, values);
        if (result?.status === 200) {
          toast.success("প্রদর্শনীটি চুড়ান্ত হিসেবে চিহ্নিত করা হয়েছে।");
          dispatch(daeAction.setRefetch(`demos${createRandomNumber()}`));
        }
      } catch (err) {
        toast.error("প্রদর্শনী চুড়ান্ত হিসেবে চিহ্নিত করতে সমস্যা হচ্ছে।");
      }
    },
  });

  return (
    <dialog id="my_modal_33" className="modal text-center">
      <div className="modal-box lg:w-6/12 md:w-10/12 max-w-5xl">
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
              <label className="font-extrabold mb-1 block">কর্তন তারিখ</label>
              <div className="input input-bordered w-full">
                <Datepicker
                  onChange={(selectedDate) =>
                    formik.setFieldValue("korton", {
                      startDate: selectedDate.startDate,
                      endDate: selectedDate.endDate,
                    })
                  }
                  value={formik.values?.korton}
                  showShortcuts={true}
                />
              </div>
              {formik.touched.korton &&
                (formik.errors.korton?.startDate ||
                  formik.errors.korton?.endDate) ? (
                <div className="text-red-500">
                  {formik.errors.korton?.startDate ||
                    formik.errors.korton?.endDate}
                </div>
              ) : null}
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
                  (formik.values.area *
                    formik.values.production?.productionPerHector) /
                  247
                }
                disabled={true}
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
            <div>
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
