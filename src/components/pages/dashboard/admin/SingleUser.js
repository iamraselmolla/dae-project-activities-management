import { toBengaliNumber } from 'bengali-number';
import { Field, Form, Formik } from 'formik';
import React from 'react';

const SingleUser = ({ index, user }) => {
    const initialValues = {
        ...user
    };
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
                        <div className="grid grid-cols-2 gap-4">
                            <label htmlFor="name">Name</label>
                            <Field
                                type="text"
                                id="name"
                                name="name"
                                className="input input-bordered w-full"
                            />

                            <label htmlFor="mobile">Mobile</label>
                            <Field
                                type="text"
                                id="mobile"
                                name="mobile"
                                className="input input-bordered w-full"
                            />

                            <label htmlFor="block">Block</label>
                            <Field
                                type="text"
                                id="block"
                                name="block"
                                className="input input-bordered w-full"
                            />

                            <label htmlFor="blockB">BlockB</label>
                            <Field
                                type="text"
                                id="blockB"
                                name="blockB"
                                className="input input-bordered w-full"
                            />

                            <label htmlFor="union">Union</label>
                            <Field
                                type="text"
                                id="union"
                                name="union"
                                className="input input-bordered w-full"
                            />

                            <label htmlFor="unionB">UnionB</label>
                            <Field
                                type="text"
                                id="unionB"
                                name="unionB"
                                className="input input-bordered w-full"
                            />

                            <label htmlFor="username">Username</label>
                            <Field
                                type="text"
                                id="username"
                                name="username"
                                className="input input-bordered w-full"
                            />
                        </div>

                        <button type="submit" className="btn btn-primary mt-4">
                            Submit
                        </button>
                    </Form>
                </Formik>
            </div>
        </>
    );
};

export default SingleUser;