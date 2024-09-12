import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import { FaEye, FaEyeSlash, FaUser, FaPhone, FaLock, FaBuilding, FaMapMarkerAlt } from "react-icons/fa";
import { updateUser } from "../../../../../services/userServices";
import toast from "react-hot-toast";

const SingleUser = ({ index, user }) => {
  const [name, setName] = useState(user?.SAAO?.name);
  const [mobile, setMobile] = useState(user?.SAAO?.mobile);
  const [password, setPassword] = useState(user?.password);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (values) => {
    try {
      const { _id } = values;
      const updateData = { name, mobile, password };
      const response = await updateUser(_id, updateData);
      if (response.status === 200) {
        toast.success("তথ্য আপডেট সম্পাদন হয়েছে।");
      } else {
        toast.error("ইউজার তথ্য আপডেট করতে সমস্যা হয়েছে।");
      }
    } catch (error) {
      console.error("একটি সমস্যা হয়েছে:", error);
      toast.error("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    }
  };

  return (
    <div className="collapse collapse-arrow bg-blue-50 rounded-box mb-4">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium flex items-center">
        <FaBuilding className="mr-2" />
        {user?.blockB} ব্লক - {user?.unionB} ইউনিয়ন
      </div>
      <div className="collapse-content">
        <div className="card shadow-lg mt-4">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">ইউজার তথ্য</h2>
            <Formik initialValues={user} onSubmit={handleSubmit}>
              {({ values }) => (
                <Form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text flex items-center font-semibold">
                          <FaBuilding className="mr-2" />
                          ব্লকের নাম (ইংরেজী)
                        </span>
                      </label>
                      <input
                        type="text"
                        className="input input-bordered w-full"
                        value={values.block}
                        readOnly
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text flex items-center font-semibold">
                          <FaBuilding className="mr-2" />
                          ব্লকের নাম (বাংলা)
                        </span>
                      </label>
                      <input
                        type="text"
                        className="input input-bordered w-full"
                        value={values.blockB}
                        readOnly
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text flex items-center font-semibold">
                          <FaMapMarkerAlt className="mr-2" />
                          ইউনিয়নের নাম (ইংরেজী)
                        </span>
                      </label>
                      <input
                        type="text"
                        className="input input-bordered w-full"
                        value={values.union}
                        readOnly
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text flex items-center font-semibold">
                          <FaMapMarkerAlt className="mr-2" />
                          ইউনিয়নের নাম (বাংলা)
                        </span>
                      </label>
                      <input
                        type="text"
                        className="input input-bordered w-full"
                        value={values.unionB}
                        readOnly
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text flex items-center font-semibold">
                          <FaUser className="mr-2" />
                          ইউজার নাম
                        </span>
                      </label>
                      <input
                        type="text"
                        className="input input-bordered w-full"
                        value={values.username}
                        readOnly
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text flex items-center font-semibold">
                          <FaLock className="mr-2" />
                          পাসওয়ার্ড
                        </span>
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          className="input input-bordered w-full pr-12"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                          type="button"
                          className="btn btn-ghost btn-sm absolute right-2 top-2 h-8 w-8"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text flex items-center font-semibold">
                          <FaUser className="mr-2" />
                          উপসহকারী কৃষি অফিসারের নাম
                        </span>
                      </label>
                      <input
                        type="text"
                        className="input input-bordered w-full"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text flex items-center font-semibold">
                          <FaPhone className="mr-2" />
                          উপসহকারী কৃষি অফিসারের মোবাইল নং
                        </span>
                      </label>
                      <input
                        type="tel"
                        className="input input-bordered w-full"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary w-full mt-4 hover:bg-blue-600 transition-colors"
                  >
                    {values.blockB} ব্লকের ইউজার তথ্য আপডেট সম্পাদন করুন
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleUser;
