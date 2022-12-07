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
// import { callSetMatchesApi } from "../../utils/api/cache";

interface AddMatchFormIF {
  game: string;
  team1: string;
  team2: string;
}

const AddMatchDialog = (props: any) => {
  const { open, handleClose, refreshPage } = props;
  const { bettingContract, signer } = useSelector(
    (state: RootState) => state.contract
  );
  const [datePickerValue, setDatePickerValue] = useState<Date | null>(
    new Date()
  );
  const [timeError, setTimeError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const initialValues = {
    game: "",
    team1: "",
    team2: "",
  };

  const validationSchema = Yup.object({
    game: Yup.string().required("Please enter team game type"),
    team1: Yup.string().required("Please enter team name"),
    team2: Yup.string().required("Please enter team name"),
  });

  const onSubmit = async (values: AddMatchFormIF) => {
    setLoading(true);
    const timeStamp = Date.parse(`${datePickerValue}`) / 1000;
    const timeStampNow = Date.parse(`${new Date()}`) / 1000;
    if (timeStamp > timeStampNow) {
      setTimeError("");
      try {
        const res = await bettingContract
          .connect(signer)
          .addMatch(values.team1, values.team2, Number(timeStamp), values.game);
        await res.wait();
        refreshPage();
        setLoading(false);
        handleClose();
        // callSetMatchesApi();
      } catch (error) {
        console.log("error:", error);
        setLoading(false);
        handleClose();
      }
    } else {
      setTimeError("Please select correct time");
      setLoading(false);
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
                  <Typography variant="h5">Add Match</Typography>
                </div>
                <div className={style.inputBox}>
                  <TextField
                    fullWidth
                    type="text"
                    id="game"
                    label="Enter game type"
                    variant="outlined"
                    {...formik.getFieldProps("game")}
                  />
                  <div className={style.errorBox}>
                    <ErrorMessage component={TextError} name="game" />
                  </div>
                </div>
                <div className={style.inputBox}>
                  <TextField
                    fullWidth
                    type="text"
                    id="team1"
                    label="Enter team A"
                    variant="outlined"
                    {...formik.getFieldProps("team1")}
                  />
                  <div className={style.errorBox}>
                    <ErrorMessage component={TextError} name="team1" />
                  </div>
                </div>
                <div className={style.inputBox}>
                  <TextField
                    fullWidth
                    type="text"
                    id="team2"
                    label="Enter team B"
                    variant="outlined"
                    {...formik.getFieldProps("team2")}
                  />
                  <div className={style.errorBox}>
                    <ErrorMessage component={TextError} name="team2" />
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

export default AddMatchDialog;
