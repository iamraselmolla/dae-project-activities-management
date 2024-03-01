import React from 'react';
import { Field, Form, Formik } from 'formik';
import UserTitle from '../../../shared/UserTitle';

const SingleUser = ({ index, user }) => {
    const initialValues = { ...user };
    const { blockB, unionB } = user
    console.log(blockB, unionB)
    const handleSubmit = (values) => {
        // Handle form submission here
        console.log(values);
    };

    return (
        <>
            <UserTitle block={blockB} union={unionB} index={index} />
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
                                <Field
                                    type="text"
                                    id="password"
                                    name="password"
                                    className="input input-bordered w-full"
                                />
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
        </>
    );
};

export default SingleUser;
