import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
import toast from "react-hot-toast";
import { AuthContext } from "../AuthContext/AuthProvider";
import { Navigate } from "react-router-dom";
import { useLocation, useNavigate } from 'react-router-dom';



const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setUser, loading, setLoading, jwtToken } = useContext(AuthContext);
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







  const handleSubmit = async (e) => {
    e.preventDefault();
    setUser(null);
    setLoading(true);


    try {
      const response = await axios.post('http://localhost:5000/api/v1/user/get-login-user', formData);
      if (response?.data?.success) {
        setLoading(false);
        toast.success(response?.data?.message);
        setUser(response?.data?.data);

        // Format the user data for local storage
        const userFormateForLocalStorage = {
          username: response?.data?.data?.username,
          union: response?.data?.data?.union,
          unionB: response?.data?.data?.unionB,
          block: response?.data?.data?.block,
          blockB: response?.data?.data?.blockB,
          role: response?.data?.data?.role,

        };

        const userToken = response?.data?.token;
        // Stringify the formatted user data before storing it in local storage
        localStorage.setItem('CurrentUser', JSON.stringify(userFormateForLocalStorage));
        localStorage.setItem('CurrentUserToken', JSON.stringify(userToken));
        navigate(from, { replace: true })

        // Optionally, you can redirect the user to another page upon successful login
        // history.push('/dashboard');

        // Reset form after successful login
        setFormData({
          username: "",
          password: "",
        });
      }
      else {
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
    <dialog id="my_modal_3" className="modal text-center">
      <div className="modal-box py-16">
        <h3 className="font-bold text-xl mb-10">লগিন করুন</h3>

        <div className="pb-5">
          <form method="dialog">
            <label className="input input-bordered flex mb-3 items-center gap-2">
              {/* Your SVG icon */}
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
              {/* Your SVG icon */}
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

            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default Login;
