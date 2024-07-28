import React from "react";
import Dialog from "@mui/material/Dialog";
import Filter from "./Filter";

const Dialogs = ({
  closeDialog,
  filterDialog,
  handleFilterSubmit,
  handleFilterChange,
  handleTimeChange,
  searchParams,
}) => {
  return (
    <>
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
          handleTimeChange={handleTimeChange}
          handleFilterChange={handleFilterChange}
          values={searchParams}
        />
      </Dialog>
    </>
  );
};

export default Dialogs;
