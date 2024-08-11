import React, { useState } from "react";
import axiosPrivate from "../api/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosPrivate.post(
        "/users/change-password",
        { email: localStorage.getItem("email"), password: password },
        { headers: { "Content-Type": "application/json" } }
      );

      localStorage.removeItem("email");
      navigate("/");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
  return (
    <div className="text-center mt-20 p-5 inline border border-[#1FB137] rounded-lg">
      <p className="text-[#1FB137] text-base bold mt-2">
        Please enter your new password
      </p>
      <div className="text-center inline-block mt-2">
        <form onSubmit={handleSubmit}>
          <label className="text-[#1FB137] text-left mt-5 text-base font-bold block">
            New password
            <input
              type="password"
              name="password"
              id="password"
              className="w-[300px] text-[#1FB137 border-[#1FB137] mt-1 bg-black border w-full"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label className="text-[#1FB137] text-left mt-5 text-base font-bold block">
            Confirm new password
            <input
              type="password"
              name="password"
              id="password"
              className="w-[300px] text-[#1FB137 border-[#1FB137] mt-1 bg-black border w-full"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <p className="text-[#1FB137] text-base bold mt-3">
            We will change your old password to new password
          </p>
          <button
            type="submit"
            value="Sign in"
            className="bg-[#166534] w-[100px] h-[30px] mt-3 rounded-3xl text-white text-xl self-center"
          >
            Change
          </button>
        </form>
      </div>
      <div className="text-center mt-5"></div>
    </div>
  );
};

export default ChangePassword;
