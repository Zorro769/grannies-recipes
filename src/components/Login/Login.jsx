import React, { useState, useEffect } from "react";
import BackGround from "images/login-image.jpg";
import SuccessAuthToast from "components/Toasts/SuccessAuthToast.jsx";

import { loginUser } from "../../utils/auth.js";
import getGoogleOAuthURL from "../../utils/getGoogleUrl";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const { register, handleSubmit } = useForm();

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      toast.custom(
        (t) => (
          <SuccessAuthToast
            t={t}
            title={"You have been logged in succesfully"}
            subtitle={"You will be navigated to home page"}
          />
        ),
        { duration: 5000 }
      );
    } catch (err) {
      setErrMsg(err.response.data.message);
    }
  };
  return (
    <div>
      <img src={BackGround} className="h-[100vh]" alt="login" />
      <div className="object-cover bg-gradient-to-r from-transparent to-black to-65% absolute w-full h-full top-0 z-8 flex justify-end pt-40 2xl:pt-20 px-4">
        <div className="h-full z-20 text-center flex flex-col items-center mr-20">
          <span className="text-white font-Nunito text-2xl font-bold">
            Granny's<span className="text-[#166534] text-2xl">Recipes</span>
          </span>
          <p className="text-[#1FB137] mt-5 text-lg font-bold">
            Sign in with your email address and password
          </p>
          <form
            onSubmit={(e) => handleSubmit(handleFormSubmit(e))}
            className="text-left w-[340px] mt-10"
          >
            <label className="text-[#1FB137] text-xl font-bold">
              Email address:
              <br />
              <input
                type="email"
                {...register("email")}
                id="email"
                required
                className="border-[#1FB137] bg-black border w-full text-lg p-2"
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </label>
            <label className="text-[#1FB137] mt-5 text-xl font-bold block">
              Password:
              <br />
              <input
                type="password"
                {...register("password")}
                id="password"
                required
                className="border-[#1FB137] text-lg bg-black border w-full p-2"
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </label>
            <Link
              className="text-[#1FB137] underline mt-3 text-base font-bold block ml-auto flex gap-6 inline-block text-base"
              to="/forgot-password"
            >
              Forgot password?
            </Link>
            <div className="text-left text-orange-900 mt-5">{errMsg}</div>
            <div className="flex justify-center mt-12">
              <button
                type="submit"
                value="Sign in"
                className="bg-[#166534] w-[130px] h-[45px]  rounded-3xl text-white text-2xl self-center"
              >
                Sign in
              </button>
            </div>
          </form>
          <div className="text-center">
            <p className="text-[#1FB137] my-5">OR</p>
            <button
              className=' transition-[background-color] duration-[0.3s,box-shadow] delay-[0.3s] shadow-[0_-1px_0_rgba(0,0,0,0.04),0_1px_1px_rgba(0,0,0,0.25)] text-[#757575] text-sm font-medium bg-[url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4=)] bg-[white] bg-no-repeat bg-[12px_11px] pl-[42px] pr-4 py-3 rounded-[3px] border-[none] hover:shadow-[0_-1px_0_rgba(0,0,0,0.04),0_2px_4px_rgba(0,0,0,0.25)] active:bg-[#eeeeee] focus:shadow-[0_-1px_0_rgba(0,0,0,0.04),0_2px_4px_rgba(0,0,0,0.25),0_0_0_3px_#c8dafc] disabled:grayscale disabled:bg-[#ebebeb] disabled:shadow-[0_-1px_0_rgba(0,0,0,0.04),0_1px_1px_rgba(0,0,0,0.25)] disabled:cursor-not-allowed;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif'
            >
              <a href={getGoogleOAuthURL()} className="text-black">
                Continue with google
              </a>
            </button>
            <Link
              to="/register"
              className="text-[#1FB137] underline mt-3 text-lg font-bold block ml-auto flex gap-6 inline-block text-sm"
            >
              Don’t have an account?Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
