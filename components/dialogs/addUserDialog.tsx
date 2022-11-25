import {
  Button,
  CircularProgress,
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

interface AddUserFormIF {
  walletAddress: string;
  name: string;
  email: string;
  token: string;
}

const AddUserDialog = (props: any) => {
  const { open, handleClose, refreshPage } = props;
  const { contract, signer } = useSelector(
    (state: RootState) => state.contract
  );
  const [loading, setLoading] = useState<boolean>(false);

  const initialValues = {
    walletAddress: "",
    name: "",
    email: "",
    token: "",
  };

  const validationSchema = Yup.object({
    walletAddress: Yup.string()
      .required("Please enter user's wallet address")
      .min(42, "Must be exactly 32 characters")
      .max(42, "Must be exactly 32 characters"),
    name: Yup.string().required("Please enter user's Name"),
    email: Yup.string()
      .email("Please enter a valid Email")
      .max(255)
      .required("Please enter user's Email"),
  });

  const checkEvents = () => {
    contract.on("Transfer", () => {
      refreshPage();
      setLoading(false);
      handleClose();
    });
  };

  const onSubmit = async (values: AddUserFormIF) => {
    setLoading(true);
    await contract
      .connect(signer)
      .addUser(values.walletAddress, values.name, values.email, values.token);
    checkEvents();
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
                  <Typography variant="h5">Add User</Typography>
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
                    id="email"
                    label="Enter Email"
                    variant="outlined"
                    {...formik.getFieldProps("email")}
                  />
                  <div className={style.errorBox}>
                    <ErrorMessage component={TextError} name="email" />
                  </div>
                </div>
                <div className={style.inputBox}>
                  <TextField
                    fullWidth
                    type="text"
                    id="walletAddress"
                    label="Enter Wallet Address"
                    variant="outlined"
                    {...formik.getFieldProps("walletAddress")}
                  />
                  <div className={style.errorBox}>
                    <ErrorMessage component={TextError} name="walletAddress" />
                  </div>
                </div>
                <div className={style.inputButtonBox}>
                  <Button
                    disabled={loading}
                    type="submit"
                    variant="contained"
                    color="success"
                    endIcon={
                      loading ? (
                        <CircularProgress size={16} color="inherit" />
                      ) : null
                    }
                  >
                    {loading ? "Processing " : "Submit"}
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </DialogTitle>
    </Dialog>
  );
};

export default AddUserDialog;
