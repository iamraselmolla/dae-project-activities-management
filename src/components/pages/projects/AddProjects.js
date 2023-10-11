import { useFormik } from 'formik';
import React from 'react';

const AddProjects = () => {
    // const initialValues = {
    //     name: {
    //         details: '',
    //         short: '',
    //     },
    //     time: {
    //         start: '',
    //         end: '',
    //     }

    // }

    // const validate = (values) => {
    // }

    // const formik = useFormik({
    //     initialValues,
    //     validate,
    //     onSubmit: (values) => {
    //         // Handle form submission logic here
    //         console.log('Form values:', values);
    //     }
    // })
    const initialValues = {
        fullName: '',
        phoneNumber: '',
        selectedOption: '',
    };

    const options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
    ];
    const validate = (values) => {
        const errors = {};

        if (!values.fullName) {
            errors.fullName = 'Required';
        }

        if (!values.phoneNumber) {
            errors.phoneNumber = 'Required';
        } else if (!/^\d+$/.test(values.phoneNumber)) {
            errors.phoneNumber = 'Invalid phone number';
        }

        if (!values.selectedOption) {
            errors.selectedOption = 'Required';
        }

        return errors;
    };

    const formik = useFormik({
        initialValues,
        validate,
        onSubmit: (values) => {
            // Handle form submission logic here
            console.log('Form values:', values);
        },
    });

    return (

        <>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="fullName">Full Name</label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.fullName}
                    />
                    {formik.touched.fullName && formik.errors.fullName ? (
                        <div>{formik.errors.fullName}</div>
                    ) : null}
                </div>

                {/* <div>
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.phoneNumber}
                    />
                    {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                        <div>{formik.errors.phoneNumber}</div>
                    ) : null}
                </div> */}

                <div>
                    <label htmlFor="selectedOption">Select an Option</label>
                    <select
                        id="selectedOption"
                        name="selectedOption"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.selectedOption}
                    >
                        <option value="" label="Select an option" />
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    {formik.touched.selectedOption && formik.errors.selectedOption ? (
                        <div>{formik.errors.selectedOption}</div>
                    ) : null}
                </div>

                <button type="submit">Submit</button>
            </form>
        </>
    );
};

export default AddProjects;