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
// import { callSetMatchApi, callSetMatchesApi } from "../../utils/api/cache";

const MatchResultDialog = (props: any) => {
  const { open, handleClose, matchId, refreshPage, matchDetails } = props;
  const { bettingContract, signer } = useSelector(
    (state: RootState) => state.contract
  );
  const [loading, setLoading] = useState<boolean>(false);

  const initialValues = {
    teamWon: 0,
  };

  const validationSchema = Yup.object({
    teamWon: Yup.number().required("Please select team name"),
  });

  const onSubmit = async (values: any) => {
    try {
      setLoading(true);
      const res = await bettingContract
        .connect(signer)
        .announceResult(matchId, values.teamWon);
      await res.wait();
      refreshPage();
      setLoading(false);
      handleClose();
      // callSetMatchesApi();
      // callSetMatchApi(matchId);
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
                  <Typography variant="h5">Announce Result</Typography>
                </div>

                <div className={style.inputBox}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Team Won
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Select Team"
                      {...formik.getFieldProps("teamWon")}
                    >
                      <MenuItem className={style.menuItem} value={1}>
                        {matchDetails.team1}
                      </MenuItem>
                      <MenuItem className={style.menuItem} value={2}>
                        {matchDetails.team2}
                      </MenuItem>
                      <MenuItem className={style.menuItem} value={3}>
                        Draw
                      </MenuItem>
                    </Select>
                  </FormControl>
                  <div className={style.errorBox}>
                    <ErrorMessage component={TextError} name="teamWon" />
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

export default MatchResultDialog;
