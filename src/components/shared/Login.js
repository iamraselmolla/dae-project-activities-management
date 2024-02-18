import React, { useState } from "react";

const Login = () => {
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
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform further validation here if needed
    // Then, submit formData to your API
    console.log("Form data:", formData);
    // Reset form after submission if needed
    setFormData({
      username: "",
      password: "",
    });
  };

  return (
    <dialog id="my_modal_2" className="modal text-center">
      <div className="modal-box py-16">
        <h3 className="font-bold text-xl mb-10">লগিন করুন</h3>

        <div className="pb-5">
          <form onSubmit={handleSubmit}>
            <label className="input input-bordered flex mb-3 items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                placeholder="পাসওয়ার্ড"
                type="password"
                className="grow"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </label>
            <button type="submit" className="btn w-full btn-success">
              লগিন করুন
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
