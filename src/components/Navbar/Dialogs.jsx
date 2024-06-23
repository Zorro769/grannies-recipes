import React from "react";
import Login from "../Login.jsx";
import Favourites from "pages/Favourites";
import MyRecipes from "pages/MyRecipes.jsx";
import Register from "../Register.jsx";
import InfoDialog from "../InfoDialog.jsx";
import Dialog from "@mui/material/Dialog";

const Dialogs = ({
  openLoginDialog,
  handleLoginDialogClose,
  handleButtonClick,
  openRegisterDialog,
  handleDialogClose,
  openFavouriteDialog,
  openMyRecipesDialog,
  infoDialog,
  closeDialog,
}) => {
  return (
    <>
      <Dialog
        open={openLoginDialog}
        onClose={handleLoginDialogClose}
        fullWidth
        maxWidth="lg"
        PaperProps={{
          style: { height: "800px", border: "5px solid gray" },
          sx: { borderRadius: "50px" },
        }}
      >
        <Login
          onClose={handleLoginDialogClose}
          handleButtonClick={handleButtonClick}
        />
      </Dialog>
      <Dialog
        open={openRegisterDialog}
        onClose={handleDialogClose}
        fullWidth
        maxWidth="lg"
        PaperProps={{
          style: { height: "800px", border: "5px solid gray" },
          sx: { borderRadius: "50px" },
        }}
      >
        <Register onClose={handleDialogClose} />
      </Dialog>
      <Dialog
        open={openFavouriteDialog}
        onClose={handleDialogClose}
        fullWidth
        maxWidth="lg"
        PaperProps={{ style: { height: "800px" } }}
      >
        <Favourites
          onClose={handleDialogClose}
          handleButtonClick={handleButtonClick}
        />
      </Dialog>
      <Dialog
        open={openMyRecipesDialog}
        onClose={handleDialogClose}
        fullWidth
        maxWidth="lg"
        PaperProps={{ style: { height: "800px" } }}
      >
        <MyRecipes
          onClose={handleDialogClose}
          handleButtonClick={handleButtonClick}
        />
      </Dialog>
      <Dialog
        open={infoDialog}
        onClose={closeDialog}
        fullWidth
        maxWidth="xs"
        PaperProps={{ style: { height: "100px", borderradius: "50%" } }}
      >
        <InfoDialog
          reload={() => {
            window.location.reload(false);
          }}
          info={"You have been logged out successfully"}
          onClose={closeDialog}
        />
      </Dialog>
    </>
  );
};

export default Dialogs;
