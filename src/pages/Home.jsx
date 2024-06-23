import React, { useState } from "react";
import Header from "../components/Shared/Header";
import Recipes from "../components/Home/Recipes/Recipes";
import ChangePassword from "../components/ChangePassword";
import Dialog from "@mui/material/Dialog";

const Home = ({ flag }) => {
  const [openChangePasswordDialog, setChangePasswordDialog] = useState(flag);

  const handleDialogClose = () => {
    setChangePasswordDialog(false);
  };
  return (
    <main className="w-full flex flex-col">
      <Header
        title={
          <p>
            Taste the World with
            <br /> Granny'sRecipes!
          </p>
        }
        type="home"
      />
      if(flag) :
      <Dialog
        open={openChangePasswordDialog}
        onClose={handleDialogClose}
        fullWidth
        maxWidth="xs"
        PaperProps={{ style: { height: "300px" } }}
      >
        <ChangePassword onClose={handleDialogClose} />
      </Dialog>
      <section id="recipes" className="md:max-w-[1440px] mx-auto px-4 md:px-20">
        <Recipes />
      </section>
    </main>
  );
};

export default Home;
