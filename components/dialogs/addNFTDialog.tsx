import {
  Button,
  Dialog,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { ErrorMessage, Form, Formik } from "formik";
import React, { useState } from "react";
import TextError from "../reusable/textError";
import style from "../../styles/components/dialog/dialog.module.css";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import CropImage from "./cropImageDialog";

const AddNFTDialog = (props: any) => {
  const { open, handleClose } = props;
  const { contract, signer } = useSelector(
    (state: RootState) => state.contract
  );
  const [cropImageDialog, setCropImageDialog] = useState(false);

  const initialValues = {
    name: "",
    displayName: "",
    description: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Please enter name"),
    displayName: Yup.string().required("Please enter display name"),
    description: Yup.string().required("Please enter description"),
  });

  const onSubmit = async (values: any) => {
    await contract
      .connect(signer)
      .addUser(values.walletAddress, values.name, values.email);
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => {
            return (
              <Form method="post" style={{ width: "30vw" }}>
                <div className={style.inputBox}>
                  <Typography variant="h4">Add NFT</Typography>
                </div>
                <div className={style.inputBox}>
                  <TextField
                    fullWidth
                    type="text"
                    id="name"
                    label="Enter Name"
                    variant="outlined"
                    {...formik.getFieldProps("name")}
                  />
                  <div className={style.errorBox}>
                    <ErrorMessage component={TextError} name="name" />
                  </div>
                </div>
                <div className={style.inputBox}>
                  <TextField
                    fullWidth
                    type="text"
                    id="displayName"
                    label="Enter displayName"
                    variant="outlined"
                    {...formik.getFieldProps("displayName")}
                  />
                  <div className={style.errorBox}>
                    <ErrorMessage component={TextError} name="displayName" />
                  </div>
                </div>
                <div className={style.inputBox}>
                  <TextField
                    fullWidth
                    type="text"
                    id="description"
                    label="Enter Description"
                    variant="outlined"
                    {...formik.getFieldProps("description")}
                  />
                  <div className={style.errorBox}>
                    <ErrorMessage component={TextError} name="description" />
                  </div>
                </div>
                <div className={style.inputButtonBox}>
                  <Button
                    onClick={() => setCropImageDialog(true)}
                    variant="contained"
                    color="success"
                  >
                    Select Image
                  </Button>
                  <Button type="submit" variant="contained" color="success">
                    Mint NFT
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </DialogTitle>
      <Dialog
        open={cropImageDialog}
        onClose={() => setCropImageDialog(false)}
        fullWidth
        maxWidth="md"
        sx={{ "&:MuiDialog-paper": { backgroundColor: "transparent" } }}
      >
        <DialogTitle sx={{ padding: "0", backgroundColor: "transparent" }}>
          <CropImage />
        </DialogTitle>
      </Dialog>
    </Dialog>
  );
};

export default AddNFTDialog;
