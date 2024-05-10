import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../AuthContext/AuthProvider";
import { useLocation, useNavigate } from 'react-router-dom';
import { getLoginUser } from "../../services/userServices";

const LoginPage = () => {
    const [loading, setLoading] = useState(false)
    const location = useLocation();
    const navigate = useNavigate();

    const { setUser, setRole } = useContext(AuthContext);
    const from = location?.state?.from?.pathname || "/";

    // State to manage form inputs
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    // Function to handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setUser(null);
        setLoading(true);

        try {
            const response = await getLoginUser(formData)
            if (response?.status === 200) {
                setLoading(false);
                toast.success(response?.data?.message);
                setUser(response?.data?.data);
                setRole(response?.data?.data?.role)

                // Format the user data for local storage
                const userFormateForLocalStorage = {
                    username: response?.data?.data?.username,
                    union: response?.data?.data?.union,
                    unionB: response?.data?.data?.unionB,
                    block: response?.data?.data?.block,
                    blockB: response?.data?.data?.blockB,
                    role: response?.data?.data?.role,
                };

                // Stringify the formatted user data before storing it in local storage
                localStorage.setItem('CurrentUser', JSON.stringify(userFormateForLocalStorage));
                navigate(from, { replace: true })

                const { token } = response.data.token; // Assuming the server returns a token upon successful login

                // Store the token in local storage
                localStorage.setItem('token', token);

                // Reset form after successful login
                setFormData({
                    username: "",
                    password: "",
                });
            } else {
                setLoading(false);
                toast.error("আপনার ব্যবহারকারীর নাম এবং পাসওয়ার্ড সঠিকভাবে লিখুন")
            }
        } catch (error) {
            // Handle login errors
            console.error('Login failed:', error);
            setLoading(false);
            toast.error("আপনার ব্যবহারকারীর নাম এবং পাসওয়ার্ড সঠিকভাবে লিখুন")
            // Optionally, display an error message to the user
            // setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className=" h-screen w-full pt-12">
            <div className="text-center flex justify-center">
                <div className="modal-box py-16">
                    <h3 className="font-bold text-xl mb-10">লগিন করুন</h3>
                    <div className="pb-5">
                        <form method="dialog">
                            <label className="input input-bordered flex mb-3 items-center gap-2">
                                <input
                                    type="text"
                                    className="grow"
                                    placeholder="ইউজার নেম"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label className="input input-bordered mb-3 w-full flex items-center gap-2">
                                <input
                                    placeholder="পাসওয়ার্ড"
                                    type="password"
                                    className="grow"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                className="btn w-full btn-success"
                            >
                                {loading ? "Loading" : "লগিন করুন"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default LoginPage;