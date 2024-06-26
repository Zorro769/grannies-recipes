import React from "react";
import InfoDialog from "../InfoDialog.jsx";
import Dialog from "@mui/material/Dialog";

const Dialogs = ({
  infoDialog,
  closeDialog,
}) => {
  return (
    <>
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
