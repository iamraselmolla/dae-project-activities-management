import React, { useContext, useState } from "react";
import { Field, Form, Formik } from "formik";
import { BsEyeFill } from "react-icons/bs";
import { RiEyeCloseLine } from "react-icons/ri";
import UserTitle from "../../../shared/UserTitle";
import { updateUser } from "../../../../services/userServices";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../../../AuthContext/AuthProvider";

const SingleUser = ({ index, user, setReload, reload }) => {
  const { jwtToken } = useContext(AuthContext);
  const [name, setName] = useState(user?.SAAO?.name);
  const [mobile, setMobile] = useState(user?.SAAO?.mobile);
  const [password, setPassword] = useState(user?.password);
  const initialValues = { ...user };
  const [userValues, setUserValues] = useState({
    ...user,
  });

  const handleSubmit = async (values, jwtToken) => {
    try {
      const { _id } = values; // Extract values from the form or wherever they are stored
      const updateData = { _id, name, mobile, password };

      console.log(updateData, "checking from frontend");

      const response = await axios.put(
        "http://localhost:5000/api/v1/user/update-user",
        updateData,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`, // Attach JWT token in the Authorization header
          },
        }
      );

      if (response.status === 200) {
        toast.success("তথ্য আপডেট সম্পাদন হয়েছে।");
        setReload(!reload);
        // Handle success
      } else {
        toast.error("ইউজার তথ্য আপডেট করতে সমস্যা হয়েছে।");
        // Handle failure
      }
    } catch (error) {
      console.error("একটি সমস্যা হয়েছে:", error);
      // Handle error
    }
  };

  const [show, setShow] = useState(false);
  const handleToShow = () => {
    setShow(!show);
  };

  return (
    <>
      <div className="collapse">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">
          <UserTitle block={user?.blockB} union={user?.unionB} index={index} />
        </div>
        <div className="collapse-content">
          <div className="mt-3">
            {/* <Formik initialValues={initialValues} onSubmit={handleSubmit}> */}
            <Formik
              initialValues={user}
              onSubmit={(values) => handleSubmit(values, jwtToken)} // Pass handleSubmit function here
            >
              {(
                { values, handleChange } // Destructure values and handleChange from Formik props
              ) => (
                <Form>
                  <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-4">
                    <div>
                      <label htmlFor={`block`}>ব্লকের নাম (ইংরেজী)</label>
                      <Field
                        type="text"
                        id={`block`}
                        name={`block`}
                        className="input input-bordered w-full"
                        readOnly
                        value={userValues?.block}
                      />
                    </div>

                    <div>
                      <label htmlFor={`blockB`}>ব্লকের নাম (বাংলা)</label>
                      <Field
                        type="text"
                        id={`blockB`}
                        name={`blockB`}
                        className="input input-bordered w-full"
                        readOnly
                        value={userValues?.blockB}
                      />
                    </div>

                    <div>
                      <label htmlFor={`union`}>ইউনিয়নের নাম (ইংরেজী)</label>
                      <Field
                        type="text"
                        id={`union`}
                        name={`union`}
                        className="input input-bordered w-full"
                        readOnly
                        value={userValues?.union}
                      />
                    </div>

                    <div>
                      <label htmlFor={`unionB`}>ইউনিয়নের নাম (বাংলা)</label>
                      <Field
                        type="text"
                        id={`unionB`}
                        name={`unionB`}
                        className="input input-bordered w-full"
                        readOnly
                        value={userValues?.unionB}
                      />
                    </div>
                    <div>
                      <label htmlFor={`username`}>ইউজার নাম</label>
                      <Field
                        type="text"
                        id={`username`}
                        name={`username`}
                        className="input input-bordered w-full"
                        readOnly
                        value={userValues?.username}
                      />
                    </div>
                    <div>
                      <label htmlFor={`password`}> পাসওয়ার্ড</label>
                      <div className="flex items-center input input-bordered w-full">
                        <Field
                          type={show ? "text" : "password"}
                          id={`password`}
                          name={`password`}
                          className="w-full"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <button className="right-0 pr-2" onClick={handleToShow}>
                          {show ? (
                            <BsEyeFill className="text-slate-500" />
                          ) : (
                            <RiEyeCloseLine className="text-slate-500" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label htmlFor={`SAAO.name`}>
                        উপসহকারী কৃষি অফিসারের নাম
                      </label>
                      <Field
                        type="text"
                        id={`SAAO.name`}
                        name={`SAAO.name`} // Corrected name attribute
                        className="input input-bordered w-full"
                        value={name} // Corrected value access
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    <div>
                      <label htmlFor={`SAAO.mobile`}>
                        উপসহকারী কৃষি অফিসারের মোবাইল নং
                      </label>
                      <Field
                        type="number"
                        id={`SAAO.mMobile`}
                        name={`SAAO.mobile`}
                        className="input input-bordered w-full"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-success text-white mt-4"
                  >
                    {user?.blockB} ব্লকের ইউজার তথ্য আপডেট সম্পাদন করুন
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleUser;
