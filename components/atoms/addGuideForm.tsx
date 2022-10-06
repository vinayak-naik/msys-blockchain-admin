import { Button, TextField, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import style from "../../styles/components/dialog/addArticleDialog.module.css";
import * as Yup from "yup";
import AddGuideImageDialog from "../dialogs/addArticleImageDialog";
// import { useSelector } from "react-redux";
// import { RootState } from "../../redux/store";

const AddGuideForm = (props: any) => {
  const { setParagraph, title, setTitle } = props;
  const [imageData, setImageData] = useState<any>("");
  const [openDialog, setOpenDialog] = useState(false);

  const initialValues = {
    header: "",
    description: "",
    height: "",
    width: "",
  };

  const validationSchema = Yup.object({});

  const onSubmit = async (values: any, { resetForm }: any) => {
    if (title) {
      setParagraph({ ...values, imageData: imageData ? imageData : "" });
    } else {
      setParagraph(
        { ...values, imageData: imageData ? imageData : "" },
        { title }
      );
    }
    setImageData("");
    resetForm();
  };
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form method="post">
              <div className={style.inputTitle}>
                <Typography variant="h6">Guide Title</Typography>
              </div>
              <div className={style.inputBox}>
                <TextField
                  fullWidth
                  type="text"
                  id="title"
                  label="Title"
                  variant="outlined"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className={style.inputTitle}>
                <Typography variant="h6">Add Body</Typography>
              </div>
              <div className={style.inputBox}>
                <TextField
                  fullWidth
                  type="text"
                  id="header"
                  label="header"
                  variant="outlined"
                  {...formik.getFieldProps("header")}
                />
              </div>
              <div className={style.inputBox}>
                <TextField
                  fullWidth
                  type="text"
                  id="description"
                  label="Enter Guide Description"
                  variant="outlined"
                  {...formik.getFieldProps("description")}
                />
              </div>
              <div
                className={style.inputBox}
                style={{ flexDirection: "row", gap: "10px" }}
              >
                <TextField
                  fullWidth
                  type="number"
                  id="height"
                  label="Image height"
                  variant="outlined"
                  {...formik.getFieldProps("height")}
                />
                <TextField
                  fullWidth
                  type="number"
                  id="width"
                  label="Image width"
                  variant="outlined"
                  {...formik.getFieldProps("width")}
                />
              </div>

              <div className={style.inputButtonBox}>
                <Button
                  onClick={() => setOpenDialog(true)}
                  variant="outlined"
                  color="success"
                >
                  Add Image
                </Button>
                <Button type="submit" variant="contained">
                  Add Paragraph
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
      <AddGuideImageDialog
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        setImageData={(e: any) => setImageData(e)}
      />
    </div>
  );
};

export default AddGuideForm;
