import {
  Button,
  Dialog,
  DialogTitle,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  Typography,
  CircularProgress,
} from "@mui/material";
import { ErrorMessage, Form, Formik } from "formik";
import React, { useState } from "react";
import TextError from "../reusable/textError";
import style from "../../styles/components/dialog/dialog.module.css";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { callSetMatchesApi } from "../../utils/api/cache";

const UpdateMatchDialog = (props: any) => {
  const { open, handleClose, matchId, refreshPage } = props;
  const { bettingContract, signer } = useSelector(
    (state: RootState) => state.contract
  );
  const [loading, setLoading] = useState(false);

  const initialValues = {
    status: "",
  };

  const validationSchema = Yup.object({
    status: Yup.number().required("Please select status"),
  });

  const onSubmit = async (values: any) => {
    try {
      setLoading(true);
      const res = await bettingContract
        .connect(signer)
        .updateMatchStatus(matchId, values.status);
      await res.wait();
      refreshPage();
      setLoading(false);
      handleClose();
      callSetMatchesApi();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog open={open} onClose={!loading ? handleClose : false}>
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
                  <Typography variant="h5">Update Status</Typography>
                </div>

                <div className={style.inputBox}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Select Status
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Select Status"
                      {...formik.getFieldProps("status")}
                    >
                      <MenuItem className={style.menuItem} value={1}>
                        Pending
                      </MenuItem>
                      <MenuItem className={style.menuItem} value={2}>
                        Active
                      </MenuItem>
                      <MenuItem className={style.menuItem} value={4}>
                        Disable
                      </MenuItem>
                    </Select>
                  </FormControl>
                  <div className={style.errorBox}>
                    <ErrorMessage component={TextError} name="status" />
                  </div>
                </div>

                <div className={style.inputButtonBox}>
                  <Button
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

export default UpdateMatchDialog;
