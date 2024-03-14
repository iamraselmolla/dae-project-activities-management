import React, { useContext, useState, useEffect } from "react";
import SectionTitle from "../../shared/SectionTitle";
import { useFormik } from "formik";
import * as Yup from "yup";
import Datepicker from "react-tailwindcss-datepicker";
import { format } from "date-fns";
import { bn } from "date-fns/locale";
import toast from "react-hot-toast";
import { FaTimes } from "react-icons/fa";
import { AuthContext } from "../../AuthContext/AuthProvider";
import { toBengaliNumber } from "bengali-number";
import { createAGroup } from "../../../services/userServices";
import { uploadToCloudinary } from "../../utilis/uploadToCloudinary";
import Loader from "../../shared/Loader";
import "./daegroupMeeting.css"

const AddGroupMeeting = () => {
    const { user } = useContext(AuthContext);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [imageLinks, setImageLinks] = useState([]);
    const [rawImages, setRawImages] = useState([])


    useEffect(() => {
        if (user) {
            setLoading(false);
        }
    }, [user]);

    const initialValues = {
        groupInfo: {
            name: "",
            place: "",
            mobile: "",
        },
        time: {
            date: "",
            day: "",
        },
        address: {
            village: "",
            block: "",
            union: "",
        },
        SAAO: {
            name: "",
            mobile: "",
        },
        discussion: "",
        presentOfficers: "",
        images: [],
        username: "",
    };

    const validationSchema = Yup.object({
        groupInfo: Yup.object({
            name: Yup.string().required("কৃষক গ্রুপের নাম প্রয়োজন"),
            place: Yup.string().required("স্থানের নাম দিন"),
            mobile: Yup.string()
                .required("মোবাইল নম্বর দিন")
                .matches(/^[0-9]{11}$/, "মোবাইল নম্বর ১১ টি সংখ্যার হতে হবে"),
        }),
        address: Yup.object({
            village: Yup.string().required("গ্রামের নাম দিন"),
        }),
        discussion: Yup.string().required("আলোচ্য বিষয় দিন"),
        images: Yup.array().required("অন্তত একটি ছবি আপ্লোড দিন"),
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            setLoading(true)
            values.SAAO.name = user?.SAAO.name;
            values.SAAO.mobile = user?.SAAO.mobile;
            values.username = user?.username;
            values.address.block = user?.blockB;
            values.address.union = user?.unionB;
            if (!values.username) {
                return toast.error("ভালভাবে লগিন করুন অথবা পেইজ রিলোড করুন");
            }
            try {
                if (rawImages?.length > 0) {
                    for (const image of rawImages) {

                        const result = await uploadToCloudinary(image)
                        setImageLinks([...imageLinks, result]);

                    }
                    const result = await createAGroup(values);
                    if (result?.status === 200) {
                        toast.success(result?.data?.message);
                        setLoading(false)
                    }
                }
            } catch (err) {
                toast.error(err?.response?.data?.message)
                console.log(err, "error");
                setLoading(false)
            }
        },
    });

    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);

        setRawImages([...rawImages, ...files])
        const imagesArray = files.map((file) => URL.createObjectURL(file));
        setImages((prevImages) => prevImages.concat(imagesArray));

    };

    const handleRemoveImage = (index) => {
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setImages(updatedImages);
        formik.setFieldValue("images", updatedImages);
    };

    const renderImages = () => {
        return (
            <div>
                {images?.length > 0 && <>
                    <h3 className="font-bold mb-2">ছবি প্রিভিউ</h3>
                    <div className="flex gap-3">
                        {images.map((image, index) => (
                            <div key={index} className="relative">
                                <img
                                    src={image}
                                    alt={`Image ${index + 1}`}
                                    className="w-32 border-success border-4 h-32 mr-2 mb-2 object-cover"
                                />
                                <button
                                    type="button"
                                    className="absolute flex justify-center items-center w-6 h-6 rounded-full bg-red-700 top-0 right-0 text-white hover:text-green-300"
                                    onClick={() => handleRemoveImage(index)}
                                >
                                    <FaTimes />
                                </button>
                            </div>
                        ))}
                    </div>
                </>}
            </div>
        );
    };

    const handleDateChange = (date) => {
        formik.setFieldValue("time.date", date);
        formik.setFieldValue("time.day", formatDate(date));
    };

    const formatDate = (date) => {
        if (!date) return;
        const dayName = format(new Date(date.startDate), "EEEE", { locale: bn });
        if (dayName === "শুক্রবার" || dayName === "শনিবার") {
            toast.error("আপনি সাপ্তাহিক ছুটির দিনে গ্রুপ সভার তারিখ সিলেক্ট করেছেন!");

        }

        return dayName;
    };

    return (
        <section className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <SectionTitle title={"ডিএই কৃষক গ্রুপ সভার তথ্য যুক্ত করুন"} />
            <div className="mt-2">
                <form onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                        <div>
                            <label className="font-extrabold mb-1 block">
                                কৃষক গ্রুপের নাম
                            </label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                id="groupInfo.name"
                                name="groupInfo.name"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                placeholder="কৃষক গ্রুপের নাম"
                                value={formik.values.groupInfo.name}
                            />
                            {formik.touched.groupInfo?.name &&
                                formik.errors.groupInfo?.name ? (
                                <div className="text-red-600">
                                    {formik.errors.groupInfo.name}
                                </div>
                            ) : null}
                        </div>
                        <div>
                            <label className="font-extrabold mb-1 block">স্থান</label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                id="groupInfo.place"
                                name="groupInfo.place"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                placeholder="স্থান"
                                value={formik.values.groupInfo.place}
                            />
                            {formik.touched.groupInfo?.place &&
                                formik.errors.groupInfo?.place ? (
                                <div className="text-red-600">
                                    {formik.errors.groupInfo.place}
                                </div>
                            ) : null}
                        </div>
                        <div>
                            <label className="font-extrabold mb-1 block">মোবাইল</label>
                            <input
                                type="number"
                                className="input input-bordered w-full"
                                id="groupInfo.mobile"
                                name="groupInfo.mobile"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                placeholder="মোবাইল"
                                value={formik.values.groupInfo.mobile}
                            />
                            {formik.touched.groupInfo?.mobile &&
                                formik.errors.groupInfo?.mobile ? (
                                <div className="text-red-600">
                                    {formik.errors.groupInfo.mobile}
                                </div>
                            ) : null}
                        </div>
                        <div>
                            <label className="font-extrabold mb-1 block">গ্রাম</label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                id="address.village"
                                name="address.village"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                placeholder="গ্রাম"
                                value={formik.values.address.village}
                            />
                            {formik.touched.address?.village &&
                                formik.errors.address?.village ? (
                                <div className="text-red-600">
                                    {formik.errors.address?.village}
                                </div>
                            ) : null}
                        </div>
                        <div>
                            <label className="font-extrabold mb-1 block">ব্লক</label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                id="address.block"
                                name="address.block"
                                readOnly
                                placeholder="ব্লক"
                                value={user?.blockB}
                            />
                            {formik.touched.address?.block && formik.errors.address?.block ? (
                                <div className="text-red-600">
                                    {formik.errors.address?.block}
                                </div>
                            ) : null}
                        </div>
                        <div>
                            <label className="font-extrabold mb-1 block">ইউনিয়ন</label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                id="address.union"
                                name="address.union"
                                placeholder="ইউনিয়ন"
                                value={user?.unionB}
                            />
                            {formik.touched.address?.union && formik.errors.address?.union ? (
                                <div className="text-red-600">
                                    {formik.errors.address?.union}
                                </div>
                            ) : null}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 my-5 gap-4 lg:grid-cols-2">
                        <div>
                            <label className="font-extrabold mb-1 block">সভার তারিখ</label>
                            <div className="input input-bordered w-full">
                                <Datepicker
                                    asSingle={true}
                                    onChange={handleDateChange}
                                    value={formik.values.time?.date}
                                />
                                {formik.touched.time?.date && formik.errors.time?.date ? (
                                    <div className="text-red-600">{formik.errors.time?.date}</div>
                                ) : null}
                            </div>
                        </div>
                        <div>
                            {formik.values.time?.date && (
                                <div>
                                    <label className="font-extrabold mb-1 block">
                                        সভার তারিখের দিন
                                    </label>
                                    <div className="input input-bordered w-full">
                                        {formatDate(formik.values.time?.date)}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div>
                        <label className="font-extrabold mb-1 block">আলোচ্য বিষয়</label>
                        <textarea
                            className="input h-32 input-bordered w-full"
                            id="discussion"
                            name="discussion"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            placeholder="আলোচ্য বিষয়"
                            value={formik.values.discussion}
                        />
                        {formik.touched.discussion && formik.errors.discussion ? (
                            <div className="text-red-600">{formik.errors.discussion}</div>
                        ) : null}
                    </div>
                    <div className="mt-5">
                        <label className="font-extrabold mb-1 block">
                            উপস্থিত কর্মকর্তা
                        </label>
                        <input
                            className="input input-bordered w-full"
                            id="presentOfficers"
                            name="presentOfficers"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            placeholder="উপস্থিত কর্মকর্তা"
                            value={formik.values.presentOfficers}
                        />
                    </div>
                    <div className="grid grid-cols-1 gap-4 my-5 lg:grid-cols-2">
                        <div>
                            <label className="font-extrabold mb-1 block">এসএএও এর নাম</label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                id="SAAO.name"
                                name="SAAO.name"
                                readOnly
                                placeholder="এসএএও নাম"
                                value={user?.SAAO.name}
                            />
                            {formik.touched.SAAO?.name && formik.errors.SAAO?.name ? (
                                <div className="text-red-600">{formik.errors.SAAO?.name}</div>
                            ) : null}
                        </div>
                        <div>
                            <label className="font-extrabold mb-1 block">
                                এসএএও এর মোবাইল
                            </label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                id="SAAO.mobile"
                                name="SAAO.mobile"
                                placeholder="এসএএও মোবাইল"
                                readOnly
                                value={toBengaliNumber(user?.SAAO?.mobile)}
                            />
                            {formik.touched.SAAO?.mobile && formik.errors.SAAO?.mobile ? (
                                <div className="text-red-600">{formik.errors.SAAO?.mobile}</div>
                            ) : null}
                        </div>
                    </div>
                    <div>
                        <label className="font-extrabold mb-1 block">
                            কৃষক গ্রুপ সভার ছবি/ ছবি সমূহ
                        </label>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageChange}
                            className="input"
                        />
                        {formik.touched.images && formik.errors.images ? (
                            <div className="text-red-600">{formik.errors.images}</div>
                        ) : null}
                        <div className="mt-4">
                            <div className="">{renderImages()}</div>
                        </div>
                    </div>
                    {!loading ? <div className="fixed daeLoader"><Loader /> </div> : <>
                        <button
                            type="submit"
                            className="btn mt-5 w-full font-extrabold text-white btn-success"
                        >
                            কৃষক গ্রুপ সভার তথ্য যুক্ত করুন
                        </button>
                    </>}
                </form>
            </div>
        </section>
    );
};

export default AddGroupMeeting;
