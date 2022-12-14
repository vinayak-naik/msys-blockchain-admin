import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
// import { signIn } from "next-auth/client";
// import { useRouter } from "next/router";

export default function PromptDialog(props: any) {
  const { promptDialog, setPromptDialog } = props;

  return (
    <div>
      <Dialog
        open={promptDialog.open}
        onClose={() =>
          setPromptDialog({
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
            {promptDialog.message}
          </DialogContentText>
        </DialogContent>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            marginBottom: "10px",
            padding: "0 20px",
          }}
        >
          <Button onClick={() => setPromptDialog(false)}>Cancel</Button>
          <Button onClick={promptDialog.action}>
            {promptDialog.actionName}
          </Button>
        </div>
      </Dialog>
    </div>
  );
}
