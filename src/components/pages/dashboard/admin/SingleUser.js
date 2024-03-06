import React, { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { BsEyeFill } from "react-icons/bs";
import { RiEyeCloseLine } from "react-icons/ri";
import UserTitle from '../../../shared/UserTitle';

const SingleUser = ({ index, user }) => {
    const initialValues = { ...user };
    const { blockB, unionB } = user
    const handleSubmit = (values) => {
        // Handle form submission here
        console.log(values);
    };


    // This the part to view & hide the password
    const [show, setShow] = useState(false);
    const [password, setPassword] = useState('');
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleToShow = (event) => {
        event.preventDefault();
        setShow(!show)
        // handle form submission logic here
    };

    return (
        <>
            <div className="collapse">
                <input type="checkbox" />
                <div className="collapse-title text-xl font-medium">
                    <UserTitle block={blockB} union={unionB} index={index} />
                </div>
                <div className="collapse-content">
                    <div className="mt-3">
                        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                            <Form>
                                <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-4">
                                    <div>
                                        <label htmlFor="block">ব্লকের নাম (ইংরেজী)</label>
                                        <Field
                                            type="text"
                                            id="block"

                                            name="block"
                                            className="input input-bordered w-full"
                                            readOnly
                                            disabled
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="blockB">ব্লকের নাম (বাংলা)</label>
                                        <Field
                                            type="text"
                                            id="blockB"
                                            name="blockB"
                                            className="input input-bordered w-full"
                                            readOnly
                                            disabled
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="union">ইউনিয়নের নাম (ইংরেজী)</label>
                                        <Field
                                            type="text"
                                            id="union"
                                            name="union"
                                            className="input input-bordered w-full"
                                            readOnly
                                            disabled
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="unionB">ইউনিয়নের নাম (বাংলা)</label>
                                        <Field
                                            type="text"
                                            id="unionB"
                                            name="unionB"
                                            className="input input-bordered w-full"
                                            readOnly
                                            disabled
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="username">ইউজার নাম</label>
                                        <Field
                                            type="text"
                                            id="username"
                                            name="username"
                                            className="input input-bordered w-full"
                                            readOnly
                                            disabled
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="password"> পাসওয়ার্ড</label>
                                        <div className="flex items-center input input-bordered w-full">
                                            <Field
                                                type={show ? "text" : "password"}
                                                id="password"
                                                name="password"
                                                className=" w-full"
                                            />
                                            <button className=" right-0 pr-2" onClick={handleToShow}>
                                                {
                                                    show ? <BsEyeFill className="text-slate-500"></BsEyeFill> : <RiEyeCloseLine className="text-slate-500"></RiEyeCloseLine>
                                                }

                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="name">উপসহকারী কৃষি অফিসারের নাম</label>
                                        <Field
                                            type="text"
                                            id="name"
                                            name="name"
                                            className="input input-bordered w-full"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="mobile">উপসহকারী কৃষি অফিসারের মোবাইল নং</label>
                                        <Field
                                            type="text"
                                            id="mobile"
                                            name="mobile"
                                            className="input input-bordered w-full"
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
