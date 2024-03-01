import React from 'react';
import { Field, Form, Formik } from 'formik';
import { toBengaliNumber } from 'bengali-number';

const SingleUser = ({ index, user }) => {
    const initialValues = { ...user };

    const handleSubmit = (values) => {
        // Handle form submission here
        console.log(values);
    };

    return (
        <>
            <h2 className="font-bold text-2xl">
                <span className="mr-3">{toBengaliNumber(index + 1)}.</span> ব্লকঃ {user?.blockB}, ইউনিয়নঃ {user?.unionB}
            </h2>
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

                        <button type="submit" className="btn btn-primary mt-4">
                            ইউজার তথ্য এডিট করুন
                        </button>
                    </Form>
                </Formik>
            </div>
        </>
    );
};

export default SingleUser;
