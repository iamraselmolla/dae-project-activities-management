import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
import toast from "react-hot-toast";
import { AuthContext } from "../AuthContext/AuthProvider";
import { Navigate } from "react-router-dom";
import { useLocation, useNavigate } from 'react-router-dom';
import { getLoginUser } from "../../services/userServices";
import { BsEyeFill } from "react-icons/bs";
import { RiEyeCloseLine } from "react-icons/ri";



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



  //Function to login of a user and show user validation
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUser(null);
    setLoading(true);

    try {
      const response = await getLoginUser(formData);
      console.log(response, "checking response");


      if (response?.status === 200 && response?.data?.success) {
        setLoading(false);
        toast.success(response?.data?.message);
        setUser(response?.data?.data);

        // Format the user data for local storage
        const userFormattedForLocalStorage = {
          username: response?.data?.data?.username,
          union: response?.data?.data?.union,
          unionB: response?.data?.data?.unionB,
          block: response?.data?.data?.block,
          blockB: response?.data?.data?.blockB,
          role: response?.data?.data?.role,
        };

        const userToken = response?.data?.token;
        console.log(userToken, "check token")
        // Stringify the formatted user data before storing it in local storage
        localStorage.setItem('CurrentUser', JSON.stringify(userFormattedForLocalStorage));
        localStorage.setItem('CurrentUserToken', JSON.stringify(userToken));
        navigate(from, { replace: true });


        // Reset form after successful login
        setFormData({
          username: "",
          password: "",
        });
      }

    } catch (error) {
      // Handle login errors
      console.error('Login failed:', error.response.data);
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };


  //make the function show & hide password
  const [show, setShow] = useState(false);
  const handleToShow = (e) => {
    e.preventDefault(); // Prevent form submission
    setShow(!show);
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
                type={show ? "text" : "password"}
                className="grow"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <button className="right-0 pr-2" onClick={(e) => handleToShow(e)}>
                {show ? <BsEyeFill className="text-slate-500" /> : <RiEyeCloseLine className="text-slate-500" />}
              </button>
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
