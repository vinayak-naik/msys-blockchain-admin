import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
// import { signIn } from "next-auth/client";
// import { useRouter } from "next/router";

export default function AlertDialog(props: any) {
  const { alertDialog, setAlertDialog } = props;

  return (
    <div>
      <Dialog
        open={alertDialog.open}
        onClose={() =>
          setAlertDialog({
            open: false,
            actionName: "",
            message: "",
            action: function () {},
          })
        }
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xs"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {alertDialog.message}
          </DialogContentText>
        </DialogContent>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "10px",
            padding: "0 20px",
          }}
        >
          <Button onClick={() => setAlertDialog(false)}>Cancel</Button>
        </div>
      </Dialog>
    </div>
  );
}
