import React, { useState } from "react";
import axiosPrivate from "../api/axios";
import InfoDialog from "../components/InfoDialog";
import Dialog from "@mui/material/Dialog";

const ForgotPassword = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [infoDialog, setInfoDialog] = useState(false);

  const closeDialog = () => {
    onClose();
  };
  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }

    try {
      localStorage.setItem("email", email);
      await axiosPrivate.post(
        "/users/forget-password",
        { email: email },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setInfoDialog(true);
    } catch (err) {}
  };

  return (
    <div className="text-center mt-20 p-5 inline border border-[#1FB137] rounded-lg">
      <span className="text-[#1FB137] text-2xl bold">Forgot password</span>
      <p className="text-[#1FB137] text-base bold mt-2">
        Please enter your email which was registerd
      </p>
      <div className="text-center inline-block mt-2">
        <form onSubmit={handleSubmit}>
          <label className="text-[#1FB137] mt-5 text-base font-bold block">
            <input
              type="email"
              name="email"
              id="email"
              className="w-[300px] text-[#1FB137 border-[#1FB137] bg-black border w-full"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <p className="text-[#1FB137] text-base bold mt-3">
            We will send a letter on your email to set new password
          </p>
          <button
            type="submit"
            value="Sign in"
            className="bg-[#166534] w-[100px] h-[30px] mt-3 rounded-3xl text-white text-xl self-center"
          >
            Send
          </button>
        </form>
      </div>
      <div className="text-center mt-5"></div>
      <Dialog
        open={infoDialog}
        onClose={closeDialog}
        fullWidth
        maxWidth="xs"
        PaperProps={{ style: { height: "100px", borderradius: "50%" } }}
      >
        <InfoDialog
          info={"We have sent you an email.Please check you mailbox"}
          onClose={closeDialog}
        />
      </Dialog>
    </div>
  );
};

export default ForgotPassword;
