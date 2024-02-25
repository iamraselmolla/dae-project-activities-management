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
