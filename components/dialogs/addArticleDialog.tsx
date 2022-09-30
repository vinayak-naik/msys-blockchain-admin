import {
  Button,
  Dialog,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { ErrorMessage, Form, Formik } from "formik";
import React from "react";
import TextError from "../reusable/textError";
import style from "../../styles/components/dialog/dialog.module.css";
import * as Yup from "yup";
// import { useSelector } from "react-redux";
// import { RootState } from "../../redux/store";

const AddArticleDialog = (props: any) => {
  const { open, handleClose } = props;

  const initialValues = {
    title: "",
    description: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Please enter user's wallet address"),
    description: Yup.string().required("Please enter description"),
  });

  const onSubmit = async () => {};
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
                  <Typography variant="h4">Add Article</Typography>
                </div>
                <div className={style.inputBox}>
                  <TextField
                    fullWidth
                    type="text"
                    id="title"
                    label="Title"
                    variant="outlined"
                    {...formik.getFieldProps("title")}
                  />
                  <div className={style.errorBox}>
                    <ErrorMessage component={TextError} name="title" />
                  </div>
                </div>
                <div className={style.inputBox}>
                  <TextField
                    fullWidth
                    type="file"
                    // onChange={(event) => {
                    //   setFieldValue(event.currentTarget.files[0]);
                    // }}
                  />
                  <div className={style.errorBox}>
                    {/* <TextError>test</TextError> */}
                  </div>
                </div>
                <div className={style.inputBox}>
                  <TextField
                    fullWidth
                    type="text"
                    id="description"
                    label="Enter article Description"
                    variant="outlined"
                    {...formik.getFieldProps("description")}
                  />
                  <div className={style.errorBox}>
                    <ErrorMessage component={TextError} name="description" />
                  </div>
                </div>
                <div className={style.inputButtonBox}>
                  <Button type="submit" variant="contained" color="success">
                    Submit
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

export default AddArticleDialog;
