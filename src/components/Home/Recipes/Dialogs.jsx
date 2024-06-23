import React from "react";
import CreateRecipe from "../../CreateRecipe";
import Dialog from "@mui/material/Dialog";
import InfoDialog from "../../InfoDialog";
import Filter from "../../Filter";

const Dialogs = ({
  openDialog,
  closeDialog,
  infoDialog,
  filterDialog,
  handleFilterSubmit,
  handleFilterChange,
  searchParams,
}) => {
  return (
    <>
      <Dialog
        open={openDialog}
        onClose={closeDialog}
        fullWidth
        className="create-recipe-dialog"
        maxWidth="lg"
        PaperProps={{
          style: {
            height: "750px",
            border: "5px solid gray",
            borderRadius: "50px",
            background: "transparent",
          },
        }}
        disableBackdropClick={false}
      >
        <CreateRecipe onClose={closeDialog} />
      </Dialog>
      <Dialog
        open={infoDialog}
        onClose={closeDialog}
        fullWidth
        maxWidth="xs"
        PaperProps={{ style: { height: "100px", borderradius: "50%" } }}
      >
        <InfoDialog
          info={"You need to be logged in first"}
          onClose={closeDialog}
        />
      </Dialog>
      <Dialog
        open={filterDialog}
        onClose={closeDialog}
        fullWidth
        maxWidth="xs"
        PaperProps={{ style: { height: "500px" } }}
      >
        <Filter
          onClose={closeDialog}
          handleFilterSubmit={handleFilterSubmit}
          handleChange={handleFilterChange}
          values={searchParams}
        />
      </Dialog>
    </>
  );
};

export default Dialogs;
