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
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { callSetLotteriesApi } from "../../utils/api/cache";

const AddLotteryDialog = (props: any) => {
  const { open, handleClose, refreshPage } = props;
  const { lotteryContract, signer } = useSelector(
    (state: RootState) => state.contract
  );
  const [timeError, setTimeError] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [datePickerValue, setDatePickerValue] = useState<Date | null>(
    new Date()
  );

  const initialValues = {
    name: "",
    amount: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Please enter lottery name")
      .max(20, "Max 20 characters"),
    amount: Yup.number()
      .required("Please enter lottery amount")
      .min(1, "Please enter minimun 1 MSCN")
      .max(1000, "Max amount is 1000 MSCN"),
  });

  const onSubmit = async (values: any) => {
    setLoading(true);
    const timeStamp = Date.parse(`${datePickerValue}`) / 1000;
    const timeStampNow = Date.parse(`${new Date()}`) / 1000;
    if (timeStamp > timeStampNow) {
      setTimeError("");
      try {
        const res = await lotteryContract
          .connect(signer)
          .addLottery(values.name, values.amount, Number(timeStamp));
        await res.wait();
        refreshPage();
        setLoading(false);
        handleClose();
        callSetLotteriesApi();
      } catch (error) {
        console.log(error);
      }
    } else {
      setTimeError("Please select correct time");
      setLoading(false);
    }
  }; //test
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
                  <Typography variant="h5">Add Lottery</Typography>
                </div>
                <div className={style.inputBox}>
                  <TextField
                    fullWidth
                    type="text"
                    id="name"
                    label="Enter lottery name"
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
                    type="number"
                    id="amount"
                    label="Enter lottery amount"
                    variant="outlined"
                    {...formik.getFieldProps("amount")}
                  />
                  <div className={style.errorBox}>
                    <ErrorMessage component={TextError} name="amount" />
                  </div>
                </div>
                <div className={style.inputBox}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      renderInput={(props) => (
                        <TextField fullWidth {...props} />
                      )}
                      label="DateTimePicker"
                      value={datePickerValue}
                      onChange={(newValue) => {
                        setDatePickerValue(newValue);
                      }}
                    />
                  </LocalizationProvider>
                  <div className={style.errorBox}>
                    {timeError && <TextError>{timeError}</TextError>}
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

export default AddLotteryDialog;
