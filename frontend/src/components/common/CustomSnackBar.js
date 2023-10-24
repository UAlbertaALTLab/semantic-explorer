import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";
import React from "react";

export default function PositionedSnackbar({snackBar, setSnackBar}) {
  const handleClose = () => {
    setSnackBar({...snackBar, open: false});
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={snackBar.open}
      onClose={handleClose}
      autoHideDuration={6000}
    >
      <Alert onClose={handleClose} severity={snackBar.type} sx={{ width: "100%" }}>
        {snackBar.message}
      </Alert>
    </Snackbar>
  );
}
