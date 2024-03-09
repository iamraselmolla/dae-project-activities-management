import React, { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { BsEyeFill } from "react-icons/bs";
import { RiEyeCloseLine } from "react-icons/ri";
import UserTitle from '../../../shared/UserTitle';
import { updateUser } from '../../../../services/userServices';

const SingleUser = ({ index, user }) => {
    const initialValues = { ...user };
    const [userValues, setUserValues] = useState({
        ...user
    });

    const handleSubmit = async (values) => {

        const result = await updateUser(user?._id, {})

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
                    <UserTitle block={user.blockB} union={user.unionB} index={index} />
                </div>
                <div className="collapse-content">
                    <div className="mt-3">
                        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                            <Form>
                                <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-4">
                                    <div>
                                        <label htmlFor={`block-${index}`}>ব্লকের নাম (ইংরেজী)</label>
                                        <Field
                                            type="text"
                                            id={`block-${index}`}
                                            name={`block-${index}`}
                                            className="input input-bordered w-full"
                                            readOnly
                                            value={userValues.block}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor={`blockB-${index}`}>ব্লকের নাম (বাংলা)</label>
                                        <Field
                                            type="text"
                                            id={`blockB-${index}`}
                                            name={`blockB-${index}`}
                                            className="input input-bordered w-full"
                                            readOnly
                                            value={userValues.blockB}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor={`union-${index}`}>ইউনিয়নের নাম (ইংরেজী)</label>
                                        <Field
                                            type="text"
                                            id={`union-${index}`}
                                            name={`union-${index}`}
                                            className="input input-bordered w-full"
                                            readOnly
                                            value={userValues.union}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor={`unionB-${index}`}>ইউনিয়নের নাম (বাংলা)</label>
                                        <Field
                                            type="text"
                                            id={`unionB-${index}`}
                                            name={`unionB-${index}`}
                                            className="input input-bordered w-full"
                                            readOnly
                                            value={userValues.unionB}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor={`username-${index}`}>ইউজার নাম</label>
                                        <Field
                                            type="text"
                                            id={`username-${index}`}
                                            name={`username-${index}`}
                                            className="input input-bordered w-full"
                                            readOnly
                                            value={userValues.username}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor={`password-${index}`}> পাসওয়ার্ড</label>
                                        <div className="flex items-center input input-bordered w-full">
                                            <Field
                                                type={show ? "text" : "password"}
                                                id={`password-${index}`}
                                                name={`password-${index}`}
                                                className="w-full"
                                                value={userValues.password}
                                                onChange={(e) => setUserValues({ ...userValues, password: e.target.value })}
                                            />
                                            <button className="right-0 pr-2" onClick={handleToShow}>
                                                {show ? <BsEyeFill className="text-slate-500" /> : <RiEyeCloseLine className="text-slate-500" />}
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor={`SAAO.name-${index}`}>উপসহকারী কৃষি অফিসারের নাম</label>
                                        <Field
                                            type="text"
                                            id={`SAAO.name-${index}`}
                                            name={`SAAO.name-${index}`}
                                            className="input input-bordered w-full"
                                            value={userValues.SAAOName}
                                            onChange={(e) => setUserValues({ ...userValues, SAAOName: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor={`SAAO.mobile-${index}`}>উপসহকারী কৃষি অফিসারের মোবাইল নং</label>
                                        <Field
                                            type="text"
                                            id={`SAAO.mMobile-${index}`}
                                            name={`SAAO.mobile-${index}`}
                                            className="input input-bordered w-full"
                                            value={userValues.SAAOMobile}
                                            onChange={(e) => setUserValues({ ...userValues, SAAOMobile: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-success text-white mt-4">
                                    {user?.blockB} ব্লকের ইউজার তথ্য আপডেট সম্পাদন করুন
                                </button>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleUser;
