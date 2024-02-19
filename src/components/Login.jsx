import React, { useState, useEffect } from "react";
import BackGround from "../images/login-image.jpg";
import { loginUser } from "../utils/auth.js";
import ForgotPassword from "./ForgotPassword";
import Dialog from "@mui/material/Dialog";
import Loading from "./Loading";
import Register from "./Register.jsx";
import getGoogleOAuthURL from "../utils/getGoogleUrl";
import InfoDialog from "./InfoDialog";
import { useForm } from "react-hook-form";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Login = ({ onClose, handleButtonClick }) => {
  const [openForgotPassword, setOpenForgotPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [regDialog, setRegDialog] = useState(false);
  const [infoDialog, setInfoDialog] = useState(false);
  const { register, handleSubmit } = useForm();
  const closeDialog = () => {
    setInfoDialog(false);
    onClose();
  };
  const handleForgotPassword = () => {
    setOpenForgotPassword(!openForgotPassword);
  };
  const handleDialogClose = (e) => {
    onClose();
    setRegDialog(false);
    setLoading(false);
  };
  const handleSignUp = (e) => {
    // onClose();
    handleButtonClick();
    setRegDialog(true);
  };
  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleFormSubmit = async (data) => {
    // e.preventDefault();
    console.log(data);
    try {
      const response = await loginUser(email, password);
      setErrMsg(response.data.message);
      const accessToken = response?.data?.accessToken;
      setInfoDialog(true);
      handleButtonClick();

      localStorage.setItem("accessToken", accessToken);

      setEmail("");
      setPassword("");
    } catch (err) {
      setErrMsg(err.response.data.message);
    }
  };
  return (
    <div className="relative h-full w-full">
      <img
        src={BackGround}
        alt="login"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="object-cover bg-gradient-to-r from-transparent to-black to-65% absolute w-full h-full top-0 z-8 flex flex-col items-end justify-start pt-40 2xl:pt-20 px-4">
        <div
          className="absolute text-white right-[20px] top-[20px] cursor-pointer"
          onClick={() => onClose()}
        >
          <FontAwesomeIcon icon={faX} color={"gray"} fontSize={25 + "px"} />
        </div>
        <div className="h-full w-[400px] z-20 text-center flex flex-col items-center">
          <span className="text-white font-Nunito text-2xl font-bold">
            Granny's<span className="text-[#166534] text-2xl">Recipes</span>
          </span>
          <p className="text-[#1FB137] mt-5 text-lg font-bold">
            Sign in with your email address and password
          </p>
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
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
              />
            </label>
            <button
              className="text-[#1FB137] underline mt-3 text-base font-bold block ml-auto flex gap-6 inline-block text-base"
              onClick={handleForgotPassword}
            >
              Forgot password?
            </button>
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
            {/* </a> */}

            <button
              onClick={handleSignUp}
              className="text-[#1FB137] underline mt-3 text-lg font-bold block ml-auto flex gap-6 inline-block text-sm"
            >
              Don’t have an account?Sign up
            </button>
          </div>
        </div>
      </div>
      <Dialog
        open={openForgotPassword}
        onClose={handleForgotPassword}
        fullWidth
        maxWidth="xs"
        PaperProps={{ style: { height: "250px" } }}
      >
        <ForgotPassword onClose={handleForgotPassword} />
      </Dialog>
      <Dialog
        open={loading}
        onClose={handleDialogClose}
        fullWidth
        maxWidth="lg"
        PaperProps={{ style: { height: "800px" } }}
      >
        <Loading />
      </Dialog>
      <Dialog
        open={regDialog}
        onClose={handleDialogClose}
        fullWidth
        maxWidth="lg"
        PaperProps={{ style: { height: "800px" } }}
      >
        <Register />
      </Dialog>
      <Dialog
        open={infoDialog}
        onClose={closeDialog}
        fullWidth
        maxWidth="xs"
        PaperProps={{ style: { height: "100px", borderradius: "50%" } }}
      >
        <InfoDialog
          info={"You have been logged in successfully"}
          onClose={closeDialog}
        />
      </Dialog>
    </div>
  );
};

export default Login;
